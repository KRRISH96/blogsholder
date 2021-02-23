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
      {users !== null && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, username, company }) => (
              <tr key={`${username}-${id}`}>
                <td>{name}</td>
                <td>{company.name}</td>
                <td>
                  <a href={`/posts?userId=${id}`}>View Posts</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
