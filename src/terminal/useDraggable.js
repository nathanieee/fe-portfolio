import { useRef, useCallback, useEffect } from 'react';

/**
 * Makes an element draggable by its header.
 * Attaches move/up listeners to window during drag so the cursor
 * is always tracked — even when it moves faster than the element.
 */
export default function useDraggable() {
  const offsetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef(null);
  const draggingRef = useRef(false);
  const terminalRef = useRef(null);

  // Read the actual rendered position on mount so the first drag
  // doesn't jump. This accounts for CSS centering via transform.
  useEffect(() => {
    if (terminalRef.current && positionRef.current === null) {
      const rect = terminalRef.current.getBoundingClientRect();
      positionRef.current = { x: rect.left, y: rect.top };
      // Replace CSS centering transform with exact pixel position
      terminalRef.current.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      // Remove CSS top/left centering so it doesn't interfere
      terminalRef.current.style.top = '0';
      terminalRef.current.style.left = '0';
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!e.target.closest('.terminal-header')) return;
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - (positionRef.current?.x ?? 0),
      y: e.clientY - (positionRef.current?.y ?? 0),
    };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingRef.current) return;
      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;
      positionRef.current = { x: newX, y: newY };
      if (terminalRef.current) {
        terminalRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    const handleMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { terminalRef, handleMouseDown };
}
