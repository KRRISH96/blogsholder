import { VALID_PAGINATION_PARAMS, DEFAULT_PAGE, DEFAULT_COUNT_PER_PAGE } from "./constants";

interface PaginationDataParams {
  page: number;
  limit: number;
}

export const getPaginationQueryParams = (urlParams: URLSearchParams): PaginationDataParams => {
  const obj: any = Array.from(urlParams)
    .filter((param) => VALID_PAGINATION_PARAMS.includes(param[0]))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const keys = Object.keys(obj);

  if (!keys.includes("page")) {
    obj.page = DEFAULT_PAGE;
  }

  if (!keys.includes("limit")) {
    obj.limit = DEFAULT_COUNT_PER_PAGE;
  }

  return obj as PaginationDataParams;
};

export function generatePaginationQueryString<T>(obj: T): string {
  return Object.entries(obj)
    .map(([key, value]) => `_${key}=${value}`)
    .join("&");
}