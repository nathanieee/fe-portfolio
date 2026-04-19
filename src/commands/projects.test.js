import projectsCommand from './projects';

describe('projects command', () => {
  describe('list all projects', () => {
    it('returns output type', () => {
      const result = projectsCommand([], {});
      expect(result.type).toBe('output');
    });

    it('lists all project names', () => {
      const result = projectsCommand([], {});
      expect(result.content).toContain('Terminal Portfolio');
      expect(result.content).toContain('Project Alpha');
    });

    it('shows usage hint for detail view', () => {
      const result = projectsCommand([], {});
      expect(result.content).toContain('projects <id>');
    });
  });

  describe('project detail', () => {
    it('shows details for valid project id', () => {
      const result = projectsCommand(['terminal-portfolio'], {});
      expect(result.type).toBe('output');
      expect(result.content).toContain('Terminal Portfolio');
      expect(result.content).toContain('React');
      expect(result.content).toContain('Zero Dependencies');
    });

    it('returns error for unknown project', () => {
      const result = projectsCommand(['nonexistent'], {});
      expect(result.type).toBe('error');
      expect(result.content).toContain('not found');
    });
  });
});
