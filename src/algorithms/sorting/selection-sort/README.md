# 선택 정렬(Selection Sort)

선택 정렬은 버블 정렬과 유사한 알고리즘으로, **해당 순서에 원소를 넣을 위치는 이미 정해져 있고, 어떤 원소를 넣을지 선택하는 알고리즘**이다. 즉 ,배열 안의 자료 중 가장 작은 수를 선택한 다음, 첫번째 위치의 수와 교환해주는 방식의 정렬이다.
선택 정렬과 삽입 정렬을 헷갈려할 수 있는데, 선택 정렬은 **배열에서 해당 자리를 선택하고 그 자리에 올 값을 찾는 것**이라고 생각하면 편한다.

- 버블 정렬은 인접한 두 원소를 비교할 때마다 교환이 발생하지만, 선택 정렬은 교환 횟수를 최소화 한다.
- 버블 정렬보다 두 배 정도 빠르다.
- 사람이 사용하는 정렬 방식을 가장 많이 닮았다.
- 어떻게 정렬되어 있든 일관성 있게 `n(n-1)/2`에 비례하는 시간이 걸린다.

## 진행 과정

![https://github.com/GimunLee/tech-refrigerator/raw/master/Algorithm/resources/selection-sort-001.gif](https://github.com/GimunLee/tech-refrigerator/raw/master/Algorithm/resources/selection-sort-001.gif)

1. 주어진 배열 중에 최솟값을 찾는다.
2. 그 값을 맨 앞에 위치한 값과 교체한다.
3. 맨 처음 위치를 뺀 나머지 배열을 같은 방법으로 교체한다.

## Example Code

```tsx
const selectionSort = (array) => {
  let minIndex, temp;

  for (let i = 0; i < array.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    temp = array[minIndex];
    array[minIndex] = array[i];
    array[minIndex] = temp;
  }

  return array;
};
```

## 복잡도

| 이름               |       최선       |       평균       |       최악       | 메모리 | 안정 여부 |
| ------------------ | :--------------: | :--------------: | :--------------: | :----: | :-------: |
| **Selection sort** | O(N<sup>2</sup>) | O(N<sup>2</sup>) | O(N<sup>2</sup>) |  O(1)  |    No     |

### 시간 복잡도

데이터의 개수가 n개라고 했을 때,

- 첫 번째 회전에서의 비교횟수: 1 ~ (n - 1) ⇒ n - 1
- 두 번째 회전에서의 비교횟수: 2 ~ (n - 1) ⇒ n - 2
  …
- `(n-1) + (n-2) + (n-3) + … + 2 + 1 ⇒ n(n-1)/2`

비교하는 것이 상수 시간에 이루어진다는 가정 아래, n개의 주어진 배열을 정렬하는데 `O(n^2)` 만큼의 시간이 걸린다. 최선, 평균, 최악의 경우 시간복잡도는 `O(n^2)`으로 동일하다.

### 공간 복잡도

- 주어진 배열 안에서 교환(swap)을 통해, 정렬이 수행되므로 `O(1)`이다.

## 장단점

### 장점

- 버블 정렬과 마찬가지로 알고리즘이 단순하다.
- 정렬을 위한 비교 횟수는 많지만, 버블 정렬에 비해 실제로 교환하는 횟수는 적기 때문에 많은 교환이 일어나야 하는 자료 상태에서 비교적 효율적이다.
- 버블 정렬과 마찬가지로 정렬하고자 하는 배열 안에서 교환하는 방식으로 다른 메모리 공간을 필요로 하지 않는다.

### 단점

- 시간 복잡도가 `O(n^2)`으로, 비효율적이다.
- **불안정 정렬(Unstable Sort)** 이다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
