# 분할 정복 (Devide and Conquer)

분할 정복(Devide and Conquer)은 여러 알고리즘의 기본이 되는 해결방법으로, 기본적으로 엄청나게 크고 방대한 문제를 조금씩 나눠가면서 풀 수 있는 문제 단위로 나눈 다음 그것들을 다시 합쳐서 해결하자는 개념에서 출발하였다.

![https://blog.kakaocdn.net/dn/bjSHOI/btrbgpC6xKc/HuqqIswrWCXPAigkTYgor1/img.png](https://blog.kakaocdn.net/dn/bjSHOI/btrbgpC6xKc/HuqqIswrWCXPAigkTYgor1/img.png)

위 그림에서와 같이 분할 정복은 **상단에서 분할**하고 **중앙에서 정복**하고, **하단에서** **조합**(`Combine`)하는 형태로 도식화할 수있다.

- **분할**: 문제를 더 이상 분할할 수 없을 때까지 동일한 유형의 여러 하위 문제로 나눈다.
- **정복**: 가장 작은 단위의 하위 문제를 해결하여 정복한다.
- **조합**: 하위 문제에 대한 결과를 원래 문제에 대한 결과로 조합한다.

즉, **문제를 즉각 해결할 수 있을 때까지 재귀적으로 둘 이상의 하위 문제(`Sub-problem`)들로 나누고(`Divde`) 문제를 해결(`Conquer`)한 다음 그 결과를 이용해 다시 전체 문제를 해결하며 합치는 방법**이다.

## 적용 방식

분할 정복법은 재귀적으로 자신을 호출하면서 그 연산의 단위를 조금씩 줄여가는 방식이다. 분할 정복의 프로세스는 대체로 아래와 같다.

```tsx
function F(x) {
  if F(x)가 간단 then:
    return F(x)를 계산한 값
  else:
    x를 x1, x2로 분할
    F(x1)과 F(x2)를 호출
    return F(x1), F(x2)로 F(x)를 구한 값
```

## 대표적인 알고리즘

1. [이진 탐색 (Binary Search)](../search/binary-search/)
2. [퀵 정렬 (Quick Sort)](../sorting/quick-sort/)
3. [병합 정렬 (Merge Sort)](../sorting/merge-sort/)

## 분할정복의 장단점

### 장점

- 문제를 나눔으로써 어려운 문제를 해결할 수 있다는 장점이 있다.
- 문제를 나누어서 해결한다는 특징상 병렬적으로 문제를 해결하는데 큰 강점이 있다.

### 단점

- 함수를 재귀적으로 호출한다는 점에서 함수 호출로 인한 오버헤드가 있다.
- 스택에 다양한 데이터를 보관하고 있어야 하므로 스택 오버플로우가 발생하거나 메모리를 과도하게 사용하게 된다는 단점이 있다. → 스택, 큐 등의 자료구조를 구현할 경우 해결

## 4. 분할 정복 vs 다이나믹 프로그래밍

**큰 문제를 작은 문제로 나눠서 푼 다음 합친다**는 면에서 다이나믹 프로그래밍과 개념이 비슷하다고 생각할 수 있지만, DP와의 차이는 **작은 문제가 중복되냐, 안되냐의 차이**다.

- **분할정복**: 작은 문제가 중복되지 않고, 모두 한 번씩 풀어야 한다.
- **DP**: 작은 문제가 중복되므로, 메모이제이션으로 중복 결과값을 재사용한다.
