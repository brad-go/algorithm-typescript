# 버킷 정렬

비교 유형의 정렬 알고리즘으로 **요소를 배열의 요소들을 여러 버킷으로 분산시켜 정렬하는 알고리즘**이다. 전체 데이터가 특정 범위 안에 균등하게 분포되어 있다는 가정을 할 수 있을 때, 매우 유용하게 쓰일 수 있다.

각 버킷은 다른 정렬 알고리즘을 사용하거나 버킷 정렬을 반복 적용해 각각 정렬한다. 그런 다음 개별 정렬된 버킷을 각각 정렬하여 최종 정렬된 배열을 얻는 방식으로 이러한 정렬 알고리즘 접근 방식을 분산 수집 접근 방식이라고도 한다.

- 버킷은 **빈(bin)** 이라고도 불리고, 버킷 정렬도 빈정렬로도 불린다.
- 일반적으로 삽입 정렬을 이용해서 버킷 안의 요소들을 정렬한다.
- 주로 입력이 `0.00`에서 `1.00`까지의 부동 소수점과 같은 범위에 걸쳐 균일하게 분포되어 있을 때 사용된다.

## 진행 과정

![https://velog.velcdn.com/images/ilil1/post/22e7f119-aed3-4d3b-a22c-3b8767b57bd5/image.gif](https://velog.velcdn.com/images/ilil1/post/22e7f119-aed3-4d3b-a22c-3b8767b57bd5/image.gif)

1. 입력 배열의 값들을 일정한 값들을 기준으로 버킷으로 나눈다. (버킷의 개수는 리스트의 길이와 같은 것이 이상적이다.)
2. 각 버킷에 해당되는 값에 기존 배열의 값들을 집어넣는다.
3. 각 버킷에 담긴 요소들을 다른 정렬 알고리즘을 통해 정렬한다. (일반적으로 삽입 정렬)
4. 마지막으로 버킷들을 이어서 정렬된 하나의 리스틀 만든다.

## Example Code

```tsx
const bucketSort = (array, bucketSize = 5) => {
  if (array.length < 2) return array;

  const buckets = createBuckets(array, bucketSize);

  return sortBuckets(buckets);
};

// 버킷 생성하기
const createBuckets = (array, bucketSize) => {
  let minValue = array[0];
  let maxValue = array[0];

  // 최솟값, 최댓값 설정
  array.forEach((currentValue) => {
    if (currentValue < minValue) minValue = currentValue;
    else if (currentValue > maxValue) maxValue = currentValue;
  });

  // 버킷의 크기를 최댓값에서 최솟값을 뺀 것으로 계산해서 음수도 가능하게 해준다.
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount).fill().map(() => []);

  // 각 버킷에 범위에 해당하는 값을 넣어준다.
  array.forEach((currentValue) => {
    const bucketIndex = Math.floor((currentValue - minValue) / bucketSize);
    buckets[bucketIndex].push(currentValue);
  });

  return buckets;
};

// 각 버킷을 정렬하고 정렬된 버킷들을 하나의 배열로 만들어 반환
const sortBuckets = (buckets) => {
  const sotredArray = [];

  buckets.forEach((bucket) => {
    insertionSort(bucket); // 구현 혹은 가져와서 사용해도 된다.
    bucket.forEach((element) => sotredArray.push(element));
  });

  return sotredArray;
};
```

## 복잡도

| 이름            |   최선   |   평균   |       최악       |  메모리  | 안정 여부 |
| --------------- | :------: | :------: | :--------------: | :------: | :-------: |
| **Bucket sort** | O(N + K) | O(N + K) | O(N<sup>2</sup>) | O(N + K) |    Yes    |

### 시간 복잡도

- 버킷을 만드는 데 필요한 `O(n)` 시간과 정렬하는 데 필요한 `O(k)` 시간으로 구성된다.
- 삽입 정렬은 요소가 역순일 때, 최악의 경우 시간 복잡도가 `O(n^2)`이다.

### 공간 복잡도

- 버킷을 만드는 공간이 필요하므로, `O(n+k)`이다.

## 장단점

### 장점

- 데이터 분포가 균등할 경우 매우 빠른 성능을 보인다.
- **안정 정렬(Stable Sort)** 이다.

### 단점

- 배열을 나누는 과정에서 나누어진 배열을 별도로 저장할 공간(버킷)이 필요하다.
- 한 버킷에 요소들이 몰린 경우 O(N^2)이다.
