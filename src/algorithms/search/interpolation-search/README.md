# 보간 탐색(Interpolation Search)

보간 탐색은 정렬된 리스트에서 범위를 줄여가며 검색하는 알고리즘입니다. 보간 탐색은 **이진 탐색을 개선한 알고리즘으로 이진 탐색처럼 비교 대상을 무조건 중간으로 잡지 않고, 찾고자 하는 값이 전체 데이터 값을 보니 이정도에 있겠구나 하고 추측하여 탐색하는 방식**입니다. 보간 탐색은 전화부에서 이름 (책의 항목이 정렬되는 키 값)을 검색하는 방법과 유사합니다.

동작 방식은 이진 탐색과 비슷하지만 **탐색 위치를 정하는 방식**이 다릅니다.

```ts
pos = low + ((X - arr[low]) * (high - low) / (arr[high] - arr[low])

* start: 현재 구간의 시작 인덱스
* last: 현재 구간의 마지막 인덱스
* X: 찾고자 하는 값
```

보간 탐색은 정렬된 배열의 값이 균등하게 분포되어 있는 경우, 이진 탐색보다 뛰어난 성능을 보입니다. 이진 탐색은 항상 중간 위치로 탐색 위치를 결정하는 반면 **보간 탐색은 탐색 중인 키 값에 따라 다른 위치로 이동**하게 됩니다. 예를 들어 검색 값이 상대적으로 앞에 있다고 판단하면 앞쪽에서 탐색을 진행합니다.

- 전체 데이터 범위에서 균등하게 데이터가 분포되어 있을 수록 탐색하고자 하는 위치를 더 빠르게 찾을 수 있게 됩니다.

## 진행 순서

![https://blog.kakaocdn.net/dn/pVsaS/btq53k0XUCI/VdE9A1BkBb6vmZCXyb5dV1/img.png](https://blog.kakaocdn.net/dn/pVsaS/btq53k0XUCI/VdE9A1BkBb6vmZCXyb5dV1/img.png)

1. 탐색 위치(pos)를 구합니다.
2. 탐색 위치에 있는 값과 검색 값을 비교합니다.
   1. 값이 같다면 종료합니다.
   2. 검색 값이 크다면 탐색 위치 기준 배열의 오른쪽 구간을 대상으로 탐색합니다. (low = pos + 1)
   3. 검색 값이 작다면 탐색 위치 기준 배열의 왼쪽 구간을 대상으로 탐색합니다. (high = pos - 1)
3. 값을 찾거나 간격이 비어있을 때까지 반복합니다.

## Example Code

```tsx
const interpolationSearch = (
  array,
  target,
  low = 0,
  high = array.length - 1,
) => {
  // 현재 범위 바깥에 있거나, low 값이 high를 넘겼다면 없는 것
  if (low > high || target < array[low] || target > array[high]) return -1;

  // 위 공식에 따라 탐색 위치 구하기
  const pos =
    low + ((high - low) * (target - array[low])) / (array[high] - array[low]);

  if (arr[pos] === target) return pos;

  if (arr[pos] < target) {
    return interpolationSearch(array, target, pos + 1, high);
  } else if (arr[pos] > target) {
    return interpolationSearch(array, target, low, pos - 1);
  }

  return -1;
};
```

## 시간 복잡도

- `O(log(log(n))` - 균등한 데이터 분포일 경우

## 장점

- 많은 데이터가 비교적 균등하게 분포되어 있을 경우 이진 탐색보다 효율적이다.
- 탐색의 위치가 찾는 데이터와 가깝기 때문에 탐색 대상을 줄이는 속도가 이진 탐색보다 뛰어나다.

## 단점

- 숫자가 아닌 경우 이진 탐색보다 느리기 때문에, 잘 쓰이지 않는다.

## 참고

- [겐지충 프로그래머님 블로그](https://hongjw1938.tistory.com/40)
- [윤그래머님 블로그](https://yoongrammer.tistory.com/77)
