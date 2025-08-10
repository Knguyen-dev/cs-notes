import { useState, useEffect } from "react";
export default function useDataFetching(dataSource) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Url of our fetch reequest passed through props
        const response = await fetch(props.dataSource);
        const json = await response.json();

        if (json) {
          setIsLoading(false);
          setData(json);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [dataSource]);

  return { isLoading, data, error };
}
