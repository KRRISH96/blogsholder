import * as React from 'react';
import { useFetch } from '../../hooks/useFetch';

interface User {
  id: number;
  name: string;
  username: string;
  company: Company;
}

interface Company {
  id: number;
  name: string;
}

function Home() {
  const { response: users, error, loading } = useFetch<User>('/users');

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {users !== null &&
        users.map(({ id, name, username, company }) => (
          <div key={`${username}-${id}`}>
            <span>{name}</span>-<span>{company.name}</span>
          </div>
        ))}
    </div>
  );
}

export default Home;
