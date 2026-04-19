import experienceCommand from './experience';

describe('experience command', () => {
  it('returns output type', () => {
    const result = experienceCommand([], {});
    expect(result.type).toBe('output');
  });

  it('includes all positions', () => {
    const result = experienceCommand([], {});
    expect(result.content).toContain('Senior Developer');
    expect(result.content).toContain('Tech Corp');
  });

  it('includes time periods', () => {
    const result = experienceCommand([], {});
    expect(result.content).toContain('2024 - Present');
  });
});
