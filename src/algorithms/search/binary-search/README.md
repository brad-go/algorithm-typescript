# 이진 탐색(Binary Search)

이진 탐색은 컴퓨터 과학, 수학 등에서 **정렬된 정수의 리스트를 같은 크기의 두 부분 리스트로 나누고, 필요한 부분에서만 탐색하도록 제한하여 원하는 원소를 찾는 알고리즘**입니다. 리스트의 중간 부분에 찾는 원소가 있는지 확인하고, 없으면 앞쪽에 있는지 뒤쪽에 있는지 판단하여 맨 앞부터 검색하거나 중간부터 검색합니다.

예를 들어 사전을 찾을 때, 사전을 펴서 찾는 단어가 없으면 위치에 따라 앞쪽을 찾거나 뒤쪽을 찾고, 찾을 때까지 그걸 반복하는 걸 생각하면 됩니다.

- 탐색 범위를 두 부분으로 분할하면서 찾는 방식
- 단, **이진 탐색을 위해서는 자료가 순서에 따라 정렬되어 있어야 합니다.**

## 진행 순서

![https://d18l82el6cdm1i.cloudfront.net/uploads/bePceUMnSG-binary_search_gif.gif](https://d18l82el6cdm1i.cloudfront.net/uploads/bePceUMnSG-binary_search_gif.gif)

1. 정렬된 배열을 입력받는다. (혹은 내부에서 정렬한다.)
2. 시작인덱스와 마지막 인덱스를 통해 중간 인덱스를 구한다.
3. 찾아낸 중간값과 찾고자 하는 값을 비교한다.
4. 찾으려는 값이 중간값보다 크다면 중간 인덱스 + 1부터 탐색하고, 작다면 중간 인덱스 -1까지 다시 탐색한다.
5. 값을 찾거나 시작 인덱스가 마지막 인덱스보다 커질 때까지 반복한다.

## Example Code

```tsx
const binarySearch = (sortedArray, target) => {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    // 중간값과 찾으려는 값 비교
    if (sortedArray[middleIndex] === target) return middleIndex;

    // 찾으려는 값이 중간값보다 크다면
    if (sortedArray[middleIndex] < target) startIndex = middleIndex + 1;
    // 찾으려는 값이 중값보다 작다면
    else endIndex = middleIndex - 1;
  }

  return -1;
};
```

## 시간 복잡도

- `O(logN)` - 다음 반복 시마다 검색 영역을 반으로 줄이기 때문에

## 장점

- 처음부터 끝까지 순서대로 찾는 순차 탐색에 비해 훨씬 빠르다.

## 단점

- 리스트가 미리 정렬되어 있어야 한다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Binary%20Search.html)
- [Brilliant](https://brilliant.org/wiki/binary-search/)
