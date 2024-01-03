const baseUrl = import.meta.env.VITE_BASEURL;

export default {
  login: () => [baseUrl, "auth", "login"].join("/"),
  orders: () => [baseUrl, "orders"].join("/"),
  newOrder: () => [baseUrl, "newOrder"].join("/"),
  // editForm: (orderId: unknown) =>
  //   [baseUrl, "order"].join("/") + `?orderId=${orderId}`,
  statusOrder: () => [baseUrl, "changeStatusOrder"].join("/"),
  draftDetails: () => [baseUrl, "draftDetails"].join("/"),
  draftList: () => [baseUrl, "draftList"].join("/"),
  // orders: () => [baseUrl, 'auth', 'orders'].join('/'),
  // report:(clientId: unknown) => [baseUrl, "account", "report?", `clientId=${clientId}`].join("/"),
  accountActives: () => [baseUrl, "account", "active"].join("/"),
  accountInfo: () => [baseUrl, "account", "info"].join("/"),
  order: () => [baseUrl, "order", "new"].join("/"),
  orderAll: () => [baseUrl, "order", "all"].join("/"),
  accountReport: () => [baseUrl, "account", "report"].join("/"),
  singleOrder: (oderId: number) => [baseUrl, "order", oderId].join("/"),
  allAccount: () => [baseUrl, "account", "all"].join('/'),
  accountDebit: () => [baseUrl, "account", "debit"].join('/'),
  accountCredit: () => [baseUrl, "account", "credit"].join('/'),
  editPassword: () => [baseUrl, "user", "edit"].join('/'),
  repotrIo: () => [baseUrl, "account", "report-io"].join('/'),
  accountAll: () => [baseUrl, "account", "all"].join("/"),
  profile: () => [baseUrl, "user"].join("/"),
  operDays: () => [baseUrl, "oper-day", "all"].join("/"),
};
