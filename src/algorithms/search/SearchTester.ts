import { CompareFunction } from '../../utils';

export interface SearchFunction<T> {
  (array: T[], value: T, compareFunction?: CompareFunction<T>): number;
}
interface CustomObject {
  key: number;
}

export const numberArray = [1, 5, 10, 12, 14, 17, 22, 100];
export const floatArray = [2.7, 5, 8.1, 9, 30.234, 42, 121.94];
export const charArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
export const stringArray = ['computer', 'eat', 'hello', 'nice', 'pizza'];

class SearchTester {
  static testSearchNumber(searchFunction: SearchFunction<number>) {
    const search: SearchFunction<number> = searchFunction;

    expect(search(numberArray, 1000)).toBe(-1);
    expect(search(numberArray, 1)).toBe(0);
    expect(search(numberArray, 14)).toBe(4);
    expect(search(numberArray, 100)).toBe(7);
  }

  static testSearchFloatNumber(searchFunction: SearchFunction<number>) {
    const search: SearchFunction<number> = searchFunction;

    expect(search(floatArray, 8.2)).toBe(-1);
    expect(search(floatArray, 2.7)).toBe(0);
    expect(search(floatArray, 30.234)).toBe(4);
    expect(search(floatArray, 121.94)).toBe(6);
  }

  static testSearchChar(searchFunction: SearchFunction<string>) {
    const search: SearchFunction<string> = searchFunction;

    expect(search(charArray, 'z')).toBe(-1);
    expect(search(charArray, 'a')).toBe(0);
    expect(search(charArray, 'f')).toBe(5);
    expect(search(charArray, 'j')).toBe(9);
  }

  static testSearchString(searchFunction: SearchFunction<string>) {
    const search: SearchFunction<string> = searchFunction;

    expect(search(stringArray, '')).toBe(-1);
    expect(search(stringArray, 'computer')).toBe(0);
    expect(search(stringArray, 'hello')).toBe(2);
    expect(search(stringArray, 'pizza')).toBe(4);
  }

  // prettier-ignore
  static testSearchWithCustomComparator(searchFunction: SearchFunction<CustomObject>) {
    const customCompareFunction = (a: CustomObject, b:CustomObject): number => {
      if (a.key === b.key) return 0;

      return a.key < b.key ? -1: 1;
    }

    const array = [{ key: 1}, {key: 2}, {key: 3}];

    expect(searchFunction(array, { key: 10 }, customCompareFunction)).toBe(-1);
    expect(searchFunction(array, { key: 1 }, customCompareFunction)).toBe(0);
    expect(searchFunction(array, { key: 3 }, customCompareFunction)).toBe(2);
  }
}

export default SearchTester;
