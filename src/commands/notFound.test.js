import notFoundCommand from './notFound';

describe('notFound command', () => {
  it('returns error type', () => {
    const result = notFoundCommand(['foobar'], {});
    expect(result.type).toBe('error');
  });

  it('includes the unknown command name', () => {
    const result = notFoundCommand(['foobar'], {});
    expect(result.content).toContain('foobar');
  });

  it('suggests help', () => {
    const result = notFoundCommand(['xyz'], {});
    expect(result.content).toContain('help');
  });
});
