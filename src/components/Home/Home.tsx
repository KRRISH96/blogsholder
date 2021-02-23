import * as React from 'react';
import { useState, useEffect } from 'react';
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
  const [nameFilter, setNameFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const { response: users, error, loading } = useFetch<User>('/users');

  const clearFilters = () => {
    setNameFilter('');
    setCompanyFilter('');
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <div>
        <input
          value={nameFilter}
          onChange={({ target }) => setNameFilter(target.value)}
          placeholder="Filter By Name..."
          disabled={loading}
        />
        <input
          value={companyFilter}
          onChange={({ target }) => setCompanyFilter(target.value)}
          placeholder="Filter By Company..."
          disabled={loading}
        />
        {(!!nameFilter || !!companyFilter) && (
          <button onClick={clearFilters}>x clear filters</button>
        )}
      </div>
      {loading && <h2>Fetching Users... Sit Tight!</h2>}
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
