# Typescript Algorithms and Data Structures

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fbrad-go&count_bg=%231B85EB&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

이 저장소는 개인적인 공부 및 정리가 목적으로 기본적인 자료구조와 알고리즘을 타입스크립트로 구현한 저장소입니다.

각 알고리즘과 자료 구조는 각각의 README를 가지고 있고, 해당 개념에 대해 정리한 내용을 가지고 있습니다.

부족한 지식으로 개념을 정리하고 예시 코드를 작성하기 때문에 잘못된 부분이나 부족한 부분, 변경사항이 있다면 언제든지 연락바랍니다!

## Data Structures

자료 구조는 데이터를 효율적으로 접근하고 수정할 수 있도록 컴퓨터에 데이터를 구성하고 저장하는 특정한 방법을 의미합니다. 더 정확하게 말하면 자료구조는 데이터 값, 데이터 간의 관계, 데이터에 적용할 수 있는 기능이나 작업의 집합입니다.

- [Linked List](./src/data-structures/linked-list/)
- [Doubly Linked List](./src/data-structures/doubly-linked-list/)
- [Stack](./src/data-structures/stack/)
- [Queue](./src/data-structures/queue/)
- [Deque](./src/data-structures/deque/)
- [Hash Table](./src/data-structures/hash-table/)
- [Heap](./src/data-structures/heap/)
- [Priority Queue](./src/data-structures/priority-queue/)
- [Tree](./src/data-structures/tree/)
  - [Binary Search Tree](./src/data-structures/tree/binary-search-tree/)

## Algorithms

알고리즘은 문제를 해결하는 방법에 대한 일련의 절차나 방법을 공식화한 형태로 표현한 것입니다.

### 주제별 알고리즘

#### [탐색(Searches)](./src/algorithms/search/)

- [선형 탐색(Linear Search)](./src/algorithms/search/linear-search/)
- [이진 탐색(Binary Search)](./src/algorithms/search/binary-search/)
- [점프 탐색(Jump Search)](./src/algorithms/search/jump-search/)
- [보간 탐색(Interpolation Search)](./src/algorithms/search/interpolation-search/)
- [지수 탐색(Exponential Search)](./src/algorithms/search/exponential-search/)

#### [정렬(Sorting)](./src/algorithms/sorting/)

- [버블 정렬(Bubble Sort)](./src/algorithms/sorting/bubble-sort/)
- [선택 정렬(Selection Sort)](./src/algorithms/sorting/selection-sort/)
- [삽입 정렬(Insertion Sort)](./src/algorithms/sorting/insertion-sort/)
- [병합 정렬(Merge Sort)](./src/algorithms/sorting/merge-sort/)
- [힙 정렬(Heap Sort)](./src/algorithms/sorting/heap-sort/)
- [퀵 정렬(Quick Sort)](./src/algorithms/sorting/quick-sort/)
- [기수 정렬(Radix Sort)](./src/algorithms/sorting/radix-sort/)
- [계수 정렬(Counting Sort)](./src/algorithms/sorting/counting-sort/)
- [셸 정렬(Shell Sort)](./src/algorithms/sorting/shell-sort/)
- [버킷 정렬(Bucket Sort)](./src/algorithms/sorting/bucket-sort/)

### 패러다임별 알고리즘

알고리즘 패러다임이란, 알고리즘이 주어진 문제를 해결하기 위해 채택한 전략이나 관점을 말합니다. 알고리즘을 해결하는 문제나 알고리즘의 동작 방식이 완전히 다르더라도, 알고리즘의 동작 원칙이 같다면 같은 패러다임을 사용했다고 말할 수 있습니다.

#### [분할 정복(Devide and Conquer)](./src/algorithms/paradigm/DevideAndConquer.md)

- [이진 탐색(Binary Search)](./src/algorithms/search/binary-search)
- [병합 정렬(Merge Sort)](./src/algorithms/sorting/merge-sort/)
- [퀵 정렬(Quick Sort)](./src/algorithms/sorting/quick-sort/)

문제를 작은 문제로 나눠 풀이한 다음 그것들을 합쳐서 해결하는 방식

## 저장소 사용법

#### 클론해서 로컬에 내려받기

```bash
git clone https://github.com/brad-go/algorithm-typescript.git
```

#### 모든 의존성 모듈 설치

```bash
yarn install
```

#### 모든 테스트 실행

```bash
yarn test
```

#### 항목별로 테스트 실행

```bash
yarn test 'LinkedList'
```

## 기여 방법

이 저장소에 기여하고 싶으시다면 변경 전에 **이슈**나 **이메일** 혹은 다른 방법을 통해서 저에게 연락을 주시면 감사하겠습니다.

<a href="mailto:dhjk35@naver.com" target="_blank"><img src="https://img.shields.io/badge/dhjk35@naver.com-EA4335?style=flat-square&logo=Gmail&logoColor=white"/></a>

## 참고

- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- [iruka](https://github.com/jeffzh4ng/iruka)
