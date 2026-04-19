import skillsCommand from './skills';

describe('skills command', () => {
  it('returns output type', () => {
    const result = skillsCommand([], {});
    expect(result.type).toBe('output');
  });

  it('includes skill categories', () => {
    const result = skillsCommand([], {});
    expect(result.content).toContain('Frontend');
    expect(result.content).toContain('Backend');
    expect(result.content).toContain('Tools');
  });

  it('includes individual skills', () => {
    const result = skillsCommand([], {});
    expect(result.content).toContain('React');
    expect(result.content).toContain('Node.js');
    expect(result.content).toContain('Git');
  });

  it('uses bullet formatting', () => {
    const result = skillsCommand([], {});
    expect(result.content).toContain('•');
  });
});
