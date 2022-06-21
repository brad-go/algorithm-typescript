# 힙 정렬(Heap Sort)

**[완전 이진 트리](../../../data-structures/tree/README.md#L64)를 기본으로 하는 힙(Heap) 자료구조를 기반으로 한 정렬 방식**으로 최대 힙 트리(Max Heap Tree)나 최소 힙 트리(Min Heap Tree)를 구성하여 정렬하는 방식이다.

힙 정렬은 향상된 선택 정렬로 생각할 수 있는데, 선택 정렬과 마찬가지로 입력을 정렬된 영역과 정렬되지 않은 영역으로 나누고 가장 큰 요소를 추출하고, 정렬된 영역으로 이동하여 정렬되지 않은 영역을 반복적으로 축소하기 때문이다. 즉, 단순히 매번 쭉 돌면서 알아내느냐 힙을 사용하여 알아내느냐가 유일한 차이점이다.

![https://blog.kakaocdn.net/dn/UbDm4/btq7CPylhvE/g0GcUzLacCAVHsYD0YD3U1/img.png](https://blog.kakaocdn.net/dn/UbDm4/btq7CPylhvE/g0GcUzLacCAVHsYD0YD3U1/img.png)

- 힙 정렬을 통해 **내림차순**으로 정렬하기 위해서는 **최대 힙트리**를 구성하고, **오름차순**으로 구성하기 위해서는 **최소 힙트리**를 구성한다.

## 진행 과정

![https://blog.kakaocdn.net/dn/cg3RAx/btq7Fhtx0B6/vR7HDXUHBHLwqXUxTu9ax0/img.gif](https://blog.kakaocdn.net/dn/cg3RAx/btq7Fhtx0B6/vR7HDXUHBHLwqXUxTu9ax0/img.gif)

1. 입력을 통해 들어온 배열로 힙 트리를 만든다.
2. 힙의 루트에 있는 값은 남은 수들 중 최댓값(혹은 최솟값)을 가지므로 루트를 출력하고 힙에서 제거한다.
3. `heapify` 과정을 통해서 힙의 요소들을 제자리를 찾아가도록 한다.
4. 힙이 빌 때까지 2, 3의 과정을 될때까지 반복한다.

> 즉, 힙 트리로 구한 최댓값 혹은 최솟값에 해당하는 루트 노드를 빼내면서 정렬을 수행한다.

## Example Code

```tsx
const heapSort = (array) => {
  const heapSize = array.length;

  buildMaxHeap(array, heapSize); // heapfiy를 통해 배열을 재정렬해서 max heap을 만들어준다.

  for (let i = heapSize - 1; i > 0; i--) {
    swap(arr, 0, i); // 힙에서 가장 큰 요소를 제거하고, 배열의 맨 뒤에 넣어준다.
    heapify(array, i, 0); // 새로운 힙은 0에서 i - 1에 해당하는 요소들을 포함하고 있다.
  }
};

const buildMaxHeap = (array, heapSize) => {
  const startIndex = Math.floor(array.length / 2);

  for (let i = startIndex; i >= 0; i--) {
    heapify(array, heapSize, i);
  }
};

const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

const heapify = (array, heapSize, rootIndex) => {
  let maxIndex = rootIndex; // rootIdx의 요소가 가장 크다고 가정한다.
  const leftChildIndex = rootIndex * 2 + 1;
  const rightChildIndex = rootIndex * 2 + 2;

  if (leftChildIndex < heapSize && array[maxIndex] < array[leftChildIndex]) {
    maxIndex = leftChildIndex;
  }
  if (rightChildIndex < heapSize && array[maxIndex] < array[rightChildIndex]) {
    maxIndex = rightChildIndex;
  }

  // maxIndex가 변경되었다면
  if (maxIndex !== rootIndex) {
    swap(array, rootIndex, maxIndex);
    heapify(array, heapSize, maxIndex); // 서브 트리들도 heapfiy 해준다.
  }
};
```

## 복잡도

| 이름          |   최선   |   평균   |   최악   | 메모리 | 안정 여부 |
| ------------- | :------: | :------: | :------: | :----: | :-------: |
| **Heap sort** | O(NlogN) | O(NlogN) | O(NlogN) |  O(1)  |    No     |

### 시간 복잡도

- 최선, 평균, 최악 모두 일정한 `O(nlogn)`의 시간 복잡도를 가진다.
- 트리구조를 이용하기 때문에 전체 높이가 `O(log n)`이므로, 하나의 요소를 heap 삽입하거나, 삭제할 대 heap을 재구성하는 시간은 `O(log n)`만큼 소요된다.
- 요소의 개수가 `n`개 이므로 전체적으로 걸리는 시간은 `O(nlogn)`이 된다.

### 공간 복잡도

- 추가적인 메모리 공간을 필요로 하지 않으모로 `O(1)`의 공간 복잡도를 가진다.

## 장단점

### 장점

- 항상 같은 시간 복잡도를 가지기 때문에 성능이 준수하다.
- 추가적인 메모리를 필요로 하지 않으면서 항상 `O(nlogn)`의 시간복잡도를 가지므로, 효율적이다.
- 힙의 특성상 최솟값 혹은 최댓값을 빠르게 찾을 수 있으므로, **가장 크거나 가장 작은 값을 구할 때 유용**하다.
- **최대 k만큼 떨어진 요소들을 정렬할 때**, 삽입정렬보다 더욱 개선된 결과를 얻어낼 수 있다.

### 단점

- 같은 시간 복잡도를 가진 다른 정렬 알고리즘과 비교하면 느린 편이다.
- 힙 정렬은 **불안정 정렬(Unstable Sort)** 에 속한다.

## 참고

- [나무위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Heap%20Sort.html)
- [엄정빈님 블로그](https://jbhs7014.tistory.com/180)
