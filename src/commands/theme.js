import themes from '../config/themes.json';
import { bold, bulletList } from '../utils/formatters';

/**
 * @param {string[]} args
 * @param {object} _config
 * @returns {{ type: string, content: string, action?: string, theme?: string }}
 */
export default function themeCommand(args, _config) {
  if (args.length === 0 || args[0] === 'list') {
    return listThemes();
  }

  return setTheme(args[0]);
}

function listThemes() {
  const themeNames = Object.entries(themes).map(
    ([key, t]) => `${key.padEnd(10)} ${t.name}`
  );

  return {
    type: 'output',
    content: [
      bold('Available Themes'),
      '─'.repeat(30),
      '',
      bulletList(themeNames),
      '',
      `Type ${bold('theme <name>')} to switch.`,
    ].join('\n'),
  };
}

function setTheme(name) {
  const themeKey = name.toLowerCase();

  if (!themes[themeKey]) {
    return {
      type: 'error',
      content: `Unknown theme: ${name}. Type ${bold('theme list')} to see available themes.`,
    };
  }

  return {
    type: 'success',
    content: `Theme changed to ${bold(themes[themeKey].name)}.`,
    action: 'SET_THEME',
    theme: themeKey,
  };
}
