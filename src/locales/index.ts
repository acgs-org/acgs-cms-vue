import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "zn",
  messages: {
    en: {
      login: {
        username: "please input username.",
        button: "login",
      },
    },
    zn: {
      login: {
        username: "请输入用户名",
        button: "登录",
      },
    },
  },
});

export const changeLang = (): void => {
  if (i18n.global.locale.value === "en") {
    i18n.global.locale.value = "zn";
  } else {
    i18n.global.locale.value = "en";
  }
};

export const i18nRender = (key: string) => i18n.global.t(key);

export default i18n;
