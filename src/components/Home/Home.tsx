import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
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
  const initialUsers = useMemo(() => users ?? [], [users]);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

  const clearFilters = () => {
    setNameFilter('');
    setCompanyFilter('');
    setFilteredUsers(initialUsers);
  };

  useEffect(() => {
    if (!nameFilter && !companyFilter) {
      setFilteredUsers(initialUsers);
      return;
    }

    let filteredUserList = initialUsers;
    if (!!nameFilter) {
      filteredUserList = filteredUserList.filter(({ name }) =>
        name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (!!companyFilter) {
      filteredUserList = filteredUserList.filter(({ company: { name } }) =>
        name.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    setFilteredUsers(filteredUserList);
  }, [nameFilter, companyFilter, initialUsers]);

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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(({ id, name, username, company }) => (
            <tr key={`${username}-${id}`}>
              <td>{name}</td>
              <td>{company.name}</td>
              <td>
                <a href={`/posts?userId=${id}`}>View Posts</a>
              </td>
            </tr>
          ))}
          {!filteredUsers.length && (
            <tr>
              <td colSpan={3}>No users matching search term....</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
