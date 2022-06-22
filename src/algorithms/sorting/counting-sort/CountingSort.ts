import { findMaxValue, findMinValue } from '../../../utils';

const countingSort = (array: number[]) => {
  if (array.length < 2) return array;

  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);

  // 음수로 인덱스를 표현하기 위해 음수 값을 더한 만큼의 공간이 필요
  // 음수인 경우 뺄셈이 더하기가 되므로 빼준다.
  // 음수가 아닐 경우도 해당 크기의 리스트로 표현이 가능하다.
  const counts = new Array(maxValue - minValue + 1).fill(0);

  // 요소를 확인하고 개수를 세어준다.
  // 음수 포함일 경우 최솟값을 빼서 인덱스를 구한다. (음수인 경우 더하는 것)
  array.forEach((element) => counts[element - minValue]++);

  let sortedIndex = 0;

  counts.forEach((element, idx) => {
    while (element > 0) {
      array[sortedIndex++] = idx + minValue; // 음수인 경우를 위해 최솟값을 더해준다.
      element--;
    }
  });

  return array;
};

export default countingSort;
