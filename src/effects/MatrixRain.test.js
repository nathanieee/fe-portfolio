import React from 'react';
import { render } from '@testing-library/react';
import MatrixRain from './MatrixRain';

describe('MatrixRain', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Mock requestAnimationFrame for jsdom
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 16));
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('renders a canvas element', () => {
    const { container } = render(
      <div style={{ position: 'relative', width: 800, height: 600 }}>
        <MatrixRain active={true} />
      </div>
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders when inactive without errors', () => {
    const { container } = render(
      <div style={{ position: 'relative', width: 800, height: 600 }}>
        <MatrixRain active={false} />
      </div>
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('has pointer-events none', () => {
    const { container } = render(
      <div style={{ position: 'relative', width: 800, height: 600 }}>
        <MatrixRain active={true} />
      </div>
    );
    const canvas = container.querySelector('canvas');
    expect(canvas.style.pointerEvents).toBe('none');
  });
});
