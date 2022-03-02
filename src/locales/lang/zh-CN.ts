import login from "./zh-CN/login";
import exception from "./zh-CN/exception";
import token from "./zh-CN/token";
import stage from "./zh-CN/stage";

export default {
  message: "-",
  language: "English",

  ...exception,
  ...login,
  ...stage,
  ...token,
};
