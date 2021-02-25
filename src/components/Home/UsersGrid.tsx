import React from 'react';
import TextHighlighter from '../TextHighlighter';
import { UsersListProps } from './Home';

function UsersGrid({ users, nameFilter, companyFilter }: UsersListProps) {
  return (
    <div className="user-cards-container">
      <div className="user-cards__list">
        {users.map(({ id, name, username, company }) => (
          <div key={`${username}-${id}`} className="card">
            <span className="user-name">
              <TextHighlighter text={name} highlight={nameFilter} />
            </span>
            <span className="company-name">
              <TextHighlighter text={company.name} highlight={companyFilter} />
            </span>
            <span className="user-posts-link">
              <a href={`/posts?userId=${id}`}>View Posts</a>
            </span>
          </div>
        ))}
        {!users.length && <h3>No users matching search term....</h3>}
      </div>
    </div>
  );
}

export default UsersGrid;
