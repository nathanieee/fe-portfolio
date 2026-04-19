import { ALIASES } from './constants';

/**
 * Parse raw input string into command and arguments.
 * Resolves aliases to their canonical command names.
 *
 * @param {string} input - Raw user input
 * @returns {{ command: string, args: string[] }}
 */
export function parseCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    return { command: '', args: [] };
  }

  const tokens = trimmed.split(/\s+/);
  const rawCommand = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  const command = ALIASES[rawCommand] || rawCommand;

  return { command, args };
}
