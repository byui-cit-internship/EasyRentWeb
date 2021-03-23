import { getApiRoot } from '../utils/UrlLogic.js';

export default (range = {}) => {
<<<<<<< HEAD
  const baseURL = 'http://localhost:4567/reservations';
=======
  const basURL = `${getApiRoot()}/reservations`;
>>>>>>> 04f0d506e50ad5865323d40c4e535abf9449ed2d
  let url = baseURL;
  if (Object.keys(range).length) {
    const params = Object.entries(range).map(([key, value]) => `${key}=${value}`).join('&')
    url += '?' + params;
  }
  return url;
};