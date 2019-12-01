// sunday01ex03_exports.js
// 객체를 생성하고 모듈로 등록한다.

var calc = {};
calc.minus = function(a, b) {
    return a - b;
}

// 외부에서 모듈로 사용하기 위해 모듈 객체에 추가한다.
// 외부 파일에서 이 파일을 상대경로로 require 한다.
module.exports = calc;

module.exports.sayHello2 = function() {
    console.log('Hello world2');
}
