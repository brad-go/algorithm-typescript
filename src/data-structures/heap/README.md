# 힙 (Heap)

힙(heap)은 이진 힙(binary heap)이라고도 하며, 최댓값 및 최솟값을 찾아내는 연산을 빠르게 하기 위해 고안된 완전 이진트리(complete binary tree)를 기본으로 한 자료구조입니다.

![힙 1](https://velog.velcdn.com/images%2Femplam27%2Fpost%2Fd33ee896-7638-4c80-a03d-219b1200534c%2F%ED%9E%99%20-%201.png)

## 힙의 특징

### 1. 완전 이진트리 구조

- 힙은 완전 이진트리의 일종으로 **우선순위 큐**를 위해 만들어진 구조입니다.
- 마지막을 제외한 모든 노드에서 자식들이 꽉 채워진 이진트리를 말합니다.
- 이진 트리와 달리 **중복값을 허용**합니다.

### 2. 부모 노드와 자식 노드간의 대소 관계 성립

- 대소관계는 오로지 부모자식 간에만 성립되며 형제 사이에는 대소관계가 정해져있지 않습니다.
- **최대힙(Max heap)**: 부모 노드의 값이 자식노드들의 값보다 항상 큽니다.
- **최소힙(Min heap)**: 부모 노드의 값이 자식노드들의 값보다 항상 작습니다.
- 이러한 성질 때문에 **느슨한 정렬상태(반정렬 상태)를 유지**합니다.
  - 큰 값이 상위 레벨에 있고 작은 값이 하위 레벨에 있는 상태

## 힙의 종류

![힙 2](https://gmlwjd9405.github.io/images/data-structure-heap/types-of-heap.png)

### 1. 최대 힙 (Max Heap)

- 부모 노드 키 값이 자식 노드의 키 값보다 큰 힙
- 가장 큰 값이 루트 노드에 위치

### 2. 최소 힙 (Min Heap)

- 부모 노드의 키 값이 자식 노드의 키 값보다 작은 힙
- 가장 작은 값이 루트 노드에 위치

## 힙의 구현

힙은 일반적으로 **배열로 구현**됩니다. 완전 이진트리를 기본으로 하기 때문에 비어있는 공간이 없어 배열로 구현하기에 적합하다.

특정 인덱스 i에서 다음과 같은 형태로 배열에 저장되며 찾을 수 있다.

- 부모: heap[Math.floor((i - 1) / 2)]
- 왼쪽 자식: heap[i * 2 + 1]
- 오른쪽 자식: heap[i * 2 + 2]

![힙 구현 - 트리](https://camo.githubusercontent.com/17a30e96c4edcf08f01638861728ff8c6f0391e4eba9a757a8cf310298ac2a05/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f332f33382f4d61782d486561702e737667)
![힙 구현 - 배열](https://camo.githubusercontent.com/17a30e96c4edcf08f01638861728ff8c6f0391e4eba9a757a8cf310298ac2a05/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f332f33382f4d61782d486561702e737667)

## 힙 재구조화 (heapify)

최대 힙의 경우, 최대 힙의 부모 노드는 항상 자식 노드의 값보다 크다는 조건을 가지고 있습니다. 하지만 힙에서 삽입, 삭제가 일어나게 되면 경우에 따라 최대힙의 조건이 깨질 수 있습니다. 이러한 경우에 최대**힙의 조건을 만족할 수 있게 노드들의 위치를 바꿔가며 힙을 재구조화(heapify)** 해주어야 합니다.

힙의 재구조화 방법에는 두 가지가 있습니다. **heapify-down**, **heapify-up**으로 불리고, 위에서 아래로 heapify작업이 일어나 **sink**, 아래에서 위로 올라가 **swim**이라고도 하는 두가지 방식이 있습니다.

### sink

- 상위 요소와 하위 요소의 비교를 통해 힙의 조건에 맞는 하위 요소와 교체 작업을 합니다.
- 최소 힙의 경우 더 작은 요소와 바꾸고, 최대 힙의 경우 더 큰 요소와 바꿉니다.
- 최악의 경우 트리 전체의 높이 만큼 작업을 반복해야 해서 O(log n)의 시간 복잡도를 가집니다.

```ts
sink(startIndex: number): void {
  let currentIndex = startIndex || 0;

  while (this.hasLeftChild(currentIndex)) {
    // 자식들의 인덱스를 가져온다.
    const leftChildIndex = this.getLeftChildIndex(currentIndex);
    const rightChildIndex = this.getRightChildIndex(currentIndex);

    // 자식 인덱스들 비교
    const compareLeftAndRightChild =
      this.hasRightChild(currentIndex) &&
      this.isCorrectOrder(rightChildIndex, leftChildIndex);

    // MinHeap은 더 작은 자식, MaxHeap은 더 큰 자식을 다음 인덱스로 설정
    let nextIndex = compareLeftAndRightChild
      ? rightChildIndex
      : leftChildIndex;

    // 현재 요소가 자식보다 작으면 루프를 중지하고 빠져나온다. - MinHeap
    // 현재 요소가 자식보다 크면 루프를 중지하고 빠져나온다. - MaxHeap
    if (this.isCorrectOrder(currentIndex, nextIndex)) break;

    // 아니라면 바꿔준다.
    this.swap(currentIndex, nextIndex); // O(1);
    currentIndex = nextIndex; // 현재 인덱스를 자식 인덱스로 설정하고 루프를 반복
  }
}
```

최대 힙에서 heapfiy 작업은 다음과 같습니다.

1. 요소 값과 자식 노드의 값을 비교합니다.
2. 자식 노드의 값이 크다면 왼쪽, 오른쪽 자식 중 가장 큰 값으로 교환합니다.
3. 힙 속성이 유지될 때까지 1, 2번 과정을 반복합니다.

![heapify](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FY4nXi%2Fbtq7bht5z6Q%2FmXCNuinbNgPwx9Y399Slo0%2Fimg.png)

삽입과 삭제의 경우 연산 자체는 O(1)로 작동하지만 heapify의 과정을 거치기 때문에 O(log n)의 시간복잡도를 가지게 됩니다.

### swim

- 하위 요소를 상위 요소와 비교해 힙의 조건이 성립되는 올바른 순서가 될때까지 끌어 올리는 것 과정입니다.
- 최악의 경우 트리 전체를 헤엄쳐 올라가기 때문에 O(log n)의 시간 복잡도를 가집니다.

```ts
swim(startIndex?: number): void {
  let childIndex = startIndex || this.heap.length - 1;
  // startIndex가 0이 들어올 경우 마지막 인덱스로 넘어가는 것 방지
  if (startIndex === 0) childIndex = 0;

  // 입력받은 인덱스의 부모가 존재하고, 부모 인덱스보다 작을 때까지 부모 인덱스와 맞바꾸기
  while (
    this.hasParent(childIndex) &&
    this.isCorrectOrder(childIndex, this.getParentIndex(childIndex))
  ) {
    this.swap(childIndex, this.getParentIndex(childIndex));

    childIndex = this.getParentIndex(childIndex);
  }
}
```

## 참고

- [emplam27님 블로그](https://velog.io/@emplam27/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%ED%9E%99Heap)
- [heejeongKwon님 블로그](https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html)
- [yoongrammer님 블로그](https://yoongrammer.tistory.com/80)
