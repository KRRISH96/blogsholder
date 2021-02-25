import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../Loader/Loader';
import './homeStyles.scss';
import UsersTable from './UsersTable';

export interface UserData {
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
  const {
    response: { data: users },
    error,
    loading,
  } = useFetch<UserData[]>('/users');
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
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="home-page">
      <h2>Users</h2>
      <div className="filters">
        <input
          type="text"
          value={nameFilter}
          onChange={({ target }) => setNameFilter(target.value)}
          placeholder="Filter By Name..."
          disabled={loading}
        />
        <input
          type="text"
          value={companyFilter}
          onChange={({ target }) => setCompanyFilter(target.value)}
          placeholder="Filter By Company..."
          disabled={loading}
        />
        {(!!nameFilter || !!companyFilter) && (
          <button onClick={clearFilters}>x clear filters</button>
        )}
      </div>
      {loading && <Loader statusText="Fetching Users..." />}
      <UsersTable
        users={filteredUsers}
        nameFilter={nameFilter}
        companyFilter={companyFilter}
      />
    </div>
  );
}

export default Home;
