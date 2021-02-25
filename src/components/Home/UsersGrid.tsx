import React from 'react';
import TextHighlighter from '../TextHighlighter';
import { UsersListProps } from './Home';

function UsersGrid({ users, nameFilter, companyFilter }: UsersListProps) {
  return (
    <div className="user-grid-container">
      <div className="user-cards__list">
        {users.map(({ id, name, username, company }) => (
          <div key={`${username}-${id}`} className="user-card card">
            <h3 className="user-name">
              <TextHighlighter text={name} highlight={nameFilter} />
            </h3>
            <p className="company-name">
              Company:{' '}
              <TextHighlighter text={company.name} highlight={companyFilter} />
            </p>
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
