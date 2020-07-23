export default () => {
  const cookies = document.cookie.split('; ').filter(cookie => cookie.indexOf('gratitude') !== -1);
  return cookies.map(cookie => JSON.parse(decodeURIComponent(cookie).split('=')[1]));
}