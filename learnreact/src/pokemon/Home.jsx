import { useEffect, useState } from "react";
import "./pokemon.css";

async function fetchDataFromURL(url, nested = false) {
  let result;
  if (nested) {
    const response = await fetch(url);
    result = response.json();
  } else {
    const response = await fetch(url);
    result = await response.json();
  }
  return result;
}

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit} &offset=${offset}`;
  const typesUrl = "https://pokeapi.co/api/v2/type?limit=21";

  useEffect(() => {
    fetchPokemons();
    fetchTypes();
  }, []);

  function filterByType(e){
    
  }

  async function fetchPokemons() {
    const result = await fetchDataFromURL(url);
    const temp = result.results;

    const promises = temp.map(async (obj) => {
      const promise = await fetchDataFromURL(obj.url, true);
      return promise;
    });

    const data = await Promise.all(promises);
    setPokemons([...pokemons, ...data]);
  }

  async function fetchTypes() {
    const types = await fetchDataFromURL(typesUrl);
    setTypes(types.results);
  }

  console.log(pokemons);

  return (
    <>
      <header>
        <h1>Poke Universe</h1>
        <div className="info">
          <input type="text" placeholder="Search Pokemons..." />
          <select name="" id="" onChange={filterByType}>
            <option value="">Filter By Type</option>
            <option value="all">All Pokemons</option>
            {types.map((obj, index) => {
              return (
                <option key={index} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <main>
        {pokemons.map((obj) => {
          return (
            <div key={obj.id} className="pokediv">
              <img
                src={obj.sprites.other.dream_world.front_default}
                alt={obj.name}
              />
              <h3>{obj.name}</h3>
              <p>
                <strong>Type: </strong>
                {obj.types.map((obj) => obj.type.name).join(", ")}
              </p>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default Home;
