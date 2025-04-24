import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(autoFetch);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  return { data, error, loading, refatch: fetchData, reset };
};
export default useFetch;
