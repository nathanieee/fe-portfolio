import aboutCommand from './about';

describe('about command', () => {
  it('returns output type', () => {
    const result = aboutCommand([], {});
    expect(result.type).toBe('output');
  });

  it('includes name from config', () => {
    const result = aboutCommand([], {});
    expect(result.content).toContain('Nathaniel');
  });

  it('includes bio lines', () => {
    const result = aboutCommand([], {});
    expect(result.content).toContain('Full-stack developer');
  });
});
