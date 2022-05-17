import { getCookie, setCookie } from "./cookies";
import { Buffer } from "buffer";

const isLoggedUser = async () => {
  let cookie = getCookie("LOGGED_USER");
  let logged = sessionStorage.getItem("U_TOKEN") || cookie;
  if (typeof logged === "string" && window.location.pathname === "/login") {
    window.location.href = `${window.location.origin}/`;
  } else if (typeof logged !== "string" && window.location.pathname !== "/login") {
    window.location.href = `${window.location.origin}/login`;
  }
};

const destroySession = () => {
  sessionStorage.removeItem("U_TOKEN");
  sessionStorage.removeItem("LOGGED_USER_DATA");
  setCookie("LOGGED_USER", "", -10000);
  window.location.reload();
};

const getLoggedUserData = () => {
  let loggedUser = sessionStorage.getItem("LOGGED_USER_DATA");
  loggedUser = loggedUser !== null && loggedUser?.length > 0 ? JSON.parse(Buffer.from(loggedUser, "hex").toString("ascii")) : undefined;
  if (!loggedUser || loggedUser === null) {
    loggedUser = getCookie("LOGGED_USER");
    loggedUser = loggedUser ? JSON.parse(Buffer.from(loggedUser, "hex").toString("ascii")) : loggedUser;
  }
  return loggedUser;
};

const setLoggedUserData = (data) => {
  if (data && data.token) {
    sessionStorage.setItem("U_TOKEN", Buffer.from(JSON.stringify(data.token), "ascii").toString("hex"));
    sessionStorage.setItem("LOGGED_USER_DATA", Buffer.from(JSON.stringify(data), "ascii").toString("hex"));
    if (data.keepMeConnected) {
      let info = Buffer.from(JSON.stringify(data), "ascii").toString("hex");
      setCookie("LOGGED_USER", info, 30);
    }
  }
};

const validateSession = { isLoggedUser, destroySession, getLoggedUserData, setLoggedUserData };
export default validateSession;
