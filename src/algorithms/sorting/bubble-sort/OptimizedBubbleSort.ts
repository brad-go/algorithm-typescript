import Comparator, { CompareFunction } from '../../../utils';

const bubbleSort = <T>(
  originalArray: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): T[] => {
  // 원본 배열의 수정을 막기 위해 복사
  const array = [...originalArray];
  const comparator = new Comparator<T>(compareFunction);
  // swap이 일어났는지 아닌지를 나타내는 변수
  let swapped = false;

  for (let i = 1; i < array.length; i++) {
    swapped = false;

    for (let j = 0; j < array.length - i; j++) {
      if (comparator.greaterThan(array[j], array[j + 1])) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    // swap이 일어나지 않았다면 배열은 이미 정렬되어 있으므로 더 이상 진행할 필요가 없음
    if (!swapped) return array;
  }

  return array;
};

export default bubbleSort;
