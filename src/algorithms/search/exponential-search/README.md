# 지수 탐색(Exponential Search)

이중 검색 또는 질주 검색이라고도 하는 지수 검색은 거대한 크기의 배열에서 요소를 검색하기 위해 만들어진 알고리즘입니다. **인덱스 값을 지수 형태로 높여가며 구간을 탐색하는 방식**이고, 해당되는 범위를 찾아면 그 안에서 다시 이진 탐색을 통해 값을 찾아냅니다.

## 진행 과정

1. 첫번째 요소 자체가 대상 요소인지 확인합니다.
2. 배열의 탐색 인덱스를 1부터 시작해서 찾고자 하는 값보다 작을 때까지 두배씩 키워가며 구간을 찾습니다.
3. 인덱스가 두배가 되어있을 테니 반으로 줄인 위치부터, 인덱스값까지 이진 탐색을 통해 값을 찾습니다.

## Example Code

```tsx
const exponentialSearch = (array, target) => {
  // 가장 앞에 위치해있다면 바로 반환해준다.
  if (array[0] === target) return 0;

  let index = 1;
  // index값이 배열 크기보다 작고, 배열의 값이 찾고자 하는 값보다 작을 때까지 구간을 찾는다.
  while (index < array.length && array[index] <= target) index *= 2;

  // 찾아낸 구간에서 이진 탐색을 통해 값을 찾는다.
  // index가 배열의 범위를 넘어갈 수 있으니 배열의 길이와 비교해 더 작은 값을 마지막 탐색 범위로 지정
  return binarySearch(array, target,index / 2,Math.min(index, array.length - 1)); // prettier-ignore
};

const binarySearch = (
  array,
  target,
  startIndex = 0,
  endIndex = array.length - 1,
) => {
  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (array[middleIndex] < target) startIndex = middleIndex + 1;
    else if (array[middleIndex] > target) endIndex = middleIndex - 1;
    else return middleIndex;
  }

  return -1;
};
```

## 시간 복잡도

- `O(log i)` - i는 배열에서 찾아낸 요소의 인덱스를 뜻합니다.

## 장점

- 정렬된 무한한 크기의 배열을 탐색하기에 유용합니다.
- 검색되는 요소가 배열의 시작 부분에 가까울 때, 이진 탐색보다 성능이 뛰어납니다.

## 단점

- 정렬된 목록이어야 합니다.

## 참고

- [위키피디아](https://en.wikipedia.org/wiki/Exponential_search)
- [겐지충 프로그래머님 블로그](https://hongjw1938.tistory.com/40?category=909529)
