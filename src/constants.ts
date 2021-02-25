// API
export const API_BASE_URL: string = "https://jsonplaceholder.typicode.com";

// Pagination
export const DEFAULT_PAGE: number = 1;
// Json Placeholder API results only 10 posts per user
// Setting limit to 3 to maximaze pagination usage
export const DEFAULT_COUNT_PER_PAGE: number = 3;
export const VALID_PAGINATION_PARAMS = ["page", "limit", "start", "end"];

// THEME
export const THEMES = Object.freeze({
  dark: "dark",
  light: "light",
  system: "system",
  auto: "auto",
});

export const THEME_PREFERENCE_KEY = "theme-preference";

export const HOUR_FROM_TIME_OF_DAY = Object.freeze({
  morning: 6,
  afternoon: 12,
  evening: 17,
  night: 19,
  midNight: 0,
});

// Layouts
export const LAYOUT_OPTIONS = {
  table: 'table',
  grid: 'grid'
}