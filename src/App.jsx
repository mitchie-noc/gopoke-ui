import { useState } from "react";
import useFetchPokemon from "./Hooks/useFetchPokemon";
import PokemonTiles from "./PokemonTiles/PokemonTiles";
import SearchBar from "./Search/SearchBar";
import ActivePokemon from "./ActivePokemon/ActivePokemon";
import "./index.css";

function App() {
  const [pokemonResources, setPokemonResources] = useState([]);
  const [activePokemonResource, setActivePokemonResources] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);
  const { data: pokemon, loading, error } = useFetchPokemon(
    offset,
    limit,
    null
  );
  const { data: activePokemon, l, e } = useFetchPokemon(
    null,
    null,
    activePokemonResource
  );

  const handleOnSearch = (term) => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/pokemon/search?term=${term}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the array");
        }
        const pokemonNames = await response.json();

        // Add a unique ID to each result
        const resultsWithId = pokemonNames.results.map((pokemon, index) => ({
          ...pokemon,
          id: index,
        }));

        setPokemonResources(resultsWithId);
      } catch (err) {
        // Handle error
        console.log("Oh no!", err);
      }
    };

    if (term.length > 0) {
      fetchData();
    } else {
      console.log("Not searching");
      setActivePokemonResources(null);
    }
  };

  const handleOnSelect = (items) => {
    setActivePokemonResources([items]);
  };

  const pokemonTileClicked = (event, name) => {
    setActivePokemonResources([
      {
        id: name.id,
        name: name.Name,
      },
    ]);
  };

  return (
    <>
      <div className="bg-cyan-100 flex flex-col text-slate-50">
        <div className="bg-cyan-900 flex justify-center">
          <h1 className="text-3xl font-bold underline center">PokeGo!</h1>
        </div>
        <div className="bg-cyan-900 flex justify-center text-slate-50">
          <h1 className="text-lg font-bold center">TODO: Nav bar</h1>
        </div>

        <SearchBar
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          items={pokemonResources}
        />

        {/* {activePokemon.length > 0 ? (
          <ActivePokemon pokemon={activePokemon} />
        ) : null} */}

        {activePokemon.length > 0 ? (
          <ActivePokemon pokemon={activePokemon} />
        ) : null}

        <PokemonTiles
          pokemon={pokemon}
          pokemonTileClicked={pokemonTileClicked}
        />
      </div>
    </>
  );
}

export default App;
