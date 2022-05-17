const axios = require("axios").default;
const baseURL = process.env.NODE_ENV === "development" ? `http://${window.location.hostname}:8080/api` : "_server";
axios.defaults.baseURL = baseURL;

export const login = async (user) => {
  const logged = await axios
    .post("/usuario/login", user)
    .then((rs) => rs.data)
    .catch((error) => {
      return error?.response?.data;
    });
  return logged;
};

/**
 *
 * @param {string} uri
 * @param {string} method
 * @param {string} token
 * @param {*} data
 * @returns {({}|Array)} Object or Array
 */
export const request = async (uri, method, token = "", data = undefined, headers = undefined, ...args) => {
  let response;
  const options = { headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${token}`, ...(headers || {}) } };
  if (method?.toLowerCase() === "post") {
    response = await axios
      .post(uri, data, options)
      .then((rs) => rs.data)
      .catch((e) => {
        return e?.response?.data;
      });
  } else if (method?.toLowerCase() === "patch") {
    response = await axios
      .patch(uri, data, options)
      .then((rs) => {
        var { data } = rs;
        if (!data) throw new Error("Não foi possível retornar os dados");
        return data;
      })
      .catch((e) => {
        return e?.response?.data;
      });
  } else if (method?.toLowerCase() === "get") {
    axios.defaults.baseURL = baseURL;
    response = await axios
      .get(uri, { ...options, params: data })
      .then((rs) => rs.data)
      .catch((e) => {
        return e?.response?.data || e;
      });
  } else if (method?.toLowerCase() === "delete") {
    response = await axios
      .delete(uri, options)
      .then((rs) => rs.data)
      .catch((e) => {
        return e?.response?.data;
      });
  }

  return response;
};

const service = { login, request };

export default service;
