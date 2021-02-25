import React from 'react';
import TextHighlighter from '../TextHighlighter';
import { PostData } from './Posts';

interface PostsListProps {
  posts: PostData[];
  titleFilter: string;
}
function PostsList({ posts, titleFilter }: PostsListProps) {
  return (
    <div className="posts-list">
      <ul>
        {posts.map(({ userId, id, title }) => (
          <li key={`${userId}-${id}`}>
            <a href={`/posts/${id}`}>
              <TextHighlighter text={title} highlight={titleFilter} />
            </a>
          </li>
        ))}
        {!posts.length && <li>No posts matching search term....</li>}
      </ul>
    </div>
  );
}

export default PostsList;
