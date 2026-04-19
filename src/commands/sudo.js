import { bold, colorSpan } from '../utils/formatters';

const MESSAGES = [
  'Nice try. But this terminal has no root access. 😏',
  "sudo: unable to resolve host 'reality': Permission denied",
  'Root access denied. Maybe try earning it the hard way? 💪',
  "sudo: a terminal-based portfolio is already as cool as it gets.",
];

/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function sudoCommand(_args, _config) {
  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  return {
    type: 'error',
    content: `${bold('sudo')}: ${msg}`,
  };
}
