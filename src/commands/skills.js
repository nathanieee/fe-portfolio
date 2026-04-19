import config from '../config/portfolio.json';
import { bulletList, bold, sectionHeader } from '../utils/formatters';

/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function skillsCommand(_args, _config) {
  const { skills } = config;
  const lines = [sectionHeader('Technical Skills'), ''];

  Object.entries(skills).forEach(([category, items]) => {
    lines.push(bold(`  ${category}`));
    lines.push(bulletList(items));
    lines.push('');
  });

  return { type: 'output', content: lines.join('\n') };
}
