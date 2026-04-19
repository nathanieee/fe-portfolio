import matrixCommand from './matrix';

describe('matrix command', () => {
  it('returns system type', () => {
    const result = matrixCommand([], {});
    expect(result.type).toBe('system');
  });

  it('returns toggle action', () => {
    const result = matrixCommand([], {});
    expect(result.action).toBe('TOGGLE_MATRIX');
  });

  it('includes matrix in message', () => {
    const result = matrixCommand([], {});
    expect(result.content).toContain('Matrix rain');
  });
});
