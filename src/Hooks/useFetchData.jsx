import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading state is true when fetch begins
        const response = await fetch(url); // Await the fetch call
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json(); // Await the JSON conversion
        setData(result); // Set the fetched data
      } catch (err) {
        setError(err.message); // Catch and set the error
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
    fetchData();
  }, [url]); // Dependency array includes the URL

  return { data, loading, error }; // Return the state
};

export default useFetchData;
