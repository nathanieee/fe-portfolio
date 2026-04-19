import { useCallback } from 'react';

/**
 * Custom hook for navigating command history with up/down arrows.
 */
export default function useTerminalHistory(commandHistory, historyIndex, dispatch) {
  const navigateUp = useCallback(() => {
    if (commandHistory.length === 0) return null;
    const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
    dispatch({ type: 'SET_HISTORY_INDEX', payload: newIndex });
    return commandHistory[newIndex];
  }, [commandHistory, historyIndex, dispatch]);

  const navigateDown = useCallback(() => {
    if (historyIndex <= 0) {
      dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
      return '';
    }
    const newIndex = historyIndex - 1;
    dispatch({ type: 'SET_HISTORY_INDEX', payload: newIndex });
    return commandHistory[newIndex];
  }, [commandHistory, historyIndex, dispatch]);

  return { navigateUp, navigateDown };
}
