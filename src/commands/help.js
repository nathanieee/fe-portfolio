const COMMAND_LIST = [
  { cmd: 'about',      alias: 'ab',   desc: 'Who am I' },
  { cmd: 'skills',     alias: 'sk',   desc: 'Technical skills' },
  { cmd: 'projects',   alias: 'proj', desc: 'View projects (or "projects <id>")' },
  { cmd: 'experience', alias: 'exp',  desc: 'Work history' },
  { cmd: 'contact',    alias: 'con',  desc: 'Get in touch' },
  { cmd: 'theme',      alias: 'th',   desc: 'Change theme (or "theme list")' },
  { cmd: 'matrix',     alias: '',     desc: 'Toggle matrix rain' },
  { cmd: 'sudo',       alias: '',     desc: 'Try it ;)' },
  { cmd: 'clear',      alias: 'cls',  desc: 'Clear terminal' },
  { cmd: 'help',       alias: 'h',    desc: 'Show this message' },
];

/**
 * @param {string[]} args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function helpCommand(args, _config) {
  const lines = [
    '<strong>Available Commands</strong>',
    '─'.repeat(50),
    '',
  ];

  COMMAND_LIST.forEach(({ cmd, alias, desc }) => {
    const aliasStr = alias ? ` (${alias})` : '';
    lines.push(`  <strong>${cmd}</strong>${aliasStr.padEnd(12)}  ${desc}`);
  });

  lines.push(
    '',
    `Type a command and press Enter. Use ↑/↓ for history, Tab for autocomplete.`
  );

  return { type: 'output', content: lines.join('\n') };
}
