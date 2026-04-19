import config from '../config/portfolio.json';
import { bold } from '../utils/formatters';

/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function contactCommand(_args, _config) {
  const lines = [
    bold('Contact'),
    '─'.repeat(30),
    '',
    `  Email:    ${config.email}`,
    `  GitHub:   ${config.github}`,
    `  LinkedIn: ${config.linkedin}`,
    `  Resume:   ${config.resume}`,
  ];

  return { type: 'output', content: lines.join('\n') };
}
