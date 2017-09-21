function sum(arr, f) {
    // 함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 씁니다.
    if(typeof f != 'function') f = x => x;

    return arr.reduce((a, x) => a += f(x), 0);
}

function newSummer(f) {
    return arr => sum(arr, f);
}

const sumOfSquares = newSummer(x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));

console.log(sumOfSquares([1, 2, 3]));
console.log(sumOfCubes([1, 2, 3]));