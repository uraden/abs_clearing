const baseUrl = import.meta.env.VITE_BASEURL;

export default {
  login: () => [baseUrl, 'auth', 'authenticate'].join('/'),
  orders: () => [baseUrl, 'orders'].join('/'),
  newOrder: () => [baseUrl, 'newOrder'].join('/'),
  editForm: (orderId:unknown) => [baseUrl, 'order', orderId].join('/'),
  // orders: () => [baseUrl, 'auth', 'orders'].join('/'),
}