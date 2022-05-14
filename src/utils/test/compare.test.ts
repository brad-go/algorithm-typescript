import { defaultEquals } from '../compare';

describe('defaultEquals function', () => {
  it('should compare true and false', () => {
    expect(defaultEquals(true, true)).toBe(true);
    expect(defaultEquals(true, false)).toBe(false);
    expect(defaultEquals(false, true)).toBe(false);
  });
  it('should compare numbers', () => {
    expect(defaultEquals(0, 0)).toBe(true);
    expect(defaultEquals(0, 1)).toBe(false);
    expect(defaultEquals(1, 0)).toBe(false);
    expect(defaultEquals(2, 2)).toBe(true);
    expect(defaultEquals(2, 10)).toBe(false);
    expect(defaultEquals(10, 2)).toBe(false);
  });
  it('should compare strings', () => {
    expect(defaultEquals('a', 'a')).toBe(true);
    expect(defaultEquals('a', 'ab')).toBe(false);
    expect(defaultEquals('ab', 'a')).toBe(false);
    expect(defaultEquals('0', '0')).toBe(true);
    expect(defaultEquals('0', '1')).toBe(false);
    expect(defaultEquals('1', '0')).toBe(false);
  });
});
