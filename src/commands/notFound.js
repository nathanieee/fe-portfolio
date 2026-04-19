/**
 * @param {string[]} args
 * @param {object} _config
 * @returns {{ type: string, content: string }}
 */
export default function notFoundCommand(args, _config) {
  const cmd = args[0] || '';
  return {
    type: 'error',
    content: `command not found: ${cmd}. Type <strong>help</strong> for available commands.`,
  };
}
