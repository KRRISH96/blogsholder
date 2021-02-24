import * as React from 'react';
import { API_BASE_URL } from '../constants';

interface FetchOptions {
  method?: string;
}

interface FetchResponseData<T> {
  response: Response<T>;
  error: string | null;
  loading: boolean;
}

interface Response<T> {
  data: T | null;
  totalCount?: number;
}

const DEFAULT_RESPONSE_STATE = {
  data: null
};

/**
 * @param endpoint endpoint to fetch data from.
 * @param options request options (method, header, body etc.,)
 */
export function useFetch<T>(endpoint: string, options:FetchOptions = {}): FetchResponseData<T> {
  const [response, setResponse] = React.useState<Response<T>>(DEFAULT_RESPONSE_STATE);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let didCancelFetch = false;

    // Resets the response and errors on subsequent calls
    setResponse(DEFAULT_RESPONSE_STATE);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const responseJson = await res.json();

        if (!didCancelFetch) {
          const updatedResponse: Response<T> = { data: responseJson }
          if (res.headers.get("X-Total-Count") != null) {
            updatedResponse.totalCount = Number(res.headers.get("X-Total-Count"))
          }

          setResponse(updatedResponse);
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
