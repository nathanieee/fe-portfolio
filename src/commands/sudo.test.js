import sudoCommand from './sudo';

describe('sudo command', () => {
  it('returns error type', () => {
    const result = sudoCommand([], {});
    expect(result.type).toBe('error');
  });

  it('includes sudo in output', () => {
    const result = sudoCommand([], {});
    expect(result.content).toContain('sudo');
  });

  it('always returns a message', () => {
    // Run multiple times to test randomness
    for (let i = 0; i < 10; i++) {
      const result = sudoCommand([], {});
      expect(result.content.length).toBeGreaterThan(10);
    }
  });
});
