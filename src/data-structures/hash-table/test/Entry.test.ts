import { Entry } from '../Entry';

describe('Entry', () => {
  it('should create entry with number', () => {
    const entry = new Entry(1, 2);

    expect(entry.getKey()).toBe(1);
    expect(entry.getValue()).toBe(2);
  });

  it('should create entry with string', () => {
    const entry = new Entry('test', 1);

    expect(entry.getKey()).toBe('test');
    expect(entry.getValue()).toBe(1);
  });

  it('should create entry with object', () => {
    const testObj = { value: 1, key: 'test' };
    const entry = new Entry(testObj, [1, 'test']);

    expect(entry.getKey().key).toBe('test');
    expect(entry.getKey().value).toBe(1);
    expect(entry.getValue()[0]).toBe(1);
    expect(entry.getValue()[1]).toBe('test');
  });

  it('should update value', () => {
    const entry = new Entry('test', 1);

    expect(entry.setValue(2)).toBe(2);
    expect(entry.getValue()).toBe(2);
  });
});
