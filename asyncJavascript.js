// setTimeout(() => console.log("Hello"), 0);
// setTimeout(() => console.log("How"), 400);
// setTimeout(() => console.log("Are"), 100);
// setTimeout(() => console.log("You"), 50);

// setTimeout(() => {console.log("CollegeDekho")}, 3000);
// setInterval(printName, 1000);

// function printName() {
//   console.log("CollegeDekho");
// }

// setTimeout(() => console.log("Harsh"), 0);
// setTimeout(() => console.log("Aman"), 500);
// setTimeout(() => console.log("Anjali"), 0);

// setTimeout(printName)

// const response = fetch("https://fakestoreapi.com/products");
// console.log(response);

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((result) => showData(result));

function showData(products) {
  products.forEach((product) => {
    console.log(product.title);
  });
}


// 1. Ecommerce assignment
// 2. Using async/await
// 3. Ternary Operator
// 4. Hoisting
// 5. DOM functions: document.querySelector, document.append
