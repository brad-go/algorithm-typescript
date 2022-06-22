# 계수 정렬(Counting Sort)

계수 정렬은 **각 숫자가 몇 개 있는지 수를 세어 저장한 후에 정렬하는 방식**이다. 각 항목의 개수를 기록하기 위해 정수로 인덱스되는 카운트 배열을 사용하기 때문에 정수나 정수로 표현할 수 있는 자료에만 적용할 수 있는 정렬 알고리즘이다.

- 각 배열 요소의 숫자 범위가 매우 작을 때 가장 잘 작동한다.
- 큰 키를 조금 더 효율적으로 처리할 수 있는 기수 정렬에서 서브 루틴으로 사용된다.
- 개수를 세기 위한 충분한 공간을 할당하려면 집합 내의 가장 큰 정수를 알아내야 한다.

## 진행 과정

![https://blog.kakaocdn.net/dn/vurcx/btqFPrXv8rg/kFWVlJLIPZNzvVaFRZ7G51/img.gif](https://blog.kakaocdn.net/dn/vurcx/btqFPrXv8rg/kFWVlJLIPZNzvVaFRZ7G51/img.gif)

1. 정렬하고자 하는 배열의 최댓값을 구한다.
2. 최댓값 + 1 크기의 counting 배열을 생성한다.
3. 입력 배열 내에 모든 요소 개수를 구해 counting 배열에 저장해준다.
4. counting 배열의 요소들에 대해 직전 요소들의 값을 더해서 누적합 배열로 만들어준다.
5. 기존 배열과 동일한 크기의 출력 배열을 만든다.
6. 입력 배열의 역순으로 진행하며 각 요소를 counting 배열의 인덱스로 넣어 준다. 해당 값을 출력 배열의 인덱스로 사용해 요소를 넣어주고, counting 배열의 요소에 대한 인덱스의 값을 1 줄인다.

## Example Code

```tsx
const countingSort = (array) => {
  if (array.length < 2) return array;

  const maxValue = findMaxValue(array);
  const counts = new Array(maxValue + 1).fill(0);
  const sortedArray = new Array(array.length);

  // 각 요소의 개수를 세어준다.
  array.forEach((element) => counts[element]++);
  // 누적합 배열로 만들어준다.
  counts.forEach((_, idx) => (counts[idx] += counts[idx - 1] || 0));
  // 기존 배열을 역순으로 순회하면서 정렬된 배열에 값을 추가
  for (let i = array.length - 1; i >= 0; i--) {
    sortedArray[--counts[array[i]]] = array[i];
  }

  return sortedArray;
};

const findMaxValue = (array) => {
  if (!array || array.length <= 0) return 0;

  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }

  return max;
};
```

## 복잡도

| 이름              |   최선   |   평균   |   최악   |  메모리  | 안정 여부 |
| ----------------- | :------: | :------: | :------: | :------: | :-------: |
| **Counting sort** | O(N + K) | O(N + K) | O(N + K) | O(N + K) |    Yes    |

- K는 배열에서 가장 큰 숫자를 의미한다.

### 시간 복잡도

- 계수 정렬의 시간 복잡도는 `O(n+k)`인데, 이때 n은 정렬할 리스트의 길이, k는 리스트의 정수 최댓값을 의미한다.
- 데이터 개수가 n일 때, 시간복잡도는 `O(n)`이다. 정렬된 배열을 담을 때도 기존 배열의 요소를 역순으로 훑기 때문에 같다.
- 최댓값이 배열의 길이보다 클 경우 `O(n+k)`의 복잡도를 가지게 된다.

### 공간 복잡도

- 배열 내 요소의 최댓값을 k라고 할 때, k + 1 길이를 가진 counting 배열이 필요하므로 `O(n+k)`이다.

## 장단점

### 장점

- `O(n)`에 가까운 매우 빠른 속도로 정렬이 가능하다.
- **안정 정렬(Stable Sort)** 이다.

### 단점

- 추가적인 메모리 공간이 필요하며, 값의 분포에 따라 메모리 낭비가 심할 수 있다.
- 음수나 실수는 정렬할 수 없다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [기내식은 수박바님 블로그](https://soobarkbar.tistory.com/101)
