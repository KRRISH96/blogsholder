import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useFetch } from '../../hooks/useFetch';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const queryParams = useQueryParams();
  const userId = queryParams.get('userId');
  const [titleFilter, setTitleFilter] = useState('');

  const { response: posts, error, loading } = useFetch<Post>(
    `/posts?userId=${userId}`
  );

  const initialPosts = useMemo(() => posts ?? [], [posts]);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  const clearFilters = () => {
    setTitleFilter('');
    setFilteredPosts(initialPosts);
  };

  useEffect(() => {
    if (!titleFilter) {
      setFilteredPosts(initialPosts);
      return;
    }

    let filteredPostList = initialPosts;
    if (!!titleFilter) {
      filteredPostList = filteredPostList.filter(({ title }) =>
        title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    setFilteredPosts(filteredPostList);
  }, [titleFilter, initialPosts]);

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <div>
        <input
          value={titleFilter}
          onChange={({ target }) => setTitleFilter(target.value)}
          placeholder="Filter By Title..."
          disabled={loading}
        />
        {!!titleFilter && (
          <button onClick={clearFilters}>x clear filters</button>
        )}
      </div>
      {loading && <h2>Fetching Posts... Sit Tight!</h2>}
      <ul>
        {filteredPosts.map(({ userId, id, title }) => (
          <li key={`${userId}-${id}`}>
            <p>
              <a href={`/posts/${id}`}>{title}</a>
            </p>
          </li>
        ))}
        {!filteredPosts.length && <li>No posts matching search term....</li>}
      </ul>
    </div>
  );
}

export default Posts;