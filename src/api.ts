const baseUrl = import.meta.env.VITE_BASEURL;

export default {
  login: () => [baseUrl, 'auth', 'authenticate'].join('/'),
  orders: () => [baseUrl, 'orders'].join('/'),
  // orders: () => [baseUrl, 'auth', 'orders'].join('/'),
}