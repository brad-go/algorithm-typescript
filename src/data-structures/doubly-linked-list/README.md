# 이중 연결 리스트 (Doubly Linked List)

이중 연결 리스트는 이름이 의미하듯이 **노드가 양쪽 방향으로 연결된 구조의 리스트**입니다.

<div align="center">
<img src="https://humanwhocodes.com/images/posts/2019/doubly-linked-list.svg" alt="이중 연결 리스트">
</div>
<br />

단일 연결 리스트는 모두 한 방향으로 노드가 연결되는 단방향 연결 리스트입니다. 이 리스트의 노드 구조체에는 next 멤버(다음 노드를 가리키는 포인터)만이 존재하는데, 여기에 prev멤버(이전 노드를 가리키는 포인터)를 추가해주어 양방향으로 구현해주는 것을 연결 리스트라고 합니다.

단일 연결 리스트가 다음 노드를 가리키는 한 개의 포인터만 가지고 있기 때문에 전체 리스트를 한 방향으로 순회만 가능하다는 문제가 있습니다. 이러한 문제를 극복하기 위해 이전 노드와 다음 노드를 가리키는 두 개의 포인터를 포함한 연결리스트인 이중 연결 리스트가 등장했습니다.

## 이중 연결 리스트의 장점

- 두 개의 노드 링크를 사용해 어느 방향으로든 리스트를 순회할 수 있다.
- 이전 노드 또는 링크를 수정할 수 있도록 이전 노드를 찾기 위해 리스트를 순회할 필요가 없다.

## 이중 연결 리스트의 단점

- 단일 연결 리스트와 비교해 하나의 포인터를 더 사용해야하기 때문에 메모리 소비량이 늘어난다.

## Linked List 복잡도

### 시간 복잡도

| 삽입 | 접근 | 탐색 | 변경 | 삭제 |
| ---- | ---- | ---- | ---- | ---- |
| O(1) | O(n) | O(n) | O(n) | O(n) |

### 공간 복잡도

- O(n)

## Linked List 메서드 목록

### 삽입 - O(1)

- `addFirst()`: 리스트 맨 앞에 노드 추가
- `addLast()`: 리스트 맨 뒤에 노드 추가
- `add()`: 기본적으로 리스트 맨 뒤에 노드 추가, 인자로 인덱스를 넘기면 해당 위치에 노드 추가

### 접근 - O(n)

- `get(idx)`: 인덱스에 해당하는 노드값 반환
- `peekFirst()`: 첫번째 노드값 반환
- `peekLast()`: 마지막 노드값 반환

### 탐색 - O(n)

- `indexOf(value)`: value에 해당하는 값을 리스트가 가지고 있다면 위치 반환
- `contains(value)`: value에 해당하는 값을 리스트가 가지고 있는지 아닌지 boolean값 반환

### 변경 - O(n)

- `set(value, idx)`: 인덱스에 해당하는 값을 value로 업데이트

### 삭제 - O(n)

- `removeFirst()`: 맨 앞 노드 제거
- `removeLast()`: 맨 뒤 노드 제거
- `remove()`: 기본적으로 맨 앞 노드 제거, 인자로 인덱스를 넘기면 해당 위치 노드 제거
- `clear()`: 모든 노드 제거

### 부가 기능

- `size()`: 리스트의 길이 반환
- `isEmpty()`: 리스트가 비었는지 boolean값 반환
- `toArray()`: 리스트의 각 노드들의 값을 배열로 전환해서 반환
- `fromArray(arr)`: 배열을 인자로 받아서 리스트에 맨 뒤에 저장

## 참조

- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list/README.ko-KR.md)
- [iruka](https://github.com/jeffzh4ng/iruka/blob/master/src/data-structures/sequences/linked-list/linked-list.ts)
- [나무 위키](https://namu.wiki/w/%EC%97%B0%EA%B2%B0%20%EB%A6%AC%EC%8A%A4%ED%8A%B8)
