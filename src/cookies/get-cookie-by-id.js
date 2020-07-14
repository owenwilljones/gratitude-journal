import getCookies from './get-cookies';

export default id => getCookies().find(cookie => cookie.id.toString() === id.toString());