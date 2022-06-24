# 선형 탐색(Linear Search)

**선형 탐색**은 **순차 탐색(Sequential Search)** 라고도 불리며, 리스트에서 특정한 값을 찾는 알고리즘 중 하나입니다. 선형 탐색은 **리스트에서 원하는 값을 찾을 때까지 맨 앞에서부터 끝까지 순차적으로 탐색하며 찾아 나가는 알고리즘**입니다.
검색할 리스트의 길이가 길면 비효율적이지만, 검색 방법 중 가장 단순하여 구현이 쉽고 정렬되지 않은 리스트에서도 사용할 수 있다는 장점이 있습니다.

## 진행 순서

![https://blog.kakaocdn.net/dn/eAAyYX/btqxCPUlzON/vkGa5VAkjai9IlQEJlJ74K/img.gif](https://blog.kakaocdn.net/dn/eAAyYX/btqxCPUlzON/vkGa5VAkjai9IlQEJlJ74K/img.gif)

리스트의 맨 앞부터 원하는 값을 찾을 때까지 하나씩 인덱스를 늘려가며 탐색합니다.

## Example Code

```tsx
const linearSearch = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }
  return -1; // 존재하지 않는다는 뜻
};
```

## 시간 복잡도

- `O(n)` - 최악의 경우 각 요소를 모두 확인하기 때문에

## 장점

- 검색 방법 중 가장 단순하여 구현이 쉽습니다.
- 정렬되지 않은 리스트에서도 사용할 수 있습니다.

## 단점

- 검색할 리스트의 길이가 길면 비효율적입니다.

## 참고

[나무 위키](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89)
[https://sustainable-dev.tistory.com/34](https://sustainable-dev.tistory.com/34)
