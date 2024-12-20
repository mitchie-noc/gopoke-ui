import { useState, useEffect } from "react";

const useFetchPokemon = (initialResponse = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (initialResponse === null) {
          setLoading(false);
          setData(null);
          return;
        }

        const detailedResults = await Promise.all(
          initialResponse.map(async (pokemon) => {
            const res = await fetch(
              `http://localhost:8080/api/v1/pokemon/${pokemon.name}`
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            const result = await res.json();
            result.id = pokemon.id;

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

        setData(detailedResults[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialResponse]); // Re-run when offset, limit, or initialResponse changes

  return { data, setData, loading, error }; // Return the single Pokémon object, loading, and error states
};

export default useFetchPokemon;
