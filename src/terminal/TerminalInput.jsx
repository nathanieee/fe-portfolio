import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTerminal } from '../context/TerminalContext';
import useTerminalHistory from './useTerminalHistory';
import './TerminalInput.css';

export default function TerminalInput({ onCommand, onTabComplete }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const { state, dispatch } = useTerminal();
  const { navigateUp, navigateDown } = useTerminalHistory(
    state.commandHistory,
    state.historyIndex,
    dispatch
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = input;
        setInput('');
        if (value.trim()) {
          onCommand(value);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = navigateUp();
        if (prev !== null) setInput(prev);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = navigateDown();
        if (next !== null) setInput(next);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (onTabComplete) {
          const completed = onTabComplete(input);
          if (completed !== null) setInput(completed);
        }
      }
    },
    [input, onCommand, onTabComplete, navigateUp, navigateDown]
  );

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="terminal-input-area" onClick={focusInput}>
      <span className="terminal-prompt">~/portfolio $</span>
      <div className="terminal-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Terminal command input"
        />
        <span className="terminal-input-display">{input}</span>
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
