import React from 'react';
import { render, screen, act } from '@testing-library/react';
import TypingEffect from './TypingEffect';

describe('TypingEffect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initially with no characters', () => {
    render(<TypingEffect text="Hello" speed={10} />);
    const el = screen.getByText('▋');
    expect(el).toBeInTheDocument();
  });

  it('reveals all characters after timeouts', () => {
    render(<TypingEffect text="Hi" speed={10} />);

    act(() => { jest.advanceTimersByTime(10); });
    act(() => { jest.advanceTimersByTime(10); });

    expect(screen.queryByText('▋')).not.toBeInTheDocument();
  });

  it('calls onComplete when finished', () => {
    const onComplete = jest.fn();
    render(<TypingEffect text="AB" speed={5} onComplete={onComplete} />);

    act(() => { jest.advanceTimersByTime(5); });
    expect(onComplete).not.toHaveBeenCalled();

    act(() => { jest.advanceTimersByTime(5); });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = render(<TypingEffect text="Hello" speed={100} />);
    unmount();
    act(() => { jest.advanceTimersByTime(200); });
    // No errors means cleanup worked
  });
});
