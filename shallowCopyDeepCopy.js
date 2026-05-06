// Shallow copy: where both copies share the same source.
// Deep copy: where both copies have different sources.

// const p1 = { name: "Harsh", phone: 1234512345 };
// const p2 = p1; //SHALLOW

// // p2.name = "Anjali";
// p1.name = "Akash";

// console.log(p2.name);

// const p2 = JSON.parse(JSON.stringify(p1)); //DEEP
// const p3 = structuredClone(p1); //DEEP
// p2.name = "Anjali";
// console.log(p1.name);


const p1 = { name: "Harsh", age: 22 };
const p2 = { ...p1 }; //DEEP

p2.name = "Jignesh";
console.log(p1.name);
