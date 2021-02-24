import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Post } from '../Posts/Posts';

interface ParamsData {
  id: string;
}

function PostDetails() {
  const { id } = useParams<ParamsData>();
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
      <a href={`/posts?userId=${postDetails?.userId}`}>Back to Posts</a>
    </div>
  );
}

export default PostDetails;
