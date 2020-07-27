import getCookies from './get-cookies';

const getNewCookieId = () => {
  const cookies = getCookies().map(cookie => cookie.id);
  return cookies.length > 0 ? Math.max(...cookies) + 1 : 1;
};

const getTimestamp = (dateField, timeField) => {
  const timestamp = new Date();

  timestamp.setTime(Date.parse(
    `${dateField.value !== '' ? dateField.value : `${timestamp.getFullYear()}-${timeFormatting(timestamp.getMonth())}-${timeFormatting(timestamp.getDate())}`}T${
      timeField.value !== '' ? timeField.value : `${timeFormatting(timestamp.getHours())}:${timeFormatting(timestamp.getMinutes())}`}Z`
  ));
  
  return `${timeFormatting(timestamp.getDate())}/${
            timeFormatting(timestamp.getMonth() + 1)}/${
            timestamp.getFullYear()}, ${
            timeFormatting(timestamp.getHours() - 1)}:${
            timeFormatting(timestamp.getMinutes())}`;
};

const timeFormatting = num => num > 10 ? num.toString() : `0${num.toString()}`;

export default (gratitudes, gratitudesField, dateField, timeField) => {
  const expiration = new Date();
  const cookie = {
    id: gratitudesField.dataset.editing !== "0" ? gratitudesField.dataset.editing : getNewCookieId(),
    timestamp: getTimestamp(dateField, timeField),
    gratitudes
  };

  expiration.setDate(expiration.getDate() + 7);
  document.cookie = `gratitude ${cookie.id}=${encodeURIComponent(JSON.stringify(cookie))}; expires=${expiration}`;

  return cookie;
};