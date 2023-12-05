const baseUrl = import.meta.env.VITE_BASEURL;

export default {
  login: () => [baseUrl, 'auth', 'authenticate'].join('/'),
  orders: () => [baseUrl, 'orders'].join('/'),
  newOrder: () => [baseUrl, 'newOrder'].join('/'),
  editForm: (orderId:unknown) => [baseUrl, 'order'].join('/') + `?orderId=${orderId}`,
  statusOrder: () => [baseUrl, 'changeStatusOrder'].join('/')
  // orders: () => [baseUrl, 'auth', 'orders'].join('/'),
}