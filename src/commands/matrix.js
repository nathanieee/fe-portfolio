import { bold } from '../utils/formatters';

/**
 * @param {string[]} _args
 * @param {object} _config
 * @returns {{ type: string, content: string, action: string }}
 */
export default function matrixCommand(_args, _config) {
  return {
    type: 'system',
    content: `${bold('Matrix rain')} toggled. Type ${bold('matrix')} again to switch back.`,
    action: 'TOGGLE_MATRIX',
  };
}
