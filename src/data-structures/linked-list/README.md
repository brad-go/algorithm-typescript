# 연결 리스트 (Linked list)

추상적인 자료형인 리스트를 구현한 자료구조로, `Linked List`라는 말 그대로 어떤 **데이터(이하 노드, Node)를 저장할 때, 그 다음 순서의 자료가 있는 위치를 데이터에 포함시키는 방식으로 자료를 저장**한다. 예를 들어 한 반에 있는 학생들의 자료를 저장한다면, 학생 하나하나의 신상명세 자료를 노드로 만들고, 1번 학생의 신상명세 자료에 2번 학생 신상명세가 어디있는지 표시를 해 놓는 방식이다.

<div align="center">
<img src="https://velog.velcdn.com/images%2Fkimkevin90%2Fpost%2Ffca9e55c-fa9e-485b-a8fb-5fa2766f7c65%2Flinkedlist.PNG" alt="단일 연결 리스트">
</div>

링크드 리스트는 **순서를 표현하는 노드들의 집합**으로 이루어져 있다. 간단하게, **각각의 노드들은 데이터와 다음 순서의 노드를 가리키는 레퍼런스(링크라고 부름)로 이루어져 있다**.

- 연결 리스트의 각 원소는 **노드(Node)** 라고 한다.
- 각 노드는 데이터와 그 다음 노드를 가리키는 **포인터(Pointer)** 를 가지고 있다.
- 연결 리스트의 맨 앞과 맨 끝 노드를 각각 **머리(Head)**, **꼬리(Tail)** 노드라고 한다.
- 각 노드의 앞쪽 노드를 **전임 노드(Predecessor Node)**, 뒤쪽 노드를 **후임 노드(Succesor Node)** 라고 한다.

## Linked List의 장점

- 효율적인 **삽입 및 삭제**
- 구조 변경이 덜 복잡함

## Linked List의 단점

- 배열보다 더 많은 메모리 사용(다음 순서를 나타내는 링크를 저장할 메모리 필요)
- **특정 요소 검색시 비효율적, 임의 접근 불가**
- 병렬처리 불가

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
