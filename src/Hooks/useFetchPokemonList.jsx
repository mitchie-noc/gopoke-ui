import { useState, useEffect } from "react";

const useFetchPokemonList = (offset, limit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (offset === null && limit === null) {
          setLoading(false);
          setData([]);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/v1/pokemon?offset=${offset}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the list of Pokémon");
        }

        const list = await response.json();
        if (list.results.length === 0) {
          throw new Error("No Pokémon found.");
        }

        const detailedResults = await Promise.all(
          list.results.map(async (pokemon) => {
            const res = await fetch(
              `http://localhost:8080/api/v1/pokemon/${pokemon.name}`
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            const result = await res.json();
            return {
              ...result,
              pokemonStatTraining: [
                { name: "hp", iv: 0, ev: 0, nature: 1.0, active: true },
                { name: "attack", iv: 0, ev: 0, nature: 1.0, active: false },
                { name: "defense", iv: 0, ev: 0, nature: 1.0, active: false },
                { name: "speed", iv: 0, ev: 0, nature: 1.0, active: false },
                {
                  name: "special-defense",
                  iv: 0,
                  ev: 0,
                  nature: 1.0,
                  active: false,
                },
                {
                  name: "special-attack",
                  iv: 0,
                  ev: 0,
                  nature: 1.0,
                  active: false,
                },
              ],
              activeNature: {},
              activeAbility: {},
              activeItem: {},
              pokemonLevel: 50,
            };
          })
        );

        setData(detailedResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, limit]);

  return { data, loading, error };
};

export default useFetchPokemonList;
