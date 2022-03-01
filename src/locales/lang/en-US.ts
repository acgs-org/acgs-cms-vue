import login from "./en-US/login";
import exception from "./en-US/exception";
import token from "./en-US/token";
import stage from "./en-US/stage";

export default {
  message: "-",

  ...exception,
  ...login,
  ...stage,
  ...token,
};
