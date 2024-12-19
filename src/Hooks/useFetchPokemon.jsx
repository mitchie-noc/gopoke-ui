import { useState, useEffect } from "react";

const useFetchPokemon = (offset, limit, initialResponse = null) => {
  const [data, setData] = useState(null); // This will hold the single Pokémon
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = [];

        // If no valid offset, limit, or initial response, stop early
        if (offset === null && limit === null && initialResponse === null) {
          setLoading(false);
          setData(null);
          return;
        }

        if (initialResponse) {
          // Use initial response data if available
          results = initialResponse;
        } else {
          // Fetch the list of Pokémon with offset and limit
          const response = await fetch(
            `http://localhost:8080/api/v1/pokemon?offset=${offset}&limit=${limit}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch the list of Pokémon");
          }
          const result = await response.json();
          results = result.results;
        }

        // Fetch detailed data for each Pokémon
        const detailedResults = await Promise.all(
          results.map(async (pokemon) => {
            const res = await fetch(
              `http://localhost:8080/api/v1/pokemon/${pokemon.name}`
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            const result = await res.json();
            result.id = pokemon.id;

            // Sort the stats based on custom order
            const customOrder = [
              "hp",
              "attack",
              "defense",
              "speed",
              "special-defense",
              "special-attack",
            ];

            result.Stats.sort((a, b) => {
              return customOrder.indexOf(a.Name) - customOrder.indexOf(b.Name);
            });

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

        // Return only the first Pokémon from the array
        setData(detailedResults[0]); // Set only the first item of the array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, limit, initialResponse]); // Re-run when offset, limit, or initialResponse changes

  return { data, setData, loading, error }; // Return the single Pokémon object, loading, and error states
};

export default useFetchPokemon;
