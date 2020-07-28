import getCookies from './get-cookies';
import timeFormatting from '../utils/time-formatting';

const getNewCookieId = () => {
  const cookies = getCookies().map(cookie => cookie.id);
  return cookies.length > 0 ? Math.max(...cookies) + 1 : 1;
};

const getTimestamp = (dateField, timeField) => {
  const timestamp = new Date(`${dateField.value}T${timeField.value}:00`);
  
  return `${timeFormatting(timestamp.getDate())}/${
            timeFormatting(timestamp.getMonth() + 1)}/${
            timestamp.getFullYear()}, ${
            timeFormatting(timestamp.getHours())}:${
            timeFormatting(timestamp.getMinutes())}`;
};

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