import * as React from 'react';
import { API_BASE_URL } from '../constants';

interface FetchOptions {
  method?: string;
}

interface FetchResponseData<T> {
  response: T | null;
  error: string | null;
  loading: boolean;
}

/**
 * @param endpoint endpoint to fetch data from.
 * @param options request options (method, header, body etc.,)
 */
export function useFetch<T>(endpoint: string, options:FetchOptions = {}): FetchResponseData<T> {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let didCancelFetch = false;

    // Resets the response and errors on subsequent calls
    setResponse(null);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const responseJson = await res.json();

        if (!didCancelFetch) {
          setResponse(responseJson);
        }
      } catch (err) {
        setError(err || 'Something went wrong!');
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      didCancelFetch = true;
    };
  }, [endpoint]);

  return { response, error, loading };
}
