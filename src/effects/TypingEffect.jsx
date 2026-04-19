import React, { useState, useEffect } from 'react';

/**
 * Character-by-character reveal animation.
 * Safe: text content is always provided by our own welcome banner (static string).
 * @param {{ text: string, speed?: number, onComplete?: () => void }} props
 */
export default function TypingEffect({ text, speed = 30, onComplete }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= text.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setRevealed((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [revealed, text.length, speed, onComplete]);

  return (
    <span className="typing-effect">
      <span
        // Safe: text is a static welcome banner string from our own code
        dangerouslySetInnerHTML={{ __html: text.slice(0, revealed) }}
      />
      {revealed < text.length && <span className="typing-cursor">▋</span>}
    </span>
  );
}
