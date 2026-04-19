import React from 'react';

export default function TerminalHeader({ theme }) {
  return (
    <div className="terminal-header" style={{ backgroundColor: theme.headerBg, color: theme.headerFg }}>
      <div className="terminal-dots">
        <span className="terminal-dot" style={{ backgroundColor: theme.dot1 }} />
        <span className="terminal-dot" style={{ backgroundColor: theme.dot2 }} />
        <span className="terminal-dot" style={{ backgroundColor: theme.dot3 }} />
      </div>
      <span className="terminal-title">portfolio@bash</span>
      <div className="terminal-dots-spacer" />
    </div>
  );
}
