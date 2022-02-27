import { defineStore } from "pinia";

import { defaultLang, changeLang } from "@/locales";

export const useAppStore = defineStore("app", {
  state: (): { lang: string } => ({
    lang: defaultLang,
  }),
  getters: {
    getLocalLang: (state): string => state.lang,
  },
  actions: {
    changeLocalLang(): string {
      this.lang = changeLang();
      return this.lang;
    },
  },
});
