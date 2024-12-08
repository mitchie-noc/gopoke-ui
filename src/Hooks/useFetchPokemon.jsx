import { useState, useEffect } from "react";

const useFetchPokemon = (offset, limit, initialResponse = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = [];

        if (offset === null && limit === null && initialResponse === null) {
          setLoading(false);
          setData([]);
          return;
        }

        if (initialResponse) {
          // Use initial response (no need to make the first HTTP request)
          results = initialResponse;
        } else {
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
            const result = res.json();
            result.id = pokemon.id;
            return result;
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
  }, [offset, limit, initialResponse]); // Re-run when offset, limit, or initialResponse changes

  return { data, loading, error }; // Return fetched data, loading, and error states
};

export default useFetchPokemon;
