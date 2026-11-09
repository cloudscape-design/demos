const BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const TOKEN = /[\w$]+|[^\s\w$]/g;

function encodeVlq(value) {
  let vlq = value < 0 ? (-value << 1) | 1 : value << 1;
  let encoded = '';
  do {
    let digit = vlq & 31;
    vlq >>>= 5;
    if (vlq > 0) {
      digit |= 32;
    }
    encoded += BASE64[digit];
  } while (vlq > 0);
  return encoded;
}

function encodeMappings(lines) {
  let previousSourceLine = 0;
  let previousSourceColumn = 0;
  return lines
    .map(segments => {
      let previousColumn = 0;
      return segments
        .map(([column, sourceLine, sourceColumn]) => {
          const segment =
            encodeVlq(column - previousColumn) +
            encodeVlq(0) +
            encodeVlq(sourceLine - previousSourceLine) +
            encodeVlq(sourceColumn - previousSourceColumn);
          previousColumn = column;
          previousSourceLine = sourceLine;
          previousSourceColumn = sourceColumn;
          return segment;
        })
        .join(',');
    })
    .join(';');
}

/**
 * `code.replace(pattern, replacer)` that also returns a source map, for plugin transform hooks. The replacements must
 * not contain line breaks; `prefix` (whole lines, ending in `\n`, e.g. hoisted imports) is prepended unmapped.
 * Every original line keeps its position mapping, and each replacement maps to the start and end of what it replaced.
 * @param {string} code
 * @param {RegExp} pattern a global regular expression
 * @param {(...args: any[]) => string} replacer called like a `String.prototype.replace` replacer function
 * @param {{ id: string, prefix?: (() => string) | string }} options `prefix` may be a function, evaluated after all
 *   replacements (so it can list what the replacer collected)
 * @returns {{ code: string, map: { version: 3, sources: string[], sourcesContent: string[], names: [], mappings: string } } | null}
 *   null when nothing matched
 */
export function replaceWithSourceMap(code, pattern, replacer, { id, prefix = '' }) {
  const lines = [[]];
  let output = '';
  let sourceLine = 0;
  let sourceColumn = 0;
  let matched = false;

  const mark = () => {
    const segments = lines[lines.length - 1];
    const column = output.length - output.lastIndexOf('\n') - 1;
    if (segments.at(-1)?.[0] === column) {
      segments.pop();
    }
    segments.push([column, sourceLine, sourceColumn]);
  };
  const copy = text => {
    const parts = text.split('\n');
    parts.forEach((part, index) => {
      if (index > 0) {
        output += '\n';
        lines.push([]);
        sourceLine++;
        sourceColumn = 0;
      }
      if (part.length > 0 || index > 0) {
        mark();
      }
      // One segment per token, like magic-string's `hires: 'boundary'`: Vite chains this map with later ones, and
      // positions between two segments resolve to the earlier segment without a column offset.
      let offset = 0;
      for (const token of part.matchAll(TOKEN)) {
        output += part.slice(offset, token.index);
        sourceColumn += token.index - offset;
        mark();
        output += token[0];
        sourceColumn += token[0].length;
        offset = token.index + token[0].length;
      }
      output += part.slice(offset);
      sourceColumn += part.length - offset;
    });
  };
  const skip = text => {
    const parts = text.split('\n');
    sourceLine += parts.length - 1;
    sourceColumn = parts.length > 1 ? parts[parts.length - 1].length : sourceColumn + text.length;
  };

  let last = 0;
  for (const match of code.matchAll(pattern)) {
    matched = true;
    copy(code.slice(last, match.index));
    const replacement = replacer(...match, match.index, code);
    if (replacement.includes('\n')) {
      throw new Error('replaceWithSourceMap: replacements must not contain line breaks');
    }
    mark();
    output += replacement;
    skip(match[0]);
    mark();
    last = match.index + match[0].length;
  }
  if (!matched) {
    return null;
  }
  copy(code.slice(last));

  const prefixText = typeof prefix === 'function' ? prefix() : prefix;
  const prefixLines = prefixText === '' ? 0 : prefixText.split('\n').length - 1;
  return {
    code: prefixText + output,
    map: {
      version: 3,
      sources: [id],
      sourcesContent: [code],
      names: [],
      mappings: encodeMappings([...Array.from({ length: prefixLines }, () => []), ...lines]),
    },
  };
}
