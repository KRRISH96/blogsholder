import * as React from 'react';
import { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../constants';
import { useFetch } from '../../hooks/useFetch';
import BackButton from '../BackButton';
import { PostData } from '../Posts/Posts';
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
  } = useFetch<PostData>(`/posts/${id}`);

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
      <h2>
        <Link to="/">Users</Link>
        <span>{' > '}</span>
        <Link
          to={{
            pathname: '/posts',
            search: `?userId=${postDetails?.userId}`,
          }}
        >
          Posts
        </Link>
        <span>{' > '}</span>
        Post Details
      </h2>
      <div className="filters">
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
      </div>
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
        <button
          className="danger"
          onClick={() => deletePost(postDetails.id)}
          disabled={loading}
        >
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
