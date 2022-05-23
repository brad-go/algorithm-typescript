import LinkedList from '../linked-list';
import { Entry } from './Entry';

class HashTable<K, V> {
  private readonly DEFAULT_CAPACITY = 11;
  private readonly DEFAULT_LOAD_FACTOR = 0.75;

  private buckets: LinkedList<Entry<K, V>>[];
  private length: number;
  private capacity: number;
  // 최대 적재율 - 자바 Map 기준 0.75% 데이터가 적재되면 효율을 위해 배열 확장
  private maxLoadFactor: number;
  // 최대 적재량 - 해시테이블의 길이가 이것보다 커지면 리사이즈 발생
  private threshold: number;

  constructor(capacity?: number, maxLoadFactor?: number) {
    if (capacity! < 0) throw new Error('Illegal capacity');
    if (maxLoadFactor! <= 0) throw new Error('Illegal maxLoadFactor');

    this.capacity = capacity
      ? Math.max(this.DEFAULT_CAPACITY, capacity)
      : this.DEFAULT_CAPACITY;
    this.maxLoadFactor = maxLoadFactor
      ? maxLoadFactor
      : this.DEFAULT_LOAD_FACTOR;
    this.threshold = Math.trunc(this.capacity * this.maxLoadFactor);
    this.length = 0;

    this.buckets = new Array(this.capacity);
  }

  // 해시 테이블에 저장된 키값 쌍의 수를 반환 - O(1)
  size(): number {
    return this.length;
  }

  // 해시 테이블이 비었다면 true, 아니라면 false 반환 - O(1)
  isEmpty(): boolean {
    return this.size() === 0;
  }

  // 해시 테이블 초기화 - O(1)
  clear(): void {
    this.buckets.length = 0;
    this.length = 0;
  }

  // 해시 테이블이 키를 가지고 있다면 true, 아니면 false 반환
  containsKey(key: K): boolean {
    const bucketIndex = this.hashCode(key);
    return this.bucketSeekEntry(bucketIndex, key) !== null;
  }

  // 해시 테이블이 값을 가지고 있다면 true, 아니면 false 반환
  containsValue(value: V): boolean {
    return this.values().includes(value);
  }

  // 해시 테이블의 키들을 담은 배열 반환 - O(n)
  keys(): Array<K> {
    const keys: Array<K> = [];

    for (const bucket of this.buckets) {
      if (bucket !== undefined)
        for (const entry of bucket) keys.push(entry.getKey());
    }

    return keys;
  }

  // 해시 테이블의 값들을 담은 배열 반환 - O(n)
  values(): Array<V> {
    const values: Array<V> = [];

    for (const bucket of this.buckets) {
      if (bucket !== undefined)
        for (const entry of bucket) values.push(entry.getValue());
    }

    return values;
  }

  // 해시 테이블의 키-값 쌍들을 담은 배열 반환 - O(n)
  entries(): Array<Entry<K, V>> {
    const entries: Array<Entry<K, V>> = [];

    for (const bucket of this.buckets) {
      if (bucket !== undefined) for (const entry of bucket) entries.push(entry);
    }

    return entries;
  }

  // 키에 연결된 value를 반환하고 키가 없다면 null 반환 - O(1) 분할 상환 분석(amortized)
  get(key: K): V | null {
    const bucketIndex = this.hashCode(key);

    const entry = this.bucketSeekEntry(bucketIndex, key);
    if (entry !== null) return entry.getValue();

    return null;
  }

  // 해시 테이블에 키-값쌍을 추가, 혹은 원래 키가 존재하면 값을 업데이트 - O(1) 분할 상환 분석(amortized)
  set(key: K, value: V): V | null {
    const entry = new Entry<K, V>(key, value);
    const bucketIndex = this.hashCode(key);

    return this.bucketInsertEntry(bucketIndex, entry);
  }

  // 입력받은 키를 가진 엔트리를 제거 - O(1) 분할 상환 분석(amortized)
  delete(key: K): V | null {
    const bucketIndex = this.hashCode(key);
    return this.bucketDeleteEntry(bucketIndex, key);
  }

  // 해시 코드를 생성
  hashCode(key: K): number {
    let hash = 17;
    for (let i = 0; i < (key as unknown as string).length; i++) {
      hash = 31 * hash * (key as unknown as string).charCodeAt(i);
    }
    return this.normalizeIndex(hash);
  }

  // 음수 부호를 제거하여 해시를 인덱스로 변환하고 해시를 [0, capacity]의 영역에 매핑
  private normalizeIndex(hash: number): number {
    return (hash & 0x7fffffff) % this.capacity;
  }

  // 해시 테이블의 입력받은 인덱스의 위치에 키-값쌍을 가진 엔트리를 추가
  private bucketInsertEntry(bucketIndex: number, entry: Entry<K, V>): V | null {
    let bucket = this.buckets[bucketIndex];
    if (bucket === undefined) {
      this.buckets[bucketIndex] = new LinkedList<Entry<K, V>>();
      bucket = this.buckets[bucketIndex];
    }

    const entryAlreadyExists = this.bucketSeekEntry(
      bucketIndex,
      entry.getKey(),
    );

    if (!entryAlreadyExists) {
      bucket.add(entry);
      this.length++;

      if (this.length > this.threshold) this.resizeTable();
      return null;
    } else {
      const oldValue = entryAlreadyExists.getValue();
      entryAlreadyExists.setValue(entry.getValue());

      return oldValue;
    }
  }

  // 인덱스와 키를 입력받아 키-값쌍을 가진 엔트리를 반환
  private bucketSeekEntry(bucketIndex: number, key: K): Entry<K, V> | null {
    const bucket = this.buckets[bucketIndex];

    if (bucket === undefined) return null;

    for (const entry of bucket) if (entry.getKey() === key) return entry;

    return null;
  }

  // 인덱스와 키를 입력받아 키-값쌍을 가진 엔트리를 삭제 및 값을 반환
  private bucketDeleteEntry(bucketIndex: number, key: K): V | null {
    const entry = this.bucketSeekEntry(bucketIndex, key);

    if (entry === null) return null;

    const bucket = this.buckets[bucketIndex];
    const entryIndex = bucket.indexOf(entry);
    // if (entryIndex === -1) return null; - bucketSeekEntry에서 이미 검증했기에 필요 없음
    bucket.remove(entryIndex);

    this.length--;

    return entry.getValue();
  }

  // 해시 테이블의 크기를 두배로 늘림
  private resizeTable(): void {
    this.capacity *= 2;
    this.threshold = Math.trunc(this.capacity * this.maxLoadFactor);

    const newBuckets: LinkedList<Entry<K, V>>[] = new Array(this.capacity);

    for (const bucket of this.buckets) {
      if (bucket !== undefined) {
        for (const entry of bucket) {
          const newBucketIndex = this.hashCode(entry.getKey());
          let newBucket = newBuckets[newBucketIndex];

          if (!newBucket) {
            newBuckets[newBucketIndex] = new LinkedList<Entry<K, V>>();
            newBucket = newBuckets[newBucketIndex];
          }

          newBucket.add(entry);
        }
      }
    }

    this.buckets = newBuckets;
  }
}

export default HashTable;
