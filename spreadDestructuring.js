// const num = [1, 3, 5];

// const n1 = 10;
// const n2 = 20;
// console.log(sum(...num));

// function sum(n1, n2, n3) {
//   return n1 + n2 + n3;
// }

// const n1 = [1, 2, 3];
// const n2 = [4, 5, 6];
// const n3 = [3, 2, 1];
// const n4 = [...n1, n2, ...n3];
// // console.log(n3[1] + n3[n3.length - 1][1]);
// // [1, 2, 3, [4, 5, 6], 3, 2, 1];

// let a = n4[n4.length - 1];
// let b = n4[0];
// let c = n4[3][1];

// console.log(++a + b++ + ++c);

// const p1 = { name: "Harsh", age: 22 };
// const p2 = { ...p1 };
// const p3 = { p1, ...p2 }; //{{ name: "Harsh", age: 22 }, name: "Rohit", age: 22 }
// p2.name = "Rohit";

// console.log(p3.name);

// const p1 = { name: "Chai" };
// const p2 = { name: "Coffee" };

// const p3 = { ...p2, ...p1 };

// console.log(p3.name);

//DESTRUCTURING

// let a;
// let b;
// let c;
// const arr = [10, 20, 30];
// a = arr[0];
// b = arr[1];
// c = arr[2];

// const arr = [10, 20, 30];
// let [a, b, c] = arr;
// console.log(a, b, c);

// const obj = { name: "Harsh", girlfriend: 1 };
// let { name, girlfriend } = obj;

// console.log(name, girlfriend);

// const [a, b, c, d, ...e] = [1, 2, 3, 4, 5, 6, [7, 8, 9]];
// console.log(e);

// let a = e[0];
// let b = e[e.length - 1][1];
// console.log(a++ + ++b);
// console.log(a + b + 3);
