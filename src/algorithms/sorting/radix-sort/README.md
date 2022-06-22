# 기수 정렬(Radix Sort)

버블 정렬, 선택 정렬, 퀵 정렬 등의 알고리즘을 비교 정렬(Comparison sort) 알고리즘이라고 한다. 이러한 비교 정렬 알고리즘들은 모두 데이터끼리의 직접적인 비교를 하는데, 이렇게 데이터끼리 직접적인 비교를 하여 정렬할 경우 시간 복잡도는 `O(nlogn)`보다 작아질 수 없다. 시간 복잡도를 더 줄일 수 있는 방법은 비교를 하지 않는 것이다.

기수 정렬은 **낮은 자릿수부터 비교하여 정렬해 간다는 것을 기본 개념으로 하는 정렬 알고리즘**으로, **동일한 위치와 값을 공유하는 개별 자릿수로 키를 묶어서 정수 키로 데이터를 정렬하는 비교를 하지 않는 정수 정렬 알고리즘**이다. 위치 표기법이 필요하지만 정수는 문자열(예: 이름 또는 날짜)과 특수 형식의 부동 소수점 숫자를 나타낼 수 있으므로, 기수 정렬은 정수로 제한되지 않는다.

기수 정렬은 자릿수가 있는 데이터(정수, 문자열 등)에서만 수행이 가능하며, **데이터끼리의 직접적인 비교없이 정렬을 수행**한다. 비교를 이용한 정렬이 아니기 때문에, k가 상수일 경우 시간 복잡도가 `O(n)`으로 퀵 정렬보다 빠른 시간 복잡도가 나오는 것이 가능하다.

다만 이 알고리즘은 자릿수가 적은 4바이트 정수 등에서나 제대로 된 성능을 발휘할 수 있으며, 자릿수가 무제한 가까운 문자열 정렬 등에 사용할 경우 오히려 퀵 정렬보다 느릴 수 있다. 부동 소수점의 경우는 부호 여부, 지수부, 가수부에 대해 각각 기수정렬을 실행해야 한다.

다른 정렬 알고리즘에 비해 기수 정렬의 효율성에 대한 주제는 다소 까다롭고 꽤 많은 오해를 받지만, 기수 정렬이 최상의 비교 기반 알고리즘보다 효율적인지는 가정 세부사항에 따라 달라진다.

## 진행 과정

![https://blog.kakaocdn.net/dn/DWH0S/btqFOYnIbCu/Q7HOAOzzvlD4xW279LqTLK/img.gif](https://blog.kakaocdn.net/dn/DWH0S/btqFOYnIbCu/Q7HOAOzzvlD4xW279LqTLK/img.gif)

1. 데이터 중 가장 큰 자릿수를 구한다.
2. 가장 작은 자릿수부터 같은 데이터끼리 모은다. 이때 같은 자릿수에 여러 데이터가 있을 경우에는 입력도니 순서(나열된 순서)로 데이터를 모은다.
3. 다음 자릿수가 같은 데이터끼리 오름차순으로 나열한다.
4. 가장 큰 자릿수가 될때까지 위의 과정을 반복한다.

> 기수 정렬은 가장 작은 자릿수부터 가장 큰 자릿수까지 해당 자릿수만을 보고 카운팅 정렬(counting sort)을 수행한다.

## Example Code

```tsx
const radixSort = (array, radixBase = 10) => {
  if (array.length < 2) return array;

  const maxValue = findMaxValue(array);

  // 각 자릿수에 대해, 1의 자리부터 카운팅 정렬 실행
  for (let digit = 1; digit < maxValue; digit *= 10) {
    array = countingSortForRadix(array, radixBase, digit);
  }

  return array;
};

// 최댓값 구하기
const findMaxValue = (array) => {
  if (!array || array.length <= 0) return 0;

  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }

  return max;
};

const countingSortForRadix = (array, radixBase, digit) => {
  const buckets = new Array(radixBase).fill(0); // bucket
  const aux = new Array(radixBase).fill(0); // 임시로 사용할 공간

  for (let i = 0; i < array.length; i++) {
    const bucketsIndex = Math.floor((array[i] / digit) % radixBase); // 해당 자릿수의 숫자 추출
    buckets[bucketsIndex]++;
  }

  // 누적합 배열로 만들기
  for (let i = 1; i < buckets.length; i++) {
    buckets[i] += buckets[i - 1];
  }

  // 값이 큰 것이 뒤로 가야하므로 뒤에서부터 시작
  for (let i = array.length - 1; i >= 0; i--) {
    const bucketsIndex = Math.floor((array[i] / digit) % radixBase);
    aux[--buckets[bucketsIndex]] = array[i];
  }

  for (let i = 0; i < array.length; i++) array[i] = aux[i];

  return array;
};
```

## 복잡도

| 이름           | 최선  | 평균  | 최악  |  메모리  | 안정 여부 |
| -------------- | :---: | :---: | :---: | :------: | :-------: |
| **Radix sort** | O(NK) | O(NK) | O(NK) | O(N + K) |    Yes    |

- K는 가장 긴 키의 길이를 뜻한다.

### 시간 복잡도

- 배열에서 가장 큰 자리수의 값만큼 카운팅 정렬을 수행한다. 한번의 카운팅 정렬은 `O(n + k)`의 시간 복잡돠 같고, k = 10으로 `O(n)`으로 표현이 가능하므로, 기수 정렬의 시간 복잡도는 `O(nk)`로 표현할 수 있다.

### 공간 복잡도

- 버킷이라는 작지 않은 용량의 추가적인 메모리 공간을 필요로 하며, O(n + k)이다.

## 장단점

### 장점

- 자릿수를 비교해 정렬하기 때문에 문자열도 정렬이 가능하다.
- `O(kn)`으로 빠른 시간으로 정렬이 가능하다.
- 카운팅 정렬보다 약간 느리지만 매우 큰 수에서도 수행이 가능하다.
- **안정 정렬(Stable Sort)** 이다.

### 단점

- 버킷이라는 추가적인 메모리 공간을 요구한다.
- 자릿수가 존재하지 않는 데이터를 정렬할 수 없다.

## 참고

- [나무 위키](https://namu.wiki/w/%EC%A0%95%EB%A0%AC%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98#s-2.2.3)
- [신입 개발자 전공 지식 & 기술 면접 백과사전](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
