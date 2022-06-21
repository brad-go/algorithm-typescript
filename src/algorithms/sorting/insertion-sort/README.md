# 삽입 정렬(Insertion Sort)

손 안의 카드를 정렬하는 방법과 유사한 정렬 방법으로 선택 정렬과 함께 인간이 무의식적으로 사용하는 정렬 방식이다. 삽입 정렬은 **2번째 원소부터 시작하여 그 앞(왼쪽)의 원소들과 비교하여 삽입할 위치를 지정한 후, 위치 이후의 원소들을 한 칸씩 뒤로 밀어내고 지정된 자리에 자료를 삽입**하여 정렬하는 알고리즘이다.

선택 정렬과 삽입 정렬은 k번째 반복 이후, 첫번째 k 요소가 정렬된 순서로 온다는 점에서 유사하다. 하지만, 선택 정렬은 k+1번째 요소를 찾기 위해 나머지 모든 요소들을 탐색하지만 삽입 정렬은 k+1번째 요소를 배치하는 데 필요한 만큼의 요소만 탐색하기 때문에 훨씬 효율적으로 실행된다는 차이가 있다.

- 선택 정렬과 유사하지만 조금 더 효율적인 정렬 알고리즘이다.
- 최선의 경우 `O(N)`이라는 엄청나게 빠른 효율성을 가지고 있어, 다른 정렬 알고리즘의 일부로 사용될 만큼 좋은 정렬 알고리즘이다.

## 진행과정

![https://github.com/GimunLee/tech-refrigerator/raw/master/Algorithm/resources/insertion-sort-001.gif](https://github.com/GimunLee/tech-refrigerator/raw/master/Algorithm/resources/insertion-sort-001.gif)

1. 정렬은 2번째 위치(index)의 값을 temp에 저장한다.
2. temp와 이전에 있는 원소들과 비교하며 삽입해나간다.
3. 다시 다음 위치(index)의 값을 temp에 저장하고 반복한다.

## Example Code

```tsx
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    let temp = array[i]; // 현재 위칫값 저장
    let currentIndex = i; // 현재 위치

    // 현재 위치가 1 이상이고, 이전 위치의 값이 임시로 저장한 기존 값보다 크다면
    while (currentIndex > 0 && temp < array[currentIndex - 1]) {
      // 기존 위치의 자리에 이전 값을 저장
      array[currentIndex] = array[currentIndex - 1];
      // 더 이전 위치를 가리키도록 함
      currentIndex--;
    }

    // temp보다 작은 값들 중 제일 큰 값의 위치를 가리키므로 temp 삽입
    array[currentIndex] = temp;
  }

  return array;
};
```

## 복잡도

| 이름               | 최선 |       평균       |       최악       | 메모리 | 안정 여부 |
| ------------------ | :--: | :--------------: | :--------------: | :----: | :-------: |
| **Insertion sort** | O(N) | O(N<sup>2</sup>) | O(N<sup>2</sup>) |  O(N)  |    Yes    |

### 시간 복잡도

- 최악의 경우(역으로 정렬되어 있을 경우) 선택 정렬과 마찬가지로, `(n-1) + (n-2) + (n-3) + … + 2 + 1 ⇒ n(n-1)/2`로 `O(n^2)`이다.
- 모두 정렬이 되어있는 경우(Optimal)한 경우, 한번씩 밖에 비교를 안하므로 `O(n)`의 시간 복잡도를 가지게 된다.
- 이미 정렬되어 있는 배열에 자료를 하나씩 삽입/제거하는 경우에는, 현실적으로 최고의 정렬 알고리즘이 되는데, 탐색을 제외한 오버헤드가 매우 적기 때문이다.

### 공간 복잡도

- 주어진 배열 안에서 교환(swap)을 통해, 정렬이 수행되므로 `O(n)`이다.

## 장단점

### 장점

- 알고리즘이 단순하다.
- 대부분의 원소가 이미 정렬되어 있는 경우, 매우 효율적일 수 있다.
- 정렬하고자 하는 배열 안에서 교환하는 방식이므로, 다른 메모리 공간을 필요로 하지 않는다.
- **안정 정렬(Stable Sort)** 이다.
- 선택 정렬이나 버블 정렬과 같은 `O(n^2)` 알고리즘에 비교하여 상대적으로 빠르다.

### 단점

- 평균과 최악의 시간 복잡도가 `O(n^2)`으로 비효율적이다.
- 버블 정렬과 선택 정렬과 마찬가지로, 배열의 길이가 길어질수록 비효율적이다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
