import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import readline from 'node:readline';

import themes from '../themes.config.mjs';

// Usage: node scripts/build-vite.mjs [theme...]   (default or `all`: every theme in themes.config.mjs)
//
// Builds each theme's app bundle and the shared fake-server bundle (plus the ace, shortbread and resources copies) in a
// pool of child processes, at most BUILD_CONCURRENCY at a time. Separate processes keep each theme's resolver plugins
// and module graph isolated and use the cores better than concurrent build() calls in one process.
// Internal: `--job theme <name>` and `--job fake-server <name...>` run a single job in the current process.

const JOB_FLAG = '--job';

async function runJobInProcess([kind, ...names]) {
  const [{ build }, { createFakeServerConfig, createThemeAppConfig }] = await Promise.all([
    import('vite'),
    import('../vite.config.mjs'),
  ]);
  if (kind === 'theme' && names.length === 1) {
    await build(createThemeAppConfig(names[0]));
  } else if (kind === 'fake-server' && names.length > 0) {
    await build(createFakeServerConfig(names));
  } else {
    throw new Error(`Unknown job "${[kind, ...names].join(' ')}"`);
  }
}

function resolveThemes(args) {
  const names = args.includes('all') ? [] : args;
  const unknown = names.filter(name => !themes[name]);
  if (unknown.length > 0) {
    throw new Error(`Unknown theme(s) ${unknown.join(', ')}, expected one of ${Object.keys(themes).join(', ')}`);
  }
  return names.length > 0 ? names : Object.keys(themes);
}

function resolveConcurrency(jobCount) {
  const fallback = Math.max(1, Math.min(jobCount, Math.floor(os.availableParallelism() / 2)));
  const raw = process.env.BUILD_CONCURRENCY;
  if (raw === undefined || raw === '') {
    return fallback;
  }
  const requested = Number(raw);
  if (!Number.isInteger(requested) || requested < 1) {
    console.warn(`Ignoring invalid BUILD_CONCURRENCY="${raw}" (expected a positive integer), using ${fallback}`);
    return fallback;
  }
  return Math.min(requested, jobCount);
}

const running = new Set();
let stopping = false;
let interruptedExitCode;

const KILL_TIMEOUT_MS = 5000;

function stopRunningJobs() {
  stopping = true;
  const children = [...running];
  for (const child of children) {
    child.kill('SIGTERM');
  }
  return Promise.all(
    children.map(
      child =>
        new Promise(resolve => {
          if (child.exitCode !== null || child.signalCode !== null) {
            resolve();
            return;
          }
          const timer = setTimeout(() => child.kill('SIGKILL'), KILL_TIMEOUT_MS);
          child.once('exit', () => {
            clearTimeout(timer);
            resolve();
          });
        }),
    ),
  );
}

function pipeWithLabel(stream, target, label) {
  readline.createInterface({ input: stream }).on('line', line => target.write(`[${label}] ${line}\n`));
}

function runJob({ label, args }) {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const child = spawn(process.execPath, [process.argv[1], JOB_FLAG, ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    running.add(child);
    pipeWithLabel(child.stdout, process.stdout, label);
    pipeWithLabel(child.stderr, process.stderr, label);
    child.on('error', error => {
      running.delete(child);
      reject(new Error(`[${label}] failed to start: ${error.message}`));
    });
    child.on('exit', (code, signal) => {
      running.delete(child);
      const seconds = ((Date.now() - started) / 1000).toFixed(1);
      if (code === 0) {
        console.log(`[${label}] done in ${seconds} s`);
        resolve();
      } else {
        reject(new Error(`[${label}] exited with ${signal ?? `code ${code}`} after ${seconds} s`));
      }
    });
  });
}

async function runPool(jobs, concurrency) {
  const queue = [...jobs];
  let firstError;
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0 && !stopping) {
      try {
        await runJob(queue.shift());
      } catch (error) {
        if (!stopping) {
          firstError = error;
          await stopRunningJobs();
        }
      }
    }
  });
  await Promise.all(workers);
  if (firstError) {
    throw firstError;
  }
  if (interruptedExitCode !== undefined) {
    throw new Error('Vite build interrupted');
  }
}

async function main(argv) {
  if (argv[0] === JOB_FLAG) {
    await runJobInProcess(argv.slice(1));
    return;
  }

  for (const [signal, number] of [
    ['SIGINT', 2],
    ['SIGTERM', 15],
  ]) {
    process.once(signal, async () => {
      interruptedExitCode = 128 + number;
      await stopRunningJobs();
      process.exit(interruptedExitCode);
    });
  }

  const themeNames = resolveThemes(argv);
  const { buildOutputDirs } = await import('../vite.config.mjs');
  for (const dir of buildOutputDirs(themeNames)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  const jobs = [
    { label: 'fake-server', args: ['fake-server', ...themeNames] },
    ...themeNames.map(name => ({ label: name, args: ['theme', name] })),
  ];
  const concurrency = resolveConcurrency(jobs.length);
  const started = Date.now();
  console.log(`Building ${jobs.map(job => job.label).join(', ')} with ${concurrency} parallel Vite processes`);
  await runPool(jobs, concurrency);
  console.log(`Vite build done in ${((Date.now() - started) / 1000).toFixed(1)} s`);
}

main(process.argv.slice(2)).catch(async error => {
  console.error(error.message);
  if (interruptedExitCode !== undefined) {
    return; // the signal handler exits with 128 + signal number once the jobs have stopped
  }
  await stopRunningJobs();
  process.exit(1);
});
