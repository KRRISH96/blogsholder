import * as React from 'react';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../Loader/Loader';

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
  const {
    response: { data: comments },
    error,
    loading,
  } = useFetch<Comment[]>(`/posts/${postId}/comments`);

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="comments-container">
      <h4>Comments ({comments?.length ?? 0})</h4>
      {loading && <h4>Fetching Comments... Hang Tight!</h4>}
      {comments != null && (
        <ul className="comments-list">
          {comments.map(({ postId, id, name, body }) => (
            <li key={`${postId}-${id}`} className="comment-item">
              <p className="author">{name}</p>
              <p className="comment">{body}</p>
            </li>
          ))}
          {!loading && !comments.length && <li>No Comments Yet</li>}
        </ul>
      )}
    </div>
  );
}

export default Comments;
