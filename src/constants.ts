// API
export const API_BASE_URL: string = "https://jsonplaceholder.typicode.com";

// Pagination
export const DEFAULT_PAGE: number = 1;
// Json Placeholder API results only 10 posts per user
// Setting limit to 3 to maximaze pagination usage
export const DEFAULT_COUNT_PER_PAGE: number = 3;
export const VALID_PAGINATION_PARAMS = ["page", "limit", "start", "end"];