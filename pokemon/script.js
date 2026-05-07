let limit = 20;
let offset = 0;
const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
const wrraper = document.querySelector("#pokemons");
const button = document.querySelector("button");
const input = document.querySelector("input");
let pokemonOnScreen = [];

// console.log(await getData(URL));

async function getData(URL) {
  const response = await fetch(URL);
  const result = await response.json();
  return result;
}

function Show_Data(abilites) {
  wrraper.innerHTML = "";
  abilites.forEach((obj) => {
    let card = document.createElement("div");
    let cardImage = document.createElement("img");
    let h2 = document.createElement("h2");
    let type = document.createElement("p");
    h2.classList.add("name");
    card.classList.add("card");
    type.classList.add("type");
    h2.innerText = obj.name;
    cardImage.src = obj.sprites.other.dream_world.front_default;
    type.innerHTML = `<strong>Type</strong>: ${obj.types[0].type.name}`;
    card.append(cardImage, h2, type);
    wrraper.append(card);
  });
}

//ENTRY POINT
window.addEventListener("load", async () => {
  const data = await getData(URL);
  const arr = data.results;
  // console.log(arr)
  const promises = arr.map((obj) => getData(obj.url));
  const abilites = await Promise.all(promises);
  pokemonOnScreen = [...abilites]; //Copying pokemons shown on screen in a global variable
  Show_Data(abilites);
});

button.addEventListener("click", async () => {
  offset = offset + limit;
  let load = await getData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  // console.log(load
  const promises = load.results.map((obj) => getData(obj.url));
  const abilites = await Promise.all(promises);

  Show_Data(abilites);
});

input.addEventListener("keyup", () => {
  const searchTerm = input.value;
  const result = pokemonOnScreen.filter((obj) => obj.name.includes(searchTerm));
  console.log(result);
  Show_Data(result);
});

// What is a runtime environment?
// Is node single threaded or multi? If single how are multiple tasks executed.
// Read about modules: http, path, fs, fs:async
// How to read data from files?
// How to write / modify data in files?
// How to create a server using express?
// Status codes: 200, 201, 300, 329, 400, 401, 403, 429, 500
// Status Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
// Get familiar with Postman / Thunderclient and Compass
