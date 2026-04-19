import contactCommand from './contact';

describe('contact command', () => {
  it('returns output type', () => {
    const result = contactCommand([], {});
    expect(result.type).toBe('output');
  });

  it('includes contact info', () => {
    const result = contactCommand([], {});
    expect(result.content).toContain('Email');
    expect(result.content).toContain('GitHub');
    expect(result.content).toContain('LinkedIn');
  });

  it('includes actual values from config', () => {
    const result = contactCommand([], {});
    expect(result.content).toContain('hello@example.com');
    expect(result.content).toContain('github.com/nathanieee');
  });
});
