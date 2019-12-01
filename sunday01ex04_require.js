// sunday01ex04_require.js
// 사용자 정의된 모듈파일을 상대경로로 require한다.
var calc = require('./sunday01ex03_exports')

console.log("calc.minus(10, 3) => ",calc.minus(10, 3));

// Nodejs에서는 변수, 함수, 객체, 클래스를 모두 모듈로 만들 수 있다.
var sayHello = require('./sunday01ex03_exports2').sayHello;
sayHello()

calc.sayHello2();
// 모듈에는 사용자 정의모듈, 내장모듈, 외장모듈이 있다.
