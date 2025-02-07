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