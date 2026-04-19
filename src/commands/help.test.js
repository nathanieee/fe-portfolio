import helpCommand from './help';

describe('help command', () => {
  it('returns output type', () => {
    const result = helpCommand([], {});
    expect(result.type).toBe('output');
  });

  it('includes all command names', () => {
    const result = helpCommand([], {});
    expect(result.content).toContain('about');
    expect(result.content).toContain('skills');
    expect(result.content).toContain('projects');
    expect(result.content).toContain('help');
    expect(result.content).toContain('clear');
    expect(result.content).toContain('matrix');
    expect(result.content).toContain('sudo');
  });

  it('includes aliases', () => {
    const result = helpCommand([], {});
    expect(result.content).toContain('(ab)');
    expect(result.content).toContain('(h)');
  });

  it('includes usage hint', () => {
    const result = helpCommand([], {});
    expect(result.content).toContain('Tab for autocomplete');
  });
});
