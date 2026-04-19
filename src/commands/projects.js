import config from '../config/portfolio.json';
import { bold, bulletList } from '../utils/formatters';

/**
 * @param {string[]} args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function projectsCommand(args, _config) {
  if (args.length > 0) {
    return showProjectDetail(args[0]);
  }
  return showProjectList();
}

function showProjectList() {
  const lines = [bold('Projects'), '─'.repeat(40), ''];

  config.projects.forEach((project) => {
    lines.push(`  ${bold(project.id.padEnd(20))} ${project.name}`);
    lines.push(`  ${' '.repeat(20)} ${project.description.slice(0, 60)}...`);
    lines.push('');
  });

  lines.push(`Type ${bold('projects <id>')} for details.`);

  return { type: 'output', content: lines.join('\n') };
}

function showProjectDetail(id) {
  const project = config.projects.find(
    (p) => p.id === id || p.id === id.toLowerCase()
  );

  if (!project) {
    return {
      type: 'error',
      content: `Project not found: ${id}. Type ${bold('projects')} to see all.`,
    };
  }

  const lines = [
    bold(project.name),
    '─'.repeat(project.name.length),
    '',
    project.description,
    '',
    bold('Tech Stack:'),
    bulletList(project.tech),
    '',
  ];

  if (project.link && project.link !== '#') {
    lines.push(`Link: ${project.link}`);
  }

  return { type: 'output', content: lines.join('\n') };
}
