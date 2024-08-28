const ROUTES = {
  BASE: "/",
  API_BASE: "/api",

  LOGIN: "/login",
  LOGOUT: "/logout",
  LOGOUT_EXPIRED: "/logout?_exp=1",
  REGISTER: "/register",

  REVOKE_SUB: "/revoke-sub",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout-success",
  CHECKOUT_CANCEL: "/checkout-cancel",

  PROFILE: "/profile",
  FORM_CONTACT: "/form-contact",

  DOCS: "/api-docs",

  USERS: "/users",
  FIND: "/:id",
  GET: "/:id/get", // can be used as FIND
  GET_ATTRIBUTE: "/:id/get/:attr",

  AUTH: "/auth",
  AUTH_LOGIN: "/login",
  AUTH_REGISTER: "/register",
};

module.exports = ROUTES;
