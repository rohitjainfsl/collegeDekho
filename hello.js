// let value = document.querySelector("input");
// let button = document.querySelector("button");
// button.addEventListener("click", printname);
// function printname() {
//   let para = document.createElement("p");
//   para.innerText = value.value;
//   document.body.append(para);
// }

// let x = 1;
// for (let i = 1; i <= 5; i++) {
//   for (let j = i + 1; j <= 5; j++) {
//     x++;
//   }
// }
// console.log(x);

// let x = 1;
// for (let i = 1; i <= 5; i++) {
//   for (let j = i + 1; j <= 5; j++) {
//     x = x + i;
//   }
// }
// console.log(x);

// function mapArray(array, callback) {
//   const mappedArray = [];
//   for (let element of array) {
//     mappedArray.push(callback(element));
//   }
//   return mappedArray;
// }

// function double(num) {
//   return num * 2;
// }
// const numbers = [1, 2, 3, 4, 5];
// console.log(mapArray(numbers, double));

// function a(num, p) {
//   if (p < 10) {
//     return (num * num) / p;
//   } else {
//     return num * num;
//   }
// }
// function b(x, y) {
//   if ((x + y) % 2 === 0) {
//     return x * y;
//   } else return x * y + 1;
// }
// console.log(a(b(12, 6), 4));

// const num = [2, 3, 4, 5];
// let a = num.pop();
// num.push(++a);
// num.unshift(num.pop());
// let b = num.shift();
// let c = num.shift();
// num.unshift(b + c);
// console.log(num[0] + num[1]);

// const names = ["Akash", "Priyansh", "Anjali"];
// let a = names.unshift("Harsh");
// let b = names.push("Jignesh", "Farhan");
// let c = names.push(a++, b++);
// console.log(a++ + b++ + c++);

// let x = 0;
// console.log(x++); //0
// console.log(++x); //2
// console.log(--x); //1
// console.log(x--); //1
// console.log(x); //0

//Higher Order Functions:
//  - works on arrays
//  - takes 1st argument a function
//  - might return an array
// forEach, map, reduce, filter, some, every, find, findIndex

// const num = [1, 2, 3];
// let newArr = [];
// for (let i = 0; i < num.length; i++) {
//   newArr.push(num[i] * 2);
// }
// console.log(newArr);

// const num = [1, 2, 3];

// const newArr = num.map(double);
// console.log(newArr);
// console.log(num); // HOF creates a copy of original

// function double(n) {
//   return n * 2;
// }

// map always returns the same number of values as in the original array

// const num = [23, 45, 1, 66, 24, 56, 67];
// const result = num.filter(findEven);
// console.log(result);

// function findEven(n) {
//   return n % 2 === 1;
// }

//tpircSavaJ
// let str = "JavaScript";
// let output = str.split('').reverse().join('').slice(0, -3).toUpperCase();
// console.log(output);

// const num = [1, 3, 5, 7, 9];
// const output = num.reduce(findSum, 0);
// function findSum(a, b) {
//   return a * b;
// }
// console.log(output);

// let x = 11;
// if (x % 2 === 0) {
//   console.log("Shaktiman");
// } else {
//   console.log("Gangadhar");
// }
// console.log(x % 2 === 0 ? "Shaktiman" : "Gangadhar");

// ANONYMOUS FUNCTION: these have to be called where they are defined

// const names = ["Farhan", "Tanishq", "Akash"];
// const num = [2, 4, 6, 7, 8, 9];

// const difference = num.reduce(someFunction);

// const difference = num.reduce((n1, n2) => {
//   return n1 - n2;
// });
// console.log(difference);


// String Functions: indexOf, lastIndexOf, slice, substring, split
// Arrow Functions: push, pop, shift, unshift, splice, slice, join
// for..of loop
// Objects: Object.keys(), Object.values(), Object.entries()
// Object.assign(), Object.seal(), Object.freeze()
// Shallow Copy, Deep Copy
// Spread, Destructuring



