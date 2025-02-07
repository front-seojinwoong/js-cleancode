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

