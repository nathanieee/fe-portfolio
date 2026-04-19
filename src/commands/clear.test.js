import clearCommand from './clear';

describe('clear command', () => {
  it('returns clear action', () => {
    const result = clearCommand([], {});
    expect(result.action).toBe('CLEAR');
  });
});
