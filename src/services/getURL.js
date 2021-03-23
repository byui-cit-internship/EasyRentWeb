import { getApiRoot } from '../utils/UrlLogic.js';

export default (range = {}) => {
  const basURL = `${getApiRoot()}/reservations`;
  let url = baseURL;
  if (Object.keys(range).length) {
    const params = Object.entries(range).map(([key, value]) => `${key}=${value}`).join('&')
    url += '?' + params;
  }
  return url;
};