# 퀵 정렬(Quick Sort)

퀵 정렬은 **분할 정복(Devide and Conquer)** 방법을 통해 주어진 배열을 정렬하는 정렬 방법이다. 퀵이라는 이름에서 알 수 있듯이 평균적인 상황에서 최고의 성능을 나타낸다. 불안정 정렬에 속하며, 다른 원소의 비교만으로 정렬을 수행하는 비교 정렬에 속한다.

**원소 하나를 기준(pivot)으로 삼아 그보다 작은 것을 왼쪽에 위치시키고, 그 뒤에 피벗을 옮겨서 작은 것, 큰 것으로 나눈 뒤, 나누어진 각각의 하위 배열에서 다시 피벗을 잡고 정렬해서 각각의 크기가 0이나 1일 될 때까지 정렬하는 방식**이다. 이러한 작업 과정을 `partition step`이라고 하는데, 퀵 정렬에도 이 `partiton step`을 어떻게 하느냐에 따라 매우 다양한 방법을 가지고 있고, 성능 차이도 날 수있다.

- 컴퓨터로 가장 많이 구현된 정렬 알고리즘 중 하나이며, 현존하는 비교 연산자를 이용하여 구현된 정렬 알고리즘 중 가장 고성능인 알고리즘이다.
- 병합 정렬과 달리 퀵 정렬은 **배열을 비균등하게 분할**한다.
- 피벗을 최솟값이나 최댓값으로 계속해서 잡게 되는 경우 시간 복잡도가 `O(n^2)`이 된다. 즉, 정렬하고자 하는 배열이 오름차순이나 내림차순으로 정렬되어 있는 경우다.
- 데이터가 극단적인 경우 대충 구현된 퀵정렬은 안쓰느니만 못한 최악의 결과를 초래한다.

## 진행 과정

![https://blog.kakaocdn.net/dn/tBBW4/btq7EzBbhg8/kSIpggnLpcinwhgjL1FMR1/img.gif](https://blog.kakaocdn.net/dn/tBBW4/btq7EzBbhg8/kSIpggnLpcinwhgjL1FMR1/img.gif)

1. 배열 가운데서 하나의 원소를 고른다. 이렇게 고른 원소를 **피벗(pivot)** 이라고 한다.
2. 피벗 앞에는 피벗보다 작은 모든 원소들이 오고, 피벗 뒤에는 피벗보다 값이 큰 모든 원소들이 오도록 피벗을 기준으로 배열을 둘로 나눈다. 이러한 과정을 **파티션 작업(partition step)** 이라고 하며 **파티셔닝**을 마친 후에 피벗은 더 이상 움직이지 않는다.
3. 분할된 두 개의 작은 배열에 대해 재귀적으로 이 과정을 반복한다.

- 재귀 호출이 한 번 진행될 때마다 최소한 하나의 원소는 최종적으로 위치가 정해지므로, 이 알고리즘은 반드시 끝난다는 것을 보장할 수 있다.

## Example Code

일반적으로 메모리가 낭비를 막기 위해 아래와 같은 제자리 정렬(in place) 방식이 많이 사용된다.

```tsx
// 추가적인 공간을 필요로 하지 않는 제자리 정렬 방식이지만
// 왼쪽과 오른쪽 값을 교환하는 과정에서 중복값의 위치가 바뀔 수 있으므로 unstable한 방법이다.
const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left >= right) return;

  const pivot = partition(array, left, right);

  // 오른쪽 파티션이 시작점 바로 다음에서 시작한다면, 왼쪽 파티션에 데이터는 하나뿐이니까 정렬할 필요가 없으므로,
  // 오른쪽 파티션이 시작점에서 한 개 이상 차이날 때만 호출
  if (left < pivot - 1) quickSort(array, left, pivot - 1);
  // 오른쪽 파티션이 1개 이상일 때만 호출해야 하므로, 오른쪽 파티션의 시작점이 마지막 배열방보다 작은 경우만 호출
  if (pivot < right) quickSort(array, pivot, right);

  return array;
};

const partition = (array, left, right) => {
  // 최악의 경우를 피하기 위해 중간에서 피벗을 설정한다.
  const pivot = array[Math.floor((left + right) / 2)];

  // 시작점이 끝지점보다 작거나 같은 동안만 양쪽의 포인터(left, right)를 옮긴다.
  while (left <= right) {
    // 배열의 값이 pivot보다 작다면 넘어가고, 크거나 같다면 그 자리에서 멈춘다.
    while (array[left] < pivot) left++;
    // 배열의 값이 pivot보다 크면 넘어가고, 작거나 같다면 멈춘다.
    while (array[right] > pivot) right--;

    // 아직 두개의 포인터가 서로 지나치지 않았다면, 두개의 값의 위치를 변경하고 포인터를 한칸씩 옮긴다.
    if (left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }

  return left;
};

const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};
```

## 복잡도

### 시간 복잡도

- 파티션의 데이터가 낱개가 될 때까지 나눔으로 n번을 나눈다. 그런데 한 번 나눌 때마다 검색해야 할 데이터가 반으로 나뉜다. 즉, n만큼 파티션을 나누는데, 파티션을 나눌 때마다 데이터가 절반으로 줄어드므로 평규적으로 시간 복잡도가 `O(nlogn)`이 된다.
- 선택한 기준값(`pivot`)이 최솟값 혹은 최댓값일 경우 배열이 최악의 경우 `O(n^2)`의 시간 복잡도를 가진다.

### 공간 복잡도

- 제자리 정렬(in place) 방식의 경우 일반적으로 `O(logN)`의 스택 공간을 사용하여 수행된다.

## 장단점

### 장점

- 기준값(pivot)에 의한 분할을 통해 구현하는 정렬 방법으로, 분할 과정에서 `O(logn)`이라는 시간이 소요되며, 전체적으로 `O(nlogn)`으로 준수한 편의 속도를 가진다.
- 불필요한 데이터의 이동을 줄이고 먼 거리의 데이터를 교환할 뿐만 아니라, 한 번 결정된 피벗들이 추후 연산에서 제외되는 특성 때문에, 시간 복잡도가 O(nlogn)을 가지는 다른 정렬 알고리즘과 비교했을 때도 가장 빠르다.
- 제자리 정렬 방식의 경우 정렬하고자 하는 배열 안에서 교환하는 방식이므로, 다른 메모리 공간을 필요로 하지 않는다.

### 단점

- **불안정 정렬(Unstable Sort)** 이다.
- 정렬된 배열의 경우 퀵 정렬의 불균형 분할에 의해 오히려 수행 시간이 더 많이 걸린다.
- 메모리를 위해 불안정 정렬의 형태로 구현할 경우, 기준값에 따라 시간 복잡도가 크게 달라질 수 있다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [Code Playground](https://im-developer.tistory.com/135)
