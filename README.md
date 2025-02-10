## var VS let, const

var: 함수 스코프이다  
let, const: 블록 스코프이다

## 전역변수는 최대한 지양하자

최상위 환경은 크게 브라우저(window), 노드JS(global)로 구성되어있다.
대처 방법
1) 전역변수 사용하지말자
2) 지역변수만 만들자
3) window, global을 조작하지 말자
4) const, let 활용
5) IIFE(즉시실행함수), module, closure 

## 임시변수는 최대한 제거하자
함수 하나에 여러가지 장황하게 작성하지 말자.
함수 하나는 하나의 역할만
해결책 => 함수 나누기, 바로 반환, 고차함수 이용(map, filter, reduce), 선언형 코드로 바꿔보는 연습

## typeof 자료형 검사
typeof 만으로는 자료형을 완벽하게 체크할 수 없다
typeof, 
instanceof, 
Object.prototype.toString.call(검사하려는 자료) 등 자료형을 체크할 때는 주의깊게 봐야한다.

## prefix - suffix
prefix: 접두사
suffix: 접미사

react에서의 useState, useRedux 등... 접두사 접미사는 프로그래밍 상에서 아주 중요하고 지켜야할 '약속'이다.

폴더 구조역시 => actions, resources 등... (복수) 또는 middleware (단수) 등 일관성을 가지는 것이 중요하다.

## 매개변수의 순서가 경계다 
### 보완방법
1. 매개변수는 2개가 넘지 않도록 만든다.
2. arguments, rest parameters
3. 매개변수를 객체에 담아서 넘긴다.
4. 랩핑하는 함수

3번 예시
```js
function someFunc({ someArg1, someArg2, someArg3, someArg4 }) {

}

function getFunc(someArg1, someArg3) {
  someFunc(someArg1, undefined, someArg3);
}
```

## 값 식 문
'식'은 '값'으로 귀결된다

## 삼항연산자 다루기
![로컬 이미지](./images/1.png)