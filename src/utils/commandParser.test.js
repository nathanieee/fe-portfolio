import { parseCommand } from './commandParser';

describe('parseCommand', () => {
  it('parses a simple command', () => {
    const result = parseCommand('help');
    expect(result).toEqual({ command: 'help', args: [] });
  });

  it('parses a command with arguments', () => {
    const result = parseCommand('project foo');
    expect(result).toEqual({ command: 'project', args: ['foo'] });
  });

  it('parses a command with multiple arguments', () => {
    const result = parseCommand('theme set hacker');
    expect(result).toEqual({ command: 'theme', args: ['set', 'hacker'] });
  });

  it('resolves aliases', () => {
    expect(parseCommand('ab')).toEqual({ command: 'about', args: [] });
    expect(parseCommand('h')).toEqual({ command: 'help', args: [] });
    expect(parseCommand('sk')).toEqual({ command: 'skills', args: [] });
    expect(parseCommand('cls')).toEqual({ command: 'clear', args: [] });
  });

  it('returns empty for empty input', () => {
    expect(parseCommand('')).toEqual({ command: '', args: [] });
    expect(parseCommand('   ')).toEqual({ command: '', args: [] });
  });

  it('normalizes to lowercase', () => {
    expect(parseCommand('HELP')).toEqual({ command: 'help', args: [] });
    expect(parseCommand('About Me')).toEqual({ command: 'about', args: ['Me'] });
  });

  it('handles extra whitespace', () => {
    expect(parseCommand('  help  ')).toEqual({ command: 'help', args: [] });
    expect(parseCommand('project   foo   bar')).toEqual({ command: 'project', args: ['foo', 'bar'] });
  });

  it('passes through unknown commands', () => {
    expect(parseCommand('foobar')).toEqual({ command: 'foobar', args: [] });
  });
});
