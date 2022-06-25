# 점프 탐색(Jump Search)

이진 탐색과 마찬가지로 점프 탐색(또는 블록 탐색)은 정렬된 배열에 대한 검색 알고리즘입니다. **점프 탐색은 선형 탐색과 달리 블록 단위로 이동(점프)하면서 탐색하는 알고리즘**입니다. 한 칸씩 이동하는 것이 아니기 때문에 선형 탐색보다 적은 요소를 탐색하게 됩니다.

점프 탐색은 점프를 수행할 사이즈를 지정해서 진행합니다. 사이즈를 m이라고 지정했을 때, arr[m], arr[2m], …, arr[nm]과 같이 진행하는데, 그 과정에서 현재 데이터와 찾고자 하는 데이터의 크기를 비교하여 점프 구간 사이의 데이터가 찾고자 하는 데이터 범위로 지정되도록 수행합니다. 이렇게 해당 범위로 지정된 구간을 다시 점프값을 재 지정하여 탐색하거나 선형 탐색을 진행하여 데이터를 찾습니다.

**건너뛸 최적의 블록 크기는 얼마일까요?** 최악의 경우 우리는 `n/m`번 점프를 해야하고, 점프를 통해 마지막까지 도달했는데, 그것보다 1개 이전의 데이터가 찾는 데이터라면 점프 탐색 후 구간 내 선형 탐색을 진행한다는 가정 시에 탐색 횟수는 `n/m + (m-1)`이 됩니다. 함수값 `n/m + (m-1)`은 `m = √n`일 때 최솟값이 되고, 최적의 블록 크기는 `m = √n`입니다.

- 선형 탐색보다 빠르지만 이진 탐색보다는 느립니다.

## 진행 순서

![https://stackabuse.s3.amazonaws.com/media/jump-search-in-java-1.gif](https://stackabuse.s3.amazonaws.com/media/jump-search-in-java-1.gif)

1. 배열을 블록 단위로 나누기 위해 블록 사이즈 m을 구합니다. (m의 최적값은 `m = √n`)
2. 한 블록에서 값을 탐색하고 없으면 다음 블록으로 이동합니다. 이 때, 블록의 최댓값이 찾고자 하는 값보다 작다면 다음 블록으로 넘어갑니다.
3. 값을 가진 블록을 찾으면 선형 탐색을 사용하여 정확한 인덱스를 찾습니다.

## Example Code

```tsx
const jumpSearch = (sortedArray, target) => {
  const arraySize = sortedArray.length;

  if (!arraySize) return -1; // 빈 배열에서는 값을 찾을 수 없다.

  const jumpSize = Math.floor(Math.sqrt(arraySize)); // 최적값 √m을 구한다.

  // 찾고자하는 요소가 포함된 블록을 찾는다.
  let blockStart = 0;
  let blockEnd = jumpSize;

  while (target > sortedArray[Math.min(blockEnd, arraySize) - 1]) {
    blockStart = blockEnd;
    blockEnd += jumpSize;

    // 마지막 블록까지 탐색했는데도 찾지 못했다면 요소를 찾을 수 없다.
    if (blockStart > arraySize) return -1;
  }

  // 찾아낸 블록에서 선형 검색을 통해 값을 찾는다.
  let currentIndex = blockStart;
  while (currentIndex < Math.min(blockEnd, arraySize)) {
    if (sortedArray[currentIndex] === target) return currentIndex;

    currentIndex++;
  }

  return -1;
};
```

## 시간 복잡도

- `O(√n)` - `√n` 크기의 블록으로 검색을 하기 때문에

## 장점

- 선형 탐색보다 적은 비교를 통해 값을 찾을 수 있다.
- 이진 탐색에 비용이 많이 드는 시스템의 경우 점프 탐색을 사용할 수 있다.

## 단점

- 정렬된 배열에서만 동작한다.
- 이진 탐색보다 효율이 떨어진다.

## 참고

- [겐지충 프로그래머님 블로그](https://hongjw1938.tistory.com/40)
- [StackAbuse](https://stackabuse.com/jump-search-in-java/)
