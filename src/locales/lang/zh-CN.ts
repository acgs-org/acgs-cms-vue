import exception from "./zh-CN/exception";
import login from "./zh-CN/login";
import page from "./zh-CN/page";
import stage from "./zh-CN/stage";
import token from "./zh-CN/token";

export default {
  message: "-",
  language: "English",

  ...exception,
  ...login,
  ...page,
  ...stage,
  ...token,
};
