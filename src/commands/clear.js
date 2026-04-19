/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, action: string }}
 */
export default function clearCommand(_args, _config) {
  return { type: 'output', action: 'CLEAR', content: '' };
}
