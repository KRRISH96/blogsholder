import React from 'react';
import TextHighlighter from '../TextHighlighter';
import { PostData } from './Posts';

interface PostsListProps {
  posts: PostData[];
  titleFilter: string;
}
function PostsList({ posts, titleFilter }: PostsListProps) {
  return (
    <ul className="posts-list">
      {posts.map(({ userId, id, title }) => (
        <li key={`${userId}-${id}`} className="posts-list__item">
          <a href={`/posts/${id}`} className="posts-list__item-link">
            <TextHighlighter text={title} highlight={titleFilter} />
          </a>
        </li>
      ))}
      {!posts.length && (
        <li className="posts-list__item no-items">
          No posts matching search term....
        </li>
      )}
    </ul>
  );
}

export default PostsList;
