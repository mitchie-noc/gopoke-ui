import { useState, useEffect } from "react";
import PokemonTile from "./PokemonTile";

export default function PokemonTiles() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/pokemon?offset=330&limit=25"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the array");
        }
        const pokemonNames = await response.json();

        const results = await Promise.all(
          pokemonNames.results.map(async (pokemon) => {
            const res = await fetch(
              `http://localhost:8080/api/v1/pokemon/${pokemon.name}`
            );
            if (!res.ok) {
              // TODO error handling
              throw new Error(
                `Failed to fetch details for item ${pokemon.name}`
              );
            }
            return res.json();
          })
        );

        setTiles(results);
      } catch (err) {
        // TODO error handling
        console.log("Oh no!", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row w-100 bg-gray-800 flex-wrap">
      {tiles.map((pok) => (
        <PokemonTile
          name={pok.Name}
          sprite={pok.Sprite}
          types={pok.Types}
          key={pok.Name}
        />
      ))}
    </div>
  );
}
