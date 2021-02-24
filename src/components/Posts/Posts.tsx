import * as React from 'react';
import { useMemo } from 'react';
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
  const { response: posts, error, loading } = useFetch<Post>(
    `/posts?userId=${userId}`
  );

  const initialPosts = useMemo(() => posts ?? [], [posts]);

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {loading && <h2>Fetching Posts... Sit Tight!</h2>}
      <ul>
        {initialPosts.map(({ userId, id, title }) => (
          <li key={`${userId}-${id}`}>
            <p>
              <a href={`/posts/${id}`}>{title}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
