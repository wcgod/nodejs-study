// sunday01ex01.js

console.log('Hello Nodejs world');
name = "홍길동";
console.log(`안녕하세요? ${name}님^^`);

const ARR = ['오징어','꼴뚜기','대구','명태','거북이'];
console.log('친구들 목록');
for (friend of ARR) {
    console.log("---->"+friend);
}

console.log("나이 : %d", 20);
console.log("문자열 : %s", "은평구 응암동");
console.log("JSON 객체 : %j", {name:"캔디",msg:"안울어!"});

console.log("나이 : ", 20);
console.log("문자열 : ", "은평구 응암동");
console.log("JSON 객체 : ", {name:"캔디",msg:"안울어!"});
