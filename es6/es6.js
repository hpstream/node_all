/**
 * Created by hp on 2018-01-04.
 */

function* Generator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}
var g = Generator();

for(var i of g){
	console.log(i);
}

function* anotherGenerator(i) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}
function* generator(i){
	yield i;
	yield* anotherGenerator(i);
	yield i + 10;
}
var gen = generator(10);
console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
