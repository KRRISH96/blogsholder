import { VALID_PAGINATION_PARAMS, DEFAULT_PAGE, DEFAULT_COUNT_PER_PAGE, HOUR_FROM_TIME_OF_DAY } from "./constants";


interface DynamicQueryParamsObject extends Record<string, string | number> {};
interface PaginationDataParams extends DynamicQueryParamsObject {
  page: number;
  limit: number;
}


export const getPaginationQueryParams = (urlParams: URLSearchParams) => {
  const obj: DynamicQueryParamsObject = Array.from(urlParams)
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

// Theme
/**
 * @returns {Number} current hour of the day
 */
export function getCurrentHours():number {
  return new Date().getHours();
}
/**
 * @returns {Boolean} if the current time is day or not from pre defined hours range
 */
export function isDayTime(): boolean {
  const hourOfTheDay = getCurrentHours();
  // 7am to 6:59pm
  return (
    hourOfTheDay > HOUR_FROM_TIME_OF_DAY.morning &&
    hourOfTheDay < HOUR_FROM_TIME_OF_DAY.night
  );
}
