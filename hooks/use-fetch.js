// Reuse this hooks for fetching api calls, no need to write code for all the api calls
//custom hooks are like function in js
import { useState } from "react";

//it takes a callback function
const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  //it will take additional arguments if user is providing
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      //provide arg to callback
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn };
};

export default useFetch;
