import * as React from 'react';
import { DEFAULT_COUNT_PER_PAGE } from '../../constants';
import './paginationStyles.scss';

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
    <div className="pagination-container">
      <div className="per-page-limit">
        <label htmlFor="perPageLimit" className="per-page-limit__label">
          <input
            id="perPageLimit"
            className="per-page-limit__input"
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
          <span>{'/ Page'}</span>
        </label>
      </div>
      <div className="page-meta-data">
        <div className="page-meta-data__info">
          <span className="page-meta-data__bounds">
            <b>
              {start}&nbsp;&minus;&nbsp;{end}
            </b>
          </span>
          &nbsp;of&nbsp;
          <span className="page-meta-data__total">
            <b>{total}</b>
          </span>
        </div>
        <div className="page-meta-data__navigators">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={start <= 1}
            className="prev"
          >
            prev
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={end >= total}
            className="next"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
