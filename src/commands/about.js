import config from '../config/portfolio.json';

/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function aboutCommand(_args, _config) {
  const lines = [
    `<strong>${config.name}</strong> — ${config.title}`,
    `Location: ${config.location}`,
    '',
    ...config.bio.map((line) => `  ${line}`),
    '',
    'Type <strong>help</strong> to see available commands.',
  ];

  return { type: 'output', content: lines.join('\n') };
}
