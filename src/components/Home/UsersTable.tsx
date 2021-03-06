import React from 'react';
import TextHighlighter from '../TextHighlighter';
import { UsersListProps } from './Home';

function UsersTable({ users, nameFilter, companyFilter }: UsersListProps) {
  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead className="users-table__head">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="users-table__body">
          {users.map(({ id, name, username, company }) => (
            <tr key={`${username}-${id}`}>
              <td>{id}</td>
              <td>
                <TextHighlighter text={name} highlight={nameFilter} />
              </td>
              <td>
                <TextHighlighter
                  text={company.name}
                  highlight={companyFilter}
                />
              </td>
              <td>
                <a href={`/posts?userId=${id}`}>View Posts</a>
              </td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={4}>No users matching search term....</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
