const baseUrl = 'http://100.1.0.52:8081/v1/api';

export default {
  login: () => [baseUrl, 'auth', 'authenticate'].join('/'),
  // orders: () => [baseUrl, 'orders'].join('/'),
  orders: () => [baseUrl, 'auth', 'orders'].join('/'),
}