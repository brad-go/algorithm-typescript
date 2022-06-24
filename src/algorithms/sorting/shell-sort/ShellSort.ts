import Comparator, { CompareFunction } from '../../../utils/Comparator';

const shellSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  const comparator = new Comparator(compareFunction);

  let gap = Math.floor(array.length / 2);

  // gap이 0보다 클 때까지만 요소를 비교하고 스왑한다.
  while (gap > 0) {
    // 각각의 부분 배열에 삽입 정렬 수행
    for (let i = gap; i < array.length; i++) {
      const temp = array[i];

      let currentIndex = i;
      // 현재 인덱스가 gap보다 크고, 현재값이 gap만큼 떨어진 이전 인덱스의 값보다 작다면
      // prettier-ignore
      while (currentIndex >= gap && comparator.lessThan(temp, array[currentIndex - gap])) {
        array[currentIndex] = array[currentIndex - gap];
        currentIndex = currentIndex - gap;
      }

      array[currentIndex] = temp;
    }

    // gap을 반으로 나눌 때 짝수라면 홀수로 만들어준다.
    gap = Math.floor(gap / 2);
    if (gap % 2 === 0 && gap > 0) gap++;
  }

  return array;
};

export default shellSort;
