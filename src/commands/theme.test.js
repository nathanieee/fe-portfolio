import themeCommand from './theme';

describe('theme command', () => {
  describe('list themes', () => {
    it('lists all available themes', () => {
      const result = themeCommand([], {});
      expect(result.type).toBe('output');
      expect(result.content).toContain('classic');
      expect(result.content).toContain('retro');
      expect(result.content).toContain('hacker');
      expect(result.content).toContain('amber');
    });

    it('lists themes with "list" arg', () => {
      const result = themeCommand(['list'], {});
      expect(result.type).toBe('output');
      expect(result.content).toContain('classic');
    });
  });

  describe('set theme', () => {
    it('sets a valid theme', () => {
      const result = themeCommand(['hacker'], {});
      expect(result.type).toBe('success');
      expect(result.action).toBe('SET_THEME');
      expect(result.theme).toBe('hacker');
    });

    it('returns error for unknown theme', () => {
      const result = themeCommand(['neon'], {});
      expect(result.type).toBe('error');
      expect(result.content).toContain('Unknown theme');
    });

    it('is case insensitive', () => {
      const result = themeCommand(['HACKER'], {});
      expect(result.type).toBe('success');
      expect(result.theme).toBe('hacker');
    });
  });
});
