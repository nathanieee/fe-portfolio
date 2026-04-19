import config from '../config/portfolio.json';
import { bold } from '../utils/formatters';

/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function experienceCommand(_args, _config) {
  const lines = [bold('Work Experience'), '─'.repeat(40), ''];

  config.experience.forEach((exp, i) => {
    if (i > 0) lines.push('');
    lines.push(`  ${bold(exp.role)}`);
    lines.push(`  ${exp.company} · ${exp.period}`);
    lines.push(`  ${exp.description}`);
  });

  return { type: 'output', content: lines.join('\n') };
}
