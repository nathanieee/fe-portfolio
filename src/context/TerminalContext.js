import React, { createContext, useContext, useReducer } from 'react';
import { MAX_HISTORY } from '../utils/constants';

const TerminalContext = createContext(null);

const initialState = {
  outputLines: [],
  commandHistory: [],
  historyIndex: -1,
  currentTheme: 'classic',
  isMatrixActive: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SUBMIT_COMMAND': {
      const { command, outputLines } = action.payload;
      const updatedHistory = [command, ...state.commandHistory].slice(0, MAX_HISTORY);
      return {
        ...state,
        outputLines: [...state.outputLines, ...outputLines],
        commandHistory: updatedHistory,
        historyIndex: -1,
      };
    }

    case 'CLEAR_OUTPUT':
      return {
        ...state,
        outputLines: [],
      };

    case 'SET_THEME':
      return {
        ...state,
        currentTheme: action.payload,
      };

    case 'TOGGLE_MATRIX':
      return {
        ...state,
        isMatrixActive: !state.isMatrixActive,
      };

    case 'SET_HISTORY_INDEX':
      return {
        ...state,
        historyIndex: action.payload,
      };

    default:
      return state;
  }
}

export function TerminalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TerminalContext.Provider value={{ state, dispatch }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
