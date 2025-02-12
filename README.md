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


## else if 피하기

아래의 코드를 살펴보자
```js
const x = 1;
if (x >= 0) {
  console.log('x는 0보다 크거나 같다');
} else if (x > 0) {
  console.log('x는 0보다 크다');
}
```

어떤 결과값이 나올까?? 첫번째 콘솔만 나올까? 아님 둘다 나올까?
정답은 첫번째 콘솔만 나온다. 조금 헷갈릴 수도 있지만 위의 코드가 아래와 명백히 똑같다고 생각하면 헷갈리지 않을것이다.
위의 코드는 컴퓨터상으로 아래와 같다

```js
const x = 1;
if (x >= 0) {
  console.log('x는 0보다 크거나 같다');
} else {
  if (x > 0) {
    console.log('x는 0보다 크다');
  }
}
```

대처 방법
1) if else if 문이 장황하게 늘어질것같으면 차라리 switch문을 써라
2) if else if else if를 쓰는 대신 if 문을 여러개 작성해라
3) 핵심은 return 문을 활용해서 사람이 읽기 편한 코드를 작성해야한다는 것이다.

## Early Return
```js
function loginService(isLogin, user) {
  if(!isLogin) {
    if(checkToken()) {
      if (!user.nickName) {
        return registerUser(user);
      } else {
        refreshToken();

        return '로그인 성공';
      }
    } else {
      throw new Error('no token');
    }
  }
}
```
위의 코드는 이렇게

```js
function loginService(isLogin, user) {
  // Early Return 
  /**
   * 함수를 미리 종료
   * 사람이 생각하기 편하다
   */
  if(isLogin) return;

  if (!checkToken()) throw new Error('No Token');

  if (!user.nickName) {
    return registerUser(user);
  } 

  refreshToken();
}
```

## 연산자 우선순위 명시적으로 표현하기
```js
if (isLogin && token || user) { ... } 
```
위와같은 코드는
```js
if ((isLogin && token) || user) { ... } 
```

식으로 변경하여 협업하는 개발자들로 하여금 헷갈리지 않게 해야한다.

## 드모르간의 법칙
AND 연산과 OR 연산을 이용한 연산 간의 관계로 드 모르간의 상대성이론
프로그래밍에서는 부정 연산을 다룰 때 편하다.

```js
  not (A or B) === (not A) and (not B)
  ㄴ !(A || B) === !A && !B

  not (A and B) === (not A) or (not B)
  ㄴ !(A && B) === !A || !B
```

첫번째 케이스(유저와 토큰이 모두(AND) 참일경우)
```js
  const isValidUser = true;
  const isValidToken = true;

  if (isValidaUser && isValidToken) {
    console.log('로그인 성공!');
  }

  if (!(isValidaUser && isValidToken)) {
    console.log('로그인 실패!');
  }

  if (!isValidaUser || !isValidToken) {
    console.log('로그인 실패!');
  }
```

두번째 케이스 (남자거나 여자거나)
```js
  const isMale = true;
  const isFemale= true;

  if (isMale || isFemale) {
    console.log('인증 완료');
  }
  if (!isMale && !isFemale) {
    console.log('인증 실패');
  }
```

## 자바스크립트 배열은 객체이다.
Array.isArray() => 진짜 Array인지 확인하는 메서드

## Array.length
Array.length는 요소의 갯수라고 생각하는 것보다, 마지막 요소의 인덱스라고 생각하는 게 맞다.

```js
  const arr = [1, 2, 3];
  arr[3] = 4;
  console.log(arr.length); // =>  4
  arr[9] = 10;
  arr // =>  [1,2,3,4,,,,,,10];
  console.log(arr.length); // =>  10
```

배열초기화하기
```js
  Array.prototype.clear = function() {
    this.length = 0;
  }

  function clearArray(array) {
    array.length = 0;
    return array;
  }

  const arr = [1,2,3];
  arr.clear();
  // OR
  clearArray(arr);
```



