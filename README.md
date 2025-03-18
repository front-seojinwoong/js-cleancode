## var VS let, const

var: 함수 스코프이다  
let, const: 블록 스코프이다

## 전역변수는 최대한 지양하자

최상위 환경은 크게 브라우저(window), 노드JS(global)로 구성되어있다.
대처 방법
1) 전역변수 사용을 최대한 지양하자.
2) 지역변수를 만들어서 캡슐화를 시키자.
3) window, global을 조작하지 말자.
4) const, let 활용.
5) IIFE(즉시실행함수), module, closure ...

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
3) return문을 활용해서 함수 처음에 중요하지 않은 조건을 처리해라
3) 핵심은 사람이 읽기 편한 코드를 작성해야한다는 것이다.

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

## 배열 요소에 접근하기
```js
  function clickGroupButton() {
    const confirmButton = document.getElementsByTagName('button')[0];
    const cancelButton = document.getElementsByTagName('button')[1];
    const resetButton = document.getElementsByTagName('button')[2];
  }
```

이거를 아래처럼 리팩토링할 수 있다.

```js
  function clickGroupButton() {
    const [confirmButton, cancelButton, resetButton] = document.getElementsByTagName('button');
  }
```

## 오늘날짜를 출력하는 유용한 함수
```js
 function formatDate(targetDate) {
  const [date] = targetDate.toISOString().split('T');
  // 또는  const [date] = targetDate.toISOString().split('T')[0];
  const [year, month, day] = date.split('-');
  return `${year}년 ${month}월 ${day}일`;
 }
```

## 유사배열객체
'배열'은 '객체'임을 알 수있다. 아래의 코드를 보자
```js
  const objLikeArray = {
    0: 'hello',
    1: 'world',
    length: 2
  }
  const arr = Array.from(objLikeArray); // Array.from() => 어레이처럼 만드는 메서드
```

대표적인 유사배열객체
- function의 arguments
- web API nodeList 

유사배열객체만으로는 순수배열 메서드(map, reduce, every, some 등등)을 사용할 수 없다.
사용하려면??
```js
(Array.from(arguments)).map(el => { code...  })
```

## 불변성 (immutable) 
불변성 -> 변하지 않는 상태 (이것을 유지하는 것이 좋다)

방법 1. 배열을 복사한다
방법 2. 새로운 배열을 반환하는 매서드를 활용한다.

## 배열 메서드 체이닝 활용하기

숫자로 이루어진 배열을 받아서 다음과 같은 처리를 하는 함수를 만든다고 가정해보자.
1. 배열 각각의 요소는 2000이 넘어야 한다.
2. 오름차순으로 정렬
3. 각 숫자끝에 '원'을 붙여야 한다.

for 문 버전을 보자.
```js
  const price = ['2000', '1000', '3000', '5000', '4000'];

  function getWonPrice(priceList) {
    let tmp = [];

    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i] > 2000) {
        tmp.push(priceList[i]);
      }
    }
    
    tmp.sort((a, b) => a - b);
    return tmp.map(item => item + '원');
  }

  getWonPrice(price);
```

이렇게 바꿔보자
```js
  const price = ['2000', '1000', '3000', '5000', '4000'];

  const suffixWon = price => price + '원';
  const isOverTwoThousnad = price => Number(price) > 2000;
  const ascendingList = (a,b) => a - b;

  function getWonPrice(priceList) {
    return priceList
      .filter(isOverTwoThousnad)
      .sort(ascendingList)
      .map(suffixWon)
  }

  getWonPrice(price);
```

자바스크립트에 탑재되어 있는 내장 매서드를 활용 + 메서드 체이닝을 활용해서 좀 더 선언적으로(= 직관적으로) 코드를 짤 수 있다.

## map VS forEach 
map은 원본배열을 조작하지 않고 새로운 배열을 return한다
 ㄴ 사용법 : 배열의 요소를 수정하여 "새로운 배열"을 만들고자 할때.
forEach는 배열을 return 하지 않는다.
 ㄴ 사용법 : 배열을 순회하면서 어떠한 동작을 하고자 할때.

## continue, break
continue, break문은 일부 배열매서드들(map, forEach)에서는 사용시 오류가 난다.(= 중간에 흐름을 제어하기 힘들다.)
그러면 어떻게 사용해야할까?

1. 전통적 for문, for in, for of문 등을 사용하면 오류가 나지 않는다.
2. every(), some(), find(), findIndex() 등을 사용하자.

## Computed Property Name

```js
  const funcName0 = 'func0';
  const funcName1 = 'func1';
  const funcName2 = 'func2';

  const obj = {
    [funcName0]() {
      return 'func0';
    },
    [funcName1]() {
      return 'func1';
    },
    [funcName2]() {
      return 'func2';
    },
  };

  for (let i = 0; i < 3; i++) {
    console.log(obj[`func${i}`]())
  }

```

## Lookup Table
```js
function getUserType(type) {
  const USER_TYPE = {
    ADMIN: '관리자',
    INSTRUCTOR: '강사',
    STUDENT: '수강생'
  };

  return USER_TYPE[type] || '해당없음';
}

getUserType();
```

## Object Destructuring
```js
const orders = ['First', 'Second', 'Third'];

const [first, _, third] = orders;
```
이렇게 하지말고
```js
  const {0: v_1, 2: v_2} = orders;

  console.log(v_1);
  console.log(v_2);
```
이렇게하자.

## Object.freeze

- Object.freeze(대상객체) => 대상객체를 얼린다 (수정을 하지 못하게 한다.)
- Object.isFrozen(대상객체) => 대상객체가 얼려있는지 확인 (수정하지 못하는 상태인지 확인하기)
- 하지만 Object.freeze는 one depth만 얼린다 (two depth 이상의 key:value는 얼리지 못한다.)

```js
const STATUS = Object.freeze({
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  OPTIONS: {
    GREEN: "GREEN",
    RED: "RED" 
  }
});

STATUS.OPTIONS.GREEN = "G";
STATUS.OPTIONS.YELLOW = "Y";
delete STATUS.OPTIONS.RED;
```

### 깊게 얼리기
1. 대중적인 유틸 라이브러리(lodash)
2. 직접 유틸 함수 생성
3. stackoverflow
4. TypeScript => readonly

```js
  function deepFreeze(targetObj) {
    // 1. 객체를 순회
    // 2. 값이 객체인지 확인
    // 3. 객체이면 재귀
    // 4. 그렇지 않으면 Object.freeze
    Object.keys(targetObj).forEach(key => {
      if () {
        deepFreeze(targetObj[key])
      }
    })
  }
```

### hasOwnProperty

```js
const foo = {
  hasOwnProperty: function() {
    return 'hasOwnProperty';
  },
  bar: 'string'
}

console.log(foo.hasOwnProperty('bar'));
console.log(Object.prototype.hasOwnProperty.call(foo, 'bar'));
```

ObjectName.hasOwnProperty(keyName) => ObjectName객체가 keyName이라는 key를 가지고 있는지 확인하는 매서드

이렇게 메서드로 활용해라
```js
function hasOwnProp(targetObj, targetProp) {
  return Object.prototype.hasOwnProperty.call(targetObj, targetProp);
}
```