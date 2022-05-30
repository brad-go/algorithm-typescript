export interface CompareFunction<T> {
  (a: T, b: T): number | boolean;
}

class Comparator<T> {
  private compare: CompareFunction<T>;

  constructor(compareFunction?: CompareFunction<T>) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  // 기본 비교 함수. a나 b는 문자열이나 숫자임을 가정한다.
  static defaultCompareFunction<T>(a: T, b: T): number {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  // 두 변수가 같은 지 확인한다.
  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  // a가 b보다 작은지 확인한다.
  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  // a가 b보다 큰지 확인한다.
  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  // a가 b보다 작거나 같은지 확인한다.
  lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  // a가 b보다 크거나 같은지 확인한다.
  greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  // 비교 순서를 뒤집는다.
  reverse() {
    const originCompare = this.compare;
    this.compare = (a: T, b: T) => originCompare(b, a);
  }
}

export default Comparator;
