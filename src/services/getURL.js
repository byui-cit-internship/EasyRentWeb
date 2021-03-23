import { getApiRoot } from '../utils/UrlLogic';

export default (range = {}) => {
  const baseURL = `${getApiRoot()}/reservations`;
  let url = baseURL;
  if (Object.keys(range).length) {
    const params = Object.entries(range).map(([key, value]) => `${key}=${value}`).join('&')
    url += '?' + params;
  }
  return url;
}