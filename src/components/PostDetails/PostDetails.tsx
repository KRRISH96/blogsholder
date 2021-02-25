import * as React from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../constants';
import { useFetch } from '../../hooks/useFetch';
import BackButton from '../BackButton';
import { Post } from '../Posts/Posts';
import TextHighlighter from '../TextHighlighter';
import Comments from './Comments';

interface ParamsData {
  id: string;
}

function PostDetails() {
  const { id } = useParams<ParamsData>();
  const history = useHistory();
  const [showComments, setShowComments] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {
    response: { data: postDetails },
    error,
    loading,
  } = useFetch<Post>(`/posts/${id}`);

  if (error) {
    return <h2>{error}</h2>;
  }

  const deletePost = async (postId: number) => {
    setDeleteLoading(true);
    const { status } = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    });

    if (status === 200) {
      history.push(`/posts?userId=${postDetails?.userId}`);
    } else {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
        placeholder="Search Term..."
        disabled={loading}
      />
      {!!searchText && (
        <button onClick={() => setSearchText('')}>x clear search term</button>
      )}
      {loading && <h2>Fetching Post Details... Hang Tight!</h2>}
      <p>
        <TextHighlighter
          text={postDetails?.title ?? ''}
          highlight={searchText}
        />
      </p>
      <p>
        <TextHighlighter
          text={postDetails?.body ?? ''}
          highlight={searchText}
        />
      </p>
      {postDetails?.id && (
        <button onClick={() => deletePost(postDetails.id)} disabled={loading}>
          {deleteLoading ? 'Deleting...' : 'Delete Post'}
        </button>
      )}
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
