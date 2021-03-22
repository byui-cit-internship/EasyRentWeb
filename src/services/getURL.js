export default (range = {}) => {
  const baseURL = 'https://easyrent-api-dev.cit362.com/reservations';
  let url = baseURL;
  if (Object.keys(range).length) {
    const params = Object.entries(range).map(([key, value]) => `${key}=${value}`).join('&')
    url += '?' + params;
  }
  return url;
};