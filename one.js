function one(str, num) {
  console.log(str.length + num);
}
one("india", 5);

(function (x, f = () => x) {
  var x;
  var y = x;
  x = 5;
  console.log([x, y, f()]);
})(5 / 2);

{
  var gVar = "hi";
}
{
  let glet = "bye";
}

console.log(gVar);
// console.log(glet);

function* another(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* another(i);
  yield i + 10;
}
var gen = generator(10);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
