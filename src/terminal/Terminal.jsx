import React, { useCallback, useEffect, useState } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { parseCommand } from '../utils/commandParser';
import { executeCommand } from '../commands';
import { bold } from '../utils/formatters';
import config from '../config/portfolio.json';
import themes from '../config/themes.json';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import useTabCompletion from './useTabCompletion';
import TypingEffect from '../effects/TypingEffect';
import MatrixRain from '../effects/MatrixRain';
import './Terminal.css';

let lineIdCounter = 0;
function nextId() {
  return `line-${++lineIdCounter}`;
}

const WELCOME_TEXT = `${bold(`Welcome to ${config.name}'s Portfolio`)}
Type ${bold('help')} to see available commands.`;

export default function Terminal() {
  const { state, dispatch } = useTerminal();
  const theme = themes[state.currentTheme];
  const tabComplete = useTabCompletion();
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  const handleCommand = useCallback(
    (rawInput) => {
      const { command, args } = parseCommand(rawInput);

      const inputLine = {
        id: nextId(),
        type: 'input',
        content: rawInput,
        timestamp: Date.now(),
      };

      const result = executeCommand(command, args, config);

      // Handle special actions
      if (result.action === 'CLEAR') {
        dispatch({ type: 'SUBMIT_COMMAND', payload: { command: rawInput, outputLines: [inputLine] } });
        dispatch({ type: 'CLEAR_OUTPUT' });
        return;
      }

      if (result.action === 'SET_THEME') {
        dispatch({ type: 'SET_THEME', payload: result.theme });
      }

      if (result.action === 'TOGGLE_MATRIX') {
        dispatch({ type: 'TOGGLE_MATRIX' });
      }

      const outputLines = [
        inputLine,
        {
          id: nextId(),
          type: result.type,
          content: result.content,
          timestamp: Date.now(),
        },
      ];

      dispatch({
        type: 'SUBMIT_COMMAND',
        payload: { command: rawInput, outputLines },
      });
    },
    [dispatch]
  );

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.querySelector('.terminal');
    if (root) {
      Object.entries(theme).forEach(([key, value]) => {
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--color-${cssVar}`, value);
      });
    }
  }, [theme]);

  const handleTerminalClick = useCallback(() => {
    const input = document.querySelector('.terminal-input');
    input?.focus();
  }, []);

  return (
    <div
      className="terminal"
      role="application"
      aria-label="Terminal portfolio"
      onClick={handleTerminalClick}
      tabIndex={-1}
    >
      {state.isMatrixActive && <MatrixRain active={state.isMatrixActive} />}
      <TerminalHeader theme={theme} />
      <TerminalOutput lines={state.outputLines} theme={theme}>
        {!welcomeComplete && (
          <div className="terminal-line terminal-line--system" style={{ color: theme.accent }}>
            <TypingEffect
              text={WELCOME_TEXT}
              speed={20}
              onComplete={() => setWelcomeComplete(true)}
            />
          </div>
        )}
      </TerminalOutput>
      <TerminalInput onCommand={handleCommand} onTabComplete={tabComplete} />
    </div>
  );
}
