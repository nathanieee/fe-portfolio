import { bulletList, table, colorSpan, bold, sectionHeader } from './formatters';

describe('formatters', () => {
  describe('bulletList', () => {
    it('formats items as bullets', () => {
      const result = bulletList(['React', 'Node.js']);
      expect(result).toBe('  • React\n  • Node.js');
    });

    it('handles empty array', () => {
      expect(bulletList([])).toBe('');
    });
  });

  describe('table', () => {
    it('formats headers and rows', () => {
      const result = table(['Name', 'Type'], [['React', 'Library'], ['Node', 'Runtime']]);
      const lines = result.split('\n');
      expect(lines).toHaveLength(4);
      expect(lines[0]).toContain('Name');
      expect(lines[1]).toContain('─');
    });

    it('handles empty rows', () => {
      const result = table(['A', 'B'], []);
      const lines = result.split('\n');
      expect(lines).toHaveLength(2); // header + separator only
    });
  });

  describe('colorSpan', () => {
    it('wraps text in colored span', () => {
      expect(colorSpan('hello', '#ff0000')).toBe(
        '<span style="color:#ff0000">hello</span>'
      );
    });
  });

  describe('bold', () => {
    it('wraps text in strong tags', () => {
      expect(bold('title')).toBe('<strong>title</strong>');
    });
  });

  describe('sectionHeader', () => {
    it('creates bordered header', () => {
      const result = sectionHeader('Skills');
      expect(result).toContain('Skills');
      expect(result).toContain('═');
    });
  });
});
