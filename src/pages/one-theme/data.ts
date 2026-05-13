// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';

export interface Deployment {
  id: string;
  status: string;
  statusType: StatusIndicatorProps.Type;
  sourceBranch: string;
  sourceCommit?: string;
  sourceType: 'git' | 'zip';
  commitMessage?: string;
  sourceUrl: string;
  createdAt: string;
  createdBy: string;
  environment: 'Production' | 'Preview';
  duration: string;
  active?: boolean;
}

export interface Project {
  id: string;
  name: string;
  deploymentStatus: string | null;
  domainName: string | null;
  lastUpdated: string | null;
  latestDeployment: Deployment;
  repoOwner: string;
  repoName: string;
  lastCommitMessage: string;
}

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'banana-truck',
    name: 'banana-truck',
    deploymentStatus: 'Ready',
    domainName: 'banana-truck.com',
    lastUpdated: '4/26/2026, 09:14:30 GMT-7',
    repoOwner: 'alicedev',
    repoName: 'banana-truck-app',
    lastCommitMessage: 'fix: resolve cart total rounding on checkout',
    latestDeployment: {
      id: 'dep-bt-0047',
      status: 'Deployed',
      statusType: 'success',
      sourceBranch: 'main',
      sourceCommit: 'aa3443c',
      sourceType: 'git',
      commitMessage: 'fixing this bug',
      sourceUrl: '#',
      createdAt: '4/26/2026, 09:14:30 GMT-7',
      createdBy: 'alicedev',
      environment: 'Production',
      duration: '9 seconds',
      active: true,
    },
  },
  {
    id: 'double-r',
    name: 'double-r',
    deploymentStatus: 'Ready',
    domainName: 'double-r.omega.dev',
    lastUpdated: '4/25/2026, 16:42:00 GMT-7',
    repoOwner: 'alicedev',
    repoName: 'double-r-api',
    lastCommitMessage: 'feat: add rate limiting to /search endpoint',
    latestDeployment: {
      id: 'dep-dr-0031',
      status: 'Deployed',
      statusType: 'success',
      sourceBranch: 'main',
      sourceCommit: 'dx217d7',
      sourceType: 'git',
      commitMessage: 'rate limiting',
      sourceUrl: '#',
      createdAt: '4/25/2026, 16:42:00 GMT-7',
      createdBy: 'alicedev',
      environment: 'Production',
      duration: '9 seconds',
    },
  },
  {
    id: 'test-project',
    name: 'test-project',
    deploymentStatus: 'In progress',
    domainName: 'test-project.omega.dev',
    lastUpdated: '4/27/2026, 08:05:12 GMT-7',
    repoOwner: 'alicedev',
    repoName: 'test-project',
    lastCommitMessage: 'chore: upgrade dependencies to latest',
    latestDeployment: {
      id: 'dep-tp-0008',
      status: 'In progress',
      statusType: 'in-progress',
      sourceBranch: 'feature/auth-flow',
      sourceType: 'git',
      sourceCommit: 'bb1234a',
      commitMessage: 'auth flow',
      sourceUrl: '#',
      createdAt: '4/27/2026, 08:05:12 GMT-7',
      createdBy: 'alicedev',
      environment: 'Preview',
      duration: '20 seconds',
    },
  },
  {
    id: 'portfolio-site',
    name: 'portfolio-site',
    deploymentStatus: 'Failed',
    domainName: null,
    lastUpdated: '4/24/2026, 11:30:55 GMT-7',
    repoOwner: 'alicedev',
    repoName: 'portfolio-site',
    lastCommitMessage: 'feat: add dark mode toggle to header',
    latestDeployment: {
      id: 'dep-ps-0012',
      status: 'Failed',
      statusType: 'error',
      sourceBranch: 'feat/dark-mode',
      sourceType: 'git',
      sourceCommit: 'cc9981f',
      commitMessage: 'dark mode toggle',
      sourceUrl: '#',
      createdAt: '4/24/2026, 11:30:55 GMT-7',
      createdBy: 'alicedev',
      environment: 'Production',
      duration: '44 seconds',
    },
  },
  {
    id: 'recipe-api',
    name: 'recipe-api',
    deploymentStatus: 'Ready',
    domainName: 'recipes.omega.dev',
    lastUpdated: '4/23/2026, 14:20:00 GMT-7',
    repoOwner: 'alicedev',
    repoName: 'recipe-api',
    lastCommitMessage: 'perf: add Redis caching for popular queries',
    latestDeployment: {
      id: 'dep-ra-0055',
      status: 'Deployed',
      statusType: 'success',
      sourceBranch: 'main',
      sourceType: 'zip',
      sourceUrl: '#',
      createdAt: '4/23/2026, 14:20:00 GMT-7',
      createdBy: 'alicedev',
      environment: 'Preview',
      duration: '20 seconds',
    },
  },
  {
    id: 'event-planner',
    name: 'event-planner',
    deploymentStatus: 'Pending',
    domainName: null,
    lastUpdated: '4/22/2026, 10:15:45 GMT-7',
    repoOwner: 'alicedev',
    repoName: 'event-planner',
    lastCommitMessage: 'docs: add API reference for calendar endpoints',
    latestDeployment: {
      id: 'dep-ep-0003',
      status: 'Pending',
      statusType: 'pending',
      sourceBranch: 'staging',
      sourceType: 'git',
      sourceCommit: 'ff8821e',
      commitMessage: 'calendar endpoints',
      sourceUrl: '#',
      createdAt: '4/22/2026, 10:15:45 GMT-7',
      createdBy: 'alicedev',
      environment: 'Preview',
      duration: '44 seconds',
    },
  },
];

// --- Deployments list ---

export const DEPLOYMENTS: Deployment[] = [
  {
    id: 'dep-rj3n20n-1',
    status: 'Deployed',
    statusType: 'success',
    sourceBranch: 'main',
    sourceCommit: 'aa3443c',
    sourceType: 'git',
    commitMessage: 'fix: cart total rounding',
    sourceUrl: '#',
    createdAt: '4/28/2026, 10:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Production',
    duration: '9 seconds',
    active: true,
  },
  {
    id: 'dep-rj3n20n-2',
    status: 'Deployed',
    statusType: 'success',
    sourceBranch: '',
    sourceCommit: '',
    sourceType: 'zip',
    sourceUrl: '#',
    createdAt: '4/27/2026, 14:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Preview',
    duration: '20 seconds',
  },
  {
    id: 'dep-rj3n20n-3',
    status: 'Cancelled',
    statusType: 'warning',
    sourceBranch: 'main',
    sourceCommit: 'b71e02f',
    sourceType: 'git',
    commitMessage: 'feat: add search filters',
    sourceUrl: '#',
    createdAt: '4/27/2026, 10:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Preview',
    duration: '44 seconds',
  },
  {
    id: 'dep-rj3n20n-4',
    status: 'Deployed',
    statusType: 'success',
    sourceBranch: 'main',
    sourceCommit: 'e5f891a',
    sourceType: 'git',
    commitMessage: 'chore: bump dependencies',
    sourceUrl: '#',
    createdAt: '4/23/2026, 09:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Production',
    duration: '9 seconds',
  },
  {
    id: 'dep-rj3n20n-5',
    status: 'Failed',
    statusType: 'error',
    sourceBranch: 'main',
    sourceCommit: '3dc74b2',
    sourceType: 'git',
    commitMessage: 'feat: migrate to v3 SDK',
    sourceUrl: '#',
    createdAt: '1/5/2026, 11:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Production',
    duration: '20 seconds',
  },
  {
    id: 'dep-rj3n20n-6',
    status: 'Deployed',
    statusType: 'success',
    sourceBranch: '',
    sourceCommit: '',
    sourceType: 'zip',
    sourceUrl: '#',
    createdAt: '1/5/2026, 10:30:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Preview',
    duration: '44 seconds',
  },
  {
    id: 'dep-rj3n20n-7',
    status: 'Deployed',
    statusType: 'success',
    sourceBranch: 'main',
    sourceCommit: '91ca0d8',
    sourceType: 'git',
    commitMessage: 'perf: lazy load images',
    sourceUrl: '#',
    createdAt: '1/5/2026, 09:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Production',
    duration: '9 seconds',
  },
  {
    id: 'dep-rj3n20n-8',
    status: 'Skipped',
    statusType: 'stopped',
    sourceBranch: '',
    sourceCommit: '',
    sourceType: 'zip',
    sourceUrl: '#',
    createdAt: '1/5/2026, 08:30:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Preview',
    duration: '20 seconds',
  },
  {
    id: 'dep-rj3n20n-9',
    status: 'Cancelled',
    statusType: 'warning',
    sourceBranch: '',
    sourceCommit: '',
    sourceType: 'zip',
    sourceUrl: '#',
    createdAt: '1/5/2026, 08:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Preview',
    duration: '44 seconds',
  },
  {
    id: 'dep-rj3n20n-10',
    status: 'Failed',
    statusType: 'error',
    sourceBranch: 'main',
    sourceCommit: 'f4820ae',
    sourceType: 'git',
    commitMessage: 'refactor: auth middleware',
    sourceUrl: '#',
    createdAt: '1/5/2026, 07:00:00 GMT-7',
    createdBy: 'alicedev',
    environment: 'Production',
    duration: '44 seconds',
  },
];

// --- Telemetry ---

export interface TelemetryMetric {
  label: string;
  value: string;
  change: string;
  projectName: string;
  sparkline: number[];
  color?: string;
}

export const TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    label: 'Most requests',
    value: '142.3K',
    change: '+12.4%',
    projectName: 'banana-truck',
    sparkline: [80, 130, 70, 145, 90, 160, 75, 155, 100, 142],
    color: '#295EFF',
  },
  {
    label: 'Highest error rate',
    value: '0.8%',
    change: '-0.3%',
    projectName: 'test-project',
    sparkline: [1.2, 1.1, 1.0, 0.9, 1.1, 0.9, 0.85, 0.82, 0.8, 0.8],
    color: '#DB0000',
  },
  {
    label: 'Most requests',
    value: '142.3K',
    change: '+12.4%',
    projectName: 'double-r',
    sparkline: [95, 155, 60, 145, 75, 160, 55, 150, 85, 142],
    color: '#295EFF',
  },
  {
    label: 'Highest cache hit ratio',
    value: '94.2%',
    change: '+1.1%',
    projectName: 'banana-truck',
    sparkline: [85, 95, 78, 97, 82, 96, 80, 98, 88, 94],
    color: '#295EFF',
  },
];

// --- Integrations ---

export interface Integration {
  name: string;
  icon: 'integration' | 'gen-ai' | 'messaging';
  lastUsed: string;
}

export const INTEGRATIONS: Integration[] = [
  { name: 'blobblob-blob', icon: 'integration', lastUsed: '1 day ago' },
  { name: 'banana-agent', icon: 'gen-ai', lastUsed: '1 day ago' },
  { name: 'prod-db', icon: 'integration', lastUsed: '2 weeks ago' },
  { name: 'bananastand-storage', icon: 'integration', lastUsed: '2 weeks ago' },
  { name: 'message-stuff', icon: 'messaging', lastUsed: '1 month ago' },
];

// --- Usage ---

export interface UsageMetric {
  label: string;
  current: string;
  limit: string;
  percentage: number;
}

export const USAGE_METRICS: UsageMetric[] = [
  { label: 'Bandwidth', current: '1', limit: '100G B', percentage: 1 },
  { label: 'Build minutes', current: '50', limit: '1000 minutes', percentage: 50 },
  { label: 'Compute', current: '25K', limit: '100K invocations', percentage: 25 },
  { label: 'Environments', current: '1/2', limit: 'environments', percentage: 50 },
];

// --- Next steps ---

export interface NextStep {
  title: string;
  description: string;
  actionLabel: string;
}

export const NEXT_STEPS: NextStep[] = [
  {
    title: 'Custom domain',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec rhoncus magna.',
    actionLabel: 'Set up',
  },
];

export function relativeTime(dateStr: string): string {
  const ms = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
