import exception from "./en-US/exception";
import login from "./en-US/login";
import page from "./en-US/page";
import stage from "./en-US/stage";
import token from "./en-US/token";

export default {
  message: "-",
  language: "中文简体",

  ...exception,
  ...login,
  ...page,
  ...stage,
  ...token,
};
