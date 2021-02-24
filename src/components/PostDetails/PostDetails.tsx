import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import BackButton from '../BackButton';
import { Post } from '../Posts/Posts';
import Comments from './Comments';

interface ParamsData {
  id: string;
}

function PostDetails() {
  const { id } = useParams<ParamsData>();
  const [showComments, setShowComments] = useState(false);
  const { response: postDetails, error, loading } = useFetch<Post>(
    `/posts/${id}`
  );

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {loading && <h2>Fetching Post Details... Hang Tight!</h2>}
      <p>{postDetails?.title}</p>
      <p>{postDetails?.body}</p>
      {showComments ? (
        <Comments postId={Number(id)} />
      ) : (
        <button onClick={() => setShowComments(true)} disabled={loading}>
          View Comments
        </button>
      )}
      <br />
      <BackButton />
    </div>
  );
}

export default PostDetails;
