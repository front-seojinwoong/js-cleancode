
function testFn() {
  return Array.from(arguments).map(el => el + '월');
}

const returnValues = testFn(1, 2, 555, 323, 'asb');
console.log(returnValues);