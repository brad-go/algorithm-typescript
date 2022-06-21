# 병합 정렬(Merge Sort)

합병 정렬이라고도 부르며, 분할 정복 방법을 통해 구현한다. 빠른 정렬로 분류되며, 퀵 정렬과 함께 많이 언급되는 정렬 방식이다. 우선 **리스트를 가장 작은 단위(한 개의 요소)로 요소를 쪼갠 후 다시 병합시키면서 정렬해나가는 방식**으로, 쪼개는 방식은 퀵 정렬과 유사하지만 안정 정렬에 속한다.

- **분할 정복이란?**
  : 큰 문제를 작은 문제 단위로 쪼개면서 해결해나가는 방식

![https://gmlwjd9405.github.io/images/algorithm-merge-sort/merge-sort-concepts.png](https://gmlwjd9405.github.io/images/algorithm-merge-sort/merge-sort-concepts.png)

- 각 부분 배열을 정렬할 때도 병합 정렬을 재귀적으로 호출하여 적용한다.
- 병합 정렬에서 실제로 정렬이 이루어지는 시점은 2개의 리스트를 병합(merge)하는 단계이다.
- 어떤 데이터에서도 적용 가능하면서 가장 빠른 편인 알고리즘이다.

## 진행 과정

![https://cdn-images-1.medium.com/max/1600/1*Uvs7CK1oew0pVckcuxr_qA.gif](https://cdn-images-1.medium.com/max/1600/1*Uvs7CK1oew0pVckcuxr_qA.gif)

1. 리스트의 길이가 0 또는 1이면 이미 정렬된 것으로 본다.
2. 1에 해당하지 않는다면, 정렬되지 않은 리스트를 두 개의 리스트가 되도록 **분할**한다. 최종적으로 길이가 1이 될 때까지 분할한다. - `Devide`
3. 분할한 부분 리스트를 **정렬**한다. - `Conquer`
4. 정렬된 부분 리스트들을 하나의 리스트에 **병합(merge)**한다. - `Combine`

## Example Code

```tsx
const mergeSort = (array) => {
  // 배열이 비어 있거나 하나의 요소로 구성된 경우 정렬되었으므로 그대로 반환
  if (array.length <= 1) return array;

  // 배열을 반으로 쪼갠 후 정렬한다.
  const middleIndex = Math.floor(array.length / 2);
  const leftArray = mergeSort(array.slice(0, middleIndex));
  const rightArray = mergeSort(array.slice(middleIndex, array.length));

  // 정렬된 두 배열을 병합한다.
  return merge(leftArray, rightArray);
};

const merge = (leftArray, rightArray) => {
  const sortedArray = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    let minElement = null;

    // left와 right 배열 중에서 가장 작은 요소를 찾는다.
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      minElement = leftArray[leftIndex];
      leftIndex++;
    } else {
      minElement = rightArray[rightIndex];
      rightIndex++;
    }

    // 정렬된 배열에 최소 요소를 추가한다.
    sortedArray.push(minElement);
  }

  // 왼쪽이나 오른쪽에 남아있는 요소가 있을 것이므로 나머지 요소를 정렬된 배열에 연결한다.
  return sortedArray
    .concat(leftArray.slice(leftIndex))
    .concat(rightArray.slice(rightIndex));
};
```

<details><summary><b>for LinkedList</b></summary><div markdown="1">

```tsx
import LinkedList from '../../../data-structures/linked-list';
import LinkedListNode from '../../../data-structures/linked-list/LinkedListNode';

const mergeSort = <T,>(list: LinkedList<T>) => {
  if (list.size() <= 1) return list;

  let mid = list.size() / 2;
  let leftList: LinkedList<T> = new LinkedList<T>();
  let rightList: LinkedList<T> = new LinkedList<T>();

  let index = 1;
  let node: LinkedListNode<T> = list.head!; // list의 head 노드 가져오기

  while (node !== null) {
    if (index <= mid) leftList.add(node.value);
    else rightList.add(node.value);

    index++;
    node = node.next!;
  }

  leftList = mergeSort(leftList);
  rightList = mergeSort(rightList);

  return merge(leftList, rightList);
};

const merge = <T,>(leftList: LinkedList<T>, rightList: LinkedList<T>) => {
  const sortedList = new LinkedList<T>();

  while (leftList.size() > 0 && rightList.size() > 0) {
    if (leftList.head!.value <= rightList.head!.value) {
      sortedList.add(leftList.removeFirst()!);
    } else {
      sortedList.add(rightList.removeFirst()!);
    }
  }

  while (leftList.size() > 0) {
    sortedList.add(leftList.removeFirst()!);
  }
  while (rightList.size() > 0) {
    sortedList.add(rightList.removeFirst()!);
  }

  return sortedList;
};
```

</div></details>

## 복잡도

| 이름           |   최선   |   평균   |   최악   | 메모리 | 안정 여부 |
| -------------- | :------: | :------: | :------: | :----: | :-------: |
| **Merge sort** | O(NlogN) | O(NlogN) | O(NlogN) |  O(N)  |    Yes    |

### 시간 복잡도

- 배열을 log n 번 쪼개어 대소를 비교하기 때문에 `O(nlogn)`의 시간 복잡도를 가진다.
- n개의 요소를 지닌 배열을 1개 이하의 요소만 지닌 배열로 분할 시 `O(logn)`, 병합 시 `O(n)`이므로 전체 병합에 걸리는 총 시간은 `O(nlogn)`이 걸린다.
- 최선, 평균, 최악이 동일하다.

### 공간 복잡도

- 병합 정렬의 공간 복잡도는 `O(n)`인데, 이는 배열이 커질수록 메모리에 저장해야 하는 배열의 개수가 많아짐을 뜻한다.
- 병합 정렬은 버블 정렬, 선택 정렬 등보다 더 많은 공간을 점유한다.

## 장단점

### 장점

- 항상 `O(nlogn)`의 시간이 소요되기 때문에, 데이터 분포에 따른 시간 영향을 덜 받는다.
- 어떤 경우에도 좋은 성능을 보장받을 수 있다.
- **안정 정렬(Stable Sort)** 이다.
- 만약 배열을 연결 리스트(linked list)로 구현하면 인덱스만 변경되므로 데이터의 이동 및 복사가 필요하지 않다.
- 크기가 큰 배열을 정렬할 경우 연결 리스트를 사용한다면, 병합정렬은 어떤 정렬보다도 효율적이다.

### 단점

- 제자리 정렬(in place sort)이 아니기 때문에 별도의 메모리 공간이 필요하다.
- 정렬할 데이터의 양이 많은 경우에는 그만큼 이동 횟수가 많아지므로 시간적인 낭비도 많아지게 된다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
