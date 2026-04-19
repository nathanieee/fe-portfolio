/**
 * Format a bullet list with optional label coloring.
 * @param {string[]} items
 * @returns {string}
 */
export function bulletList(items) {
  return items.map((item) => `  • ${item}`).join('\n');
}

/**
 * Format a simple table with headers and rows.
 * @param {string[]} headers
 * @param {string[][]} rows
 * @returns {string}
 */
export function table(headers, rows) {
  const colWidths = headers.map((h, i) => {
    const maxRowLen = rows.reduce((max, row) => {
      const stripped = stripHtml(row[i] || '');
      return Math.max(max, stripped.length);
    }, 0);
    return Math.max(h.length, maxRowLen);
  });

  const headerLine = headers.map((h, i) => h.padEnd(colWidths[i])).join('  ');
  const separator = colWidths.map((w) => '─'.repeat(w)).join('──');

  const dataLines = rows.map((row) =>
    row.map((cell, i) => {
      const stripped = stripHtml(cell || '');
      const padding = colWidths[i] - stripped.length;
      return (cell || '') + ' '.repeat(Math.max(0, padding));
    }).join('  ')
  );

  return [headerLine, separator, ...dataLines].join('\n');
}

/**
 * Wrap text in a colored span.
 * @param {string} text
 * @param {string} color
 * @returns {string}
 */
export function colorSpan(text, color) {
  return `<span style="color:${color}">${text}</span>`;
}

/**
 * Wrap text in a bold span.
 * @param {string} text
 * @returns {string}
 */
export function bold(text) {
  return `<strong>${text}</strong>`;
}

/**
 * Create a labeled section header.
 * @param {string} title
 * @returns {string}
 */
export function sectionHeader(title) {
  const line = '═'.repeat(title.length + 4);
  return `${line}\n  ${title}  \n${line}`;
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}
