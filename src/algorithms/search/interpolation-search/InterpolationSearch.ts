import Comparator, { CompareFunction } from '../../../utils/Comparator';

const interpolationSearch = (
  sortedArray: number[],
  target: number,
  compareFunction: CompareFunction<number> = Comparator.defaultCompareFunction,
): number => {
  const comparator = new Comparator(compareFunction);

  let leftIndex = 0;
  let rightIndex = sortedArray.length - 1;

  while (leftIndex <= rightIndex) {
    const valueDelta = target - sortedArray[leftIndex];
    const indexDelta = rightIndex - leftIndex;
    const rangeDelta = sortedArray[rightIndex] - sortedArray[leftIndex];

    // 값 델타가 0보다 작다는 것은 찾고자 하는 값보다 이미 더 높은 값의 구간을 찾고 있다는 뜻
    if (valueDelta < 0) return -1;
    // 범위 델타가 0이라는 것은 해당 구간이 모두 찾고자 하는 값으로 이루어지지 않은 이상 값을 찾을 수 없음
    if (!rangeDelta) return sortedArray[leftIndex] === target ? leftIndex : -1;

    // 탐색 위치 구하기 - 주변 데이터들을 통해 보간(추측)한다.
    const middleIndex =
      leftIndex + Math.floor((valueDelta * indexDelta) / rangeDelta);

    // 값을 찾았다면 반환
    if (comparator.equal(sortedArray[middleIndex], target)) return middleIndex;

    // 다음 탐색할 구간을 정한다.
    if (comparator.lessThan(sortedArray[middleIndex], target)) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }

  return -1;
};

export default interpolationSearch;
