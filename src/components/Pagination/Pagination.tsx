import * as React from 'react';
import { DEFAULT_COUNT_PER_PAGE } from '../../constants';

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  handleChangePage: (page: number) => void;
  handlePostsPerPageChange: (limit: number) => void;
  loading: boolean;
}

function Pagination({
  page,
  limit,
  total,
  handleChangePage,
  handlePostsPerPageChange,
}: PaginationData) {
  const start = (page - 1) * limit + 1;
  const end = Math.min(start - 1 + limit, total);
  return (
    <div>
      <label>
        Posts Per Page:
        <input
          type="number"
          min="1"
          step="1"
          max={total || 1}
          value={limit || DEFAULT_COUNT_PER_PAGE}
          onChange={({ target }) =>
            handlePostsPerPageChange(
              Number(target.value ?? DEFAULT_COUNT_PER_PAGE)
            )
          }
          disabled={limit < 1}
        />
      </label>
      <span>
        Showing&nbsp;{start} - {end}
      </span>{' '}
      of{' '}
      <span>
        <b>{total}</b>
      </span>
      <button onClick={() => handleChangePage(page - 1)} disabled={start <= 1}>
        prev
      </button>
      <button
        onClick={() => handleChangePage(page + 1)}
        disabled={end >= total}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
