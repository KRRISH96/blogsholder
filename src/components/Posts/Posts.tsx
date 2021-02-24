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

  const urlQueryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const paginationQueryParams = useMemo(() => {
    return getPaginationQueryParams(urlQueryParams);
  }, [urlQueryParams]);

  const userId = urlQueryParams.get('userId');

  const {
    response: { data: posts, totalCount },
    error,
    loading,
  } = useFetch<Post[]>(
    `/users/${userId}/posts?${generatePaginationQueryString(
      paginationQueryParams
    )}`
  );

  const initialPosts = useMemo(() => posts ?? [], [posts]);
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

  const handlePostPerPageChange = (postsPerPage: number) => {
    urlQueryParams.set('limit', `${postsPerPage}`);

    // Switch to default page 1
    handleChangePage(1);
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  const end =
    Number(paginationQueryParams.page) * Number(paginationQueryParams.limit);
  const start = end - Number(paginationQueryParams.limit) + 1;

  return (
    <div>
      <div>
        <input
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
              <a href={`/posts/${id}`}>{title}</a>
            </p>
          </li>
        ))}
        {!filteredPosts.length && <li>No posts matching search term....</li>}
      </ul>
      <label>
        Posts Per Page:
        <input
          type="number"
          min="1"
          step="1"
          max={totalCount || 1}
          defaultValue={DEFAULT_COUNT_PER_PAGE}
          onChange={({ target }) =>
            handlePostPerPageChange(
              Number(target.value ?? DEFAULT_COUNT_PER_PAGE)
            )
          }
        />
      </label>
      <div>
        <span>
          Showing&nbsp;{start} - {end}
        </span>{' '}
        of{' '}
        <span>
          <b>{totalCount}</b>
        </span>
        <button
          onClick={() =>
            handleChangePage(Number(paginationQueryParams.page) - 1)
          }
          disabled={start === 1}
        >
          prev
        </button>
        <button
          onClick={() =>
            handleChangePage(Number(paginationQueryParams.page) + 1)
          }
          disabled={end === totalCount}
        >
          next
        </button>
      </div>
      <br />
      <BackButton />
    </div>
  );
}

export default Posts;
