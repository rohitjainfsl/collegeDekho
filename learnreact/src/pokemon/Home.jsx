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
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit} &offset=${offset}`;
  const typesUrl = "https://pokeapi.co/api/v2/type?limit=21";

  useEffect(() => {
    fetchPokemons();
    fetchTypes();
  }, []);

  function filterByType(e) {
    setFilteredPokemons([]);
    const copy = [...pokemons];
    const selectedType = e.target.value;
    if (selectedType === "all") {
      console.log(pokemons);
      setPokemons(pokemons);
    } else {
      //     const filteredPokemons = copy.map((obj) =>
      //       obj.types.filter((pokemons,index) =>
      //         pokemons.type.name  === selectedType

      // ),
      //     );
      // setPokemons( "")

      const filteredPok = [];
      for (let i = 0; i < copy.length; i++) {
        const typesArray = copy[i].types;
        for (let j = 0; j < typesArray.length; j++) {
          if (typesArray[j].type.name === selectedType) {
            filteredPok.push(copy[i]);
          }
        }
      }

      setFilteredPokemons(filteredPok);

      console.log(filteredPok);
    }
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

  function searchPokemon(e) {
    const search = e.target.value.toLowerCase();

    setSearch(search);
    const filtered = pokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(search);
    });

    console.log(searchPokemon);
    setFilteredPokemons(filtered);

    // for (let i = 0; i < pokemons.length; i++) {
    //   const targetValue = pokemons[i].name;
    //   for (let j = 0; j < targetValue.length; j++) {
    //     console.log(search);
    //   }
    // }
  }

  console.log(pokemons);

  return (
    <>
      <header>
        <h1>Poke Universe</h1>
        <div className="info">
          <input
            type="text"
            placeholder="Search Pokemons..."
            value={search}
            onChange={searchPokemon}
          />
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
        {filteredPokemons.length > 0
          ? filteredPokemons.map((obj) => {
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
            })
          : pokemons.map((obj) => {
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
