import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import BackButton from '../BackButton';
import { useHistory, useLocation } from 'react-router-dom';
import {
  generatePaginationQueryString,
  getPaginationQueryParams,
} from '../../utils';
import { DEFAULT_COUNT_PER_PAGE, DEFAULT_PAGE } from '../../constants';
import Pagination from '../Pagination/Pagination';
import TextHighlighter from '../TextHighlighter';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const [titleFilter, setTitleFilter] = useState('');
  const history = useHistory();
  const location = useLocation();

  // Query Params
  const urlQueryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const paginationQueryParams = useMemo(() => {
    return getPaginationQueryParams(urlQueryParams);
  }, [urlQueryParams]);

  // Data Load
  const userId = urlQueryParams.get('userId');
  const {
    response: { data: posts, totalCount = 0 },
    error,
    loading,
  } = useFetch<Post[]>(
    `/users/${userId}/posts?${generatePaginationQueryString(
      paginationQueryParams
    )}`
  );
  const initialPosts = useMemo(() => posts ?? [], [posts]);

  // Filters
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

  // Pagination
  const updateURL = () => {
    // Remove page param for default page
    if (urlQueryParams.get('page') === `${DEFAULT_PAGE}`) {
      urlQueryParams.delete('page');
    }
    // Remove limit param for default limit
    if (urlQueryParams.get('limit') === `${DEFAULT_COUNT_PER_PAGE}`) {
      urlQueryParams.delete('limit');
    }
    history.push({
      pathname: location.pathname,
      search: `?${urlQueryParams}`,
    });
  };

  const handleChangePage = (page: number) => {
    urlQueryParams.set('page', `${page}`);
    updateURL();
  };

  const handlePostsPerPageChange = (postsPerPage: number) => {
    // if postPerPage is 0 use the default count
    urlQueryParams.set('limit', `${postsPerPage || DEFAULT_COUNT_PER_PAGE}`);

    // Switch to default page 1
    handleChangePage(1);
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <input
          type="text"
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
              <a href={`/posts/${id}`}>
                <TextHighlighter text={title} highlight={titleFilter} />
              </a>
            </p>
          </li>
        ))}
        {!filteredPosts.length && <li>No posts matching search term....</li>}
      </ul>
      <Pagination
        page={Number(paginationQueryParams.page)}
        limit={Number(paginationQueryParams.limit)}
        total={totalCount}
        handleChangePage={handleChangePage}
        handlePostsPerPageChange={handlePostsPerPageChange}
        loading={loading}
      />
      <br />
      <BackButton />
    </div>
  );
}

export default Posts;
