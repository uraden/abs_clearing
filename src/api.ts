const baseUrl = import.meta.env.VITE_BASEURL;

export default {
  login: () => [baseUrl, "auth", "authenticate"].join("/"),
  orders: () => [baseUrl, "orders"].join("/"),
  newOrder: () => [baseUrl, "newOrder"].join("/"),
  // editForm: (orderId: unknown) =>
  //   [baseUrl, "order"].join("/") + `?orderId=${orderId}`,
  statusOrder: () => [baseUrl, "changeStatusOrder"].join("/"),
  draftDetails: () => [baseUrl, "draftDetails"].join("/"),
  draftList: () => [baseUrl, "draftList"].join("/"),
  // orders: () => [baseUrl, 'auth', 'orders'].join('/'),
  // report:(clientId: unknown) => [baseUrl, "account", "report?", `clientId=${clientId}`].join("/"),
  accountActives: () => [baseUrl, "account", "active"].join('/'), 
  accountInfo: () => [baseUrl, "account", "info"].join('/'), 
  order: () => [baseUrl, "order", "new"].join('/'), 
  orderAll: () => [baseUrl, "order", "all"].join('/'),
  allAccount: (clientId: unknown) => [baseUrl, "account", "all"].join('/') + `?clientId=${clientId}` 
};
