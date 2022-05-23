import HashTable from '../HashTable';
import { Entry } from '../Entry';

describe('HashTable', () => {
  it('should create empty hash table', () => {
    const hashTable = new HashTable();

    expect(hashTable.size()).toBe(0);
    expect(hashTable.isEmpty()).toBeTruthy();
  });

  it('should generate proper hash for specifed keys', () => {
    const hashTable = new HashTable();

    expect(hashTable.hashCode('a')).toBe(2);
    expect(hashTable.hashCode('b')).toBe(1);
    expect(hashTable.hashCode('abc')).toBe(9);
  });

  it('should set data to hash table', () => {
    const hashTable = new HashTable();

    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');

    expect(hashTable.containsKey('x')).toBeFalsy();
    expect(hashTable.containsKey('b')).toBeTruthy();
    expect(hashTable.containsKey('c')).toBeTruthy();
  });

  it('should read value of data from hash table', () => {
    const hashTable = new HashTable();

    expect(hashTable.get('a')).toBeNull();

    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');
    hashTable.set('d', 'ocean');

    expect(hashTable.containsKey('a')).toBeTruthy();

    expect(hashTable.containsValue('sky')).toBeTruthy();
    expect(hashTable.containsValue('sea')).toBeTruthy();
    expect(hashTable.containsValue('tree')).toBeFalsy();
  });

  it('should delete data from hash table', () => {
    const hashTable = new HashTable();

    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');

    expect(hashTable.get('a')).toBe('sky');
    expect(hashTable.get('b')).toBe('sea');
    expect(hashTable.get('c')).toBe('earth');
    expect(hashTable.size()).toBe(3);

    hashTable.delete('a');

    expect(hashTable.get('a')).toBeNull();
    expect(hashTable.size()).toBe(2);

    hashTable.delete('b');

    expect(hashTable.get('b')).toBeNull();
    expect(hashTable.size()).toBe(1);

    hashTable.delete('c');

    expect(hashTable.get('c')).toBeNull();
    expect(hashTable.size()).toBe(0);
    expect(hashTable.delete('c')).toBeNull();
  });

  it('should update value of data with collision', () => {
    const hashTable = new HashTable();

    hashTable.set('a', 'old-sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');

    expect(hashTable.get('a')).toBe('old-sky');

    hashTable.set('a', 'sky');

    expect(hashTable.get('a')).toBe('sky');
  });

  it('should be possible to add objects to hash table', () => {
    interface TestObj {
      [key: string]: string;
    }

    const hashTable = new HashTable<String, TestObj>();

    hashTable.set('objectKey', { prop1: 'a', prop2: 'b' });

    const object: TestObj = hashTable.get('objectKey')!;
    expect(object).toBeDefined();
    expect(object.prop1).toBe('a');
    expect(object.prop2).toBe('b');
  });

  it('should track acutal keys', () => {
    const hashTable = new HashTable(3);

    hashTable.set('a', 'sky-old');
    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');
    hashTable.set('d', 'ocean');

    expect(hashTable.keys()).toEqual(['c', 'b', 'a', 'd']);
    expect(hashTable.containsKey('a')).toBeTruthy();
    expect(hashTable.containsKey('x')).toBeFalsy();

    hashTable.delete('a');

    expect(hashTable.containsKey('a')).toBeFalsy();
    expect(hashTable.containsKey('b')).toBeTruthy();
    expect(hashTable.containsKey('x')).toBeFalsy();
  });

  it('should get all the values', () => {
    const hashTable = new HashTable();

    hashTable.set('a', 'alpha');
    hashTable.set('b', 'beta');
    hashTable.set('c', 'gamma');

    expect(hashTable.values()).toEqual(['gamma', 'beta', 'alpha']);
  });

  it('should get all the entries', () => {
    const hashTable = new HashTable<string, string>();

    hashTable.set('a', 'alpha');
    hashTable.set('b', 'beta');
    hashTable.set('c', 'gamma');

    const stringifier = (value: Entry<string, string>) =>
      `${value.getKey()}:${value.getValue()}`;

    const entries = hashTable.entries();
    expect(stringifier(entries[0])).toEqual('c:gamma');
    expect(stringifier(entries[1])).toEqual('b:beta');
    expect(stringifier(entries[2])).toEqual('a:alpha');
  });

  it('should be resizable when the capacity is full', () => {
    const hashTable = new HashTable<string, string>(11, 0.8);

    hashTable.set('a', 'alpha');
    hashTable.set('b', 'beta');
    hashTable.set('c', 'gamma');
    hashTable.set('d', 'delta');
    hashTable.set('e', 'epsilon');
    hashTable.set('f', 'zeta');
    hashTable.set('g', 'eta');
    hashTable.set('h', 'theta');
    hashTable.set('i', 'lota');
    hashTable.set('j', 'kappa');

    expect(hashTable.size()).toBe(10);
  });

  it('should clear all entries', () => {
    const hashTable = new HashTable();

    hashTable.set('a', 'alpha');
    hashTable.set('b', 'beta');
    hashTable.set('c', 'gamma');

    expect(hashTable.size()).toBe(3);
    expect(hashTable.isEmpty()).toBeFalsy();

    hashTable.clear();

    expect(hashTable.size()).toBe(0);
    expect(hashTable.isEmpty()).toBeTruthy();
  });

  it('sholud throw erorr when params are illegal', () => {
    try {
      const hashTable = new HashTable(-1);
    } catch (err) {
      expect(err).toEqual(new Error('Illegal capacity'));
    }

    try {
      const hashTable = new HashTable(12, 0);
    } catch (err) {
      expect(err).toEqual(new Error('Illegal maxLoadFactor'));
    }
  });
});
