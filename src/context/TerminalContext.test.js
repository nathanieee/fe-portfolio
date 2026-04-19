import { reducer } from './TerminalContext';

describe('terminal reducer', () => {
  const initialState = {
    outputLines: [],
    commandHistory: [],
    historyIndex: -1,
    currentTheme: 'classic',
    isMatrixActive: false,
  };

  it('handles SUBMIT_COMMAND', () => {
    const action = {
      type: 'SUBMIT_COMMAND',
      payload: {
        command: 'help',
        outputLines: [
          { id: '1', type: 'output', content: 'Available commands...', timestamp: 0 },
        ],
      },
    };
    const next = reducer(initialState, action);
    expect(next.outputLines).toHaveLength(1);
    expect(next.commandHistory).toEqual(['help']);
    expect(next.historyIndex).toBe(-1);
  });

  it('limits command history to MAX_HISTORY', () => {
    const commands = Array.from({ length: 105 }, (_, i) => `cmd${i}`);
    const state = { ...initialState, commandHistory: commands.slice(0, 99) };
    const action = {
      type: 'SUBMIT_COMMAND',
      payload: {
        command: 'cmd100',
        outputLines: [{ id: 'x', type: 'output', content: '', timestamp: 0 }],
      },
    };
    const next = reducer(state, action);
    expect(next.commandHistory).toHaveLength(100);
    expect(next.commandHistory[0]).toBe('cmd100');
  });

  it('does not mutate state on SUBMIT_COMMAND', () => {
    const action = {
      type: 'SUBMIT_COMMAND',
      payload: {
        command: 'help',
        outputLines: [{ id: '1', type: 'output', content: 'test', timestamp: 0 }],
      },
    };
    const next = reducer(initialState, action);
    expect(initialState.outputLines).toEqual([]);
    expect(initialState.commandHistory).toEqual([]);
    expect(next).not.toBe(initialState);
  });

  it('handles CLEAR_OUTPUT', () => {
    const state = {
      ...initialState,
      outputLines: [{ id: '1', type: 'output', content: 'test', timestamp: 0 }],
    };
    const next = reducer(state, { type: 'CLEAR_OUTPUT' });
    expect(next.outputLines).toEqual([]);
  });

  it('handles SET_THEME', () => {
    const next = reducer(initialState, { type: 'SET_THEME', payload: 'hacker' });
    expect(next.currentTheme).toBe('hacker');
  });

  it('handles TOGGLE_MATRIX', () => {
    const next = reducer(initialState, { type: 'TOGGLE_MATRIX' });
    expect(next.isMatrixActive).toBe(true);
    const next2 = reducer(next, { type: 'TOGGLE_MATRIX' });
    expect(next2.isMatrixActive).toBe(false);
  });

  it('handles SET_HISTORY_INDEX', () => {
    const next = reducer(initialState, { type: 'SET_HISTORY_INDEX', payload: 3 });
    expect(next.historyIndex).toBe(3);
  });

  it('returns same state for unknown action', () => {
    const next = reducer(initialState, { type: 'UNKNOWN' });
    expect(next).toBe(initialState);
  });
});
