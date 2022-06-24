# 셸 정렬(Shell sort)

셸 정렬은 비교 정렬 중 하나로, **삽입 정렬이 어느 정도 정렬된 배열에 대해서 빠르게 정렬한다는 것에서 고안된 것으로, 배열을 나누어서 조금이라도 정렬이 된 상태에 가까운 배열로 만든 다음 삽입 정렬을 하는 알고리즘**이다. 삽입정렬은 삽입되어야 할 위치가 현재 위치에서 상당히 멀리 떨어진 곳이라면 많은 이동을 해야만 제자리로 갈 수 있다. 하지만 셸 정렬에서는 바로 이웃한 위치로만 이동하는게 아니라 멀리 떨어진 위치로도 이동할 수 있다.

- 삽입 정렬의 보완한 알고리즘이다.
- 셸 정렬은 삽입 정렬과 달리 전체의 리스트를 한 번에 정렬하지 않는다.
- 삽입정렬보다 정렬해야하는 횟수는 늘지만, 전체적으로 요소 이동 횟수가 줄어들어 효율적인 정렬을 할 수 있다.

## 진행 과정

![https://media.geeksforgeeks.org/wp-content/uploads/20210708145308/20210707133409.gif](https://media.geeksforgeeks.org/wp-content/uploads/20210708145308/20210707133409.gif)

1. 정렬해야할 배열을 **간격(gap)** 이라고 하는 일정한 기준에 따라 분류한다.
   - 배열에서 간격만큼 떨어진 요소들을 모아 분류한다.
   - 간격은 기본적으로 `정렬할 값의 수 / 2`를 하지만 홀수인 경우가 더 좋다. 절반으로 줄일 때, 짝수가 나오면 + 1을 해서 홀수로 만든다.
2. 이를 통해 연속적이지 않은 여러 개의 부분 배열을 생성한 후 각 배열을 삽입 정렬로 정렬한다.
3. 모든 배열이 정렬되면, 다시 전체 배열을 전보다 간격을 줄여서 더 적은 개수의 부분 배열로 만든다.
4. 그 후 부분 배열의 개수가 1이 될 때까지 위의 과정을 반복한다.

## Example Code

```tsx
const shellSort = (array) => {
  let gap = Math.floor(array.length / 2);

  // gap이 0보다 클 때까지만 요소를 비교하고 스왑한다.
  while (gap > 0) {
    // 각각의 부분 배열에 삽입 정렬 수행
    for (let i = gap; i < array.length; i++) {
      const temp = array[i];

      let currentIndex = i;
      // 현재 인덱스가 gap보다 크고, 현재값이 gap만큼 떨어진 이전 인덱스의 값보다 작다면
      while (currentIndex >= gap && temp < array[currentIndex - gap]) {
        array[currentIndex] = array[currentIndex - gap];
        currentIndex = currentIndex - gap;
      }

      array[currentIndex] = temp;
    }

    // gap을 반으로 나눌 때 짝수라면 홀수로 만들어준다.
    gap = Math.floor(gap / 2);
    if (gap % 2 === 0 && gap > 1) gap++;
  }

  return array;
};
```

## 복잡도

| 이름           | 최선 |        평균        |       최악       | 메모리 | 안정 여부 |
| -------------- | :--: | :----------------: | :--------------: | :----: | :-------: |
| **Shell sort** | O(N) | O(N<sup>1.5</sup>) | O(N<sup>2</sup>) |  O(1)  |    No     |

### 시간 복잡도

- 이미 정렬된 경우 삽입 정렬을 수행하므로 그 최선과 같다. `O(N)`
- 평균적으로는 gap값에 따라 배열이 어떻게 나뉘어지는지에 따라 차이가 심하다.

### 공간 복잡도

- 주어진 배열 안에서 정렬을 수행하므로 `O(1)`이다.

## 장단점

### 장점

- 연속적이지 않은 부분 리스트에서 자료의 교환이 일어나면 더 큰 거리를 이동한다. 그러므로 교환되는 요소들이 삽입 정렬보다는 최종 위치에 있을 가능성이 높아진다.
- 부분 리스트는 어느 정도 정렬이 된 상태이기 때문에 부분 리스트의 개수가 1이 되게 되면, 셸 정렬은 기본적으로 삽입 정렬을 수행하는 것이지만, 삽입 정렬보다 더욱 빠르게 수행된다.
- 알고리즘 구현이 간단하다.

### 단점

- 설정한 **간격(gap)** 에 따라 성능의 차이가 심하다.
- **불안정 정렬(Unstable Sort)** 이다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [GeeksForGeeks](https://www.geeksforgeeks.org/shell-sort-visualizer-using-javascript/)
