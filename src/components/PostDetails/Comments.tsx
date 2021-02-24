import * as React from 'react';
import { useFetch } from '../../hooks/useFetch';

interface Props {
  postId: number;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function Comments({ postId }: Props) {
  const { response: comments, error, loading } = useFetch<Comment[]>(
    `/comments?postId=${postId}`
  );

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {loading && <h4>Fetching Comments... Hang Tight!</h4>}
      <h4>Comments</h4>
      <ul>
        {comments?.map(({ postId, id, name, body }) => (
          <li key={`${postId}-${id}`}>
            <p>{name}</p>
            <p>{body}</p>
          </li>
        ))}
        {!comments?.length && <li>No Comments Yet</li>}
      </ul>
    </div>
  );
}

export default Comments;
