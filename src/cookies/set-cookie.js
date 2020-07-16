import getCookies from './get-cookies';

const getNewCookieId = () => {
  const cookies = getCookies().map(cookie => cookie.id);
  return cookies.length > 0 ? Math.max(...cookies) + 1 : 1;
};

const getTimestamp = () => {
  const now = new Date();
  return `${now.getDate()}/${timeFormatting(now.getMonth() + 1)}/${now.getFullYear()}, ${now.getHours()}:${timeFormatting(now.getMinutes())}`;
};

const timeFormatting = num => {
  return num > 10 ? num.toString() : `0${num.toString()}`;
};

export default (gratitudes, gratTextarea) => {
  const expiration = new Date();
  const cookie = {
    id: gratTextarea.dataset.editing !== "0" ? gratTextarea.dataset.editing : getNewCookieId(),
    timestamp: getTimestamp(),
    gratitudes
  };

  expiration.setDate(expiration.getDate() + 7);
  document.cookie = `gratitude ${cookie.id}=${JSON.stringify(cookie)}; expires=${expiration}`;

  return cookie;
};