import { defineStore } from "pinia";

import { defaultLang, changeLang } from "@/locales";

export const useAppStore = defineStore("app", {
  state: (): { lang: string; loading: boolean } => ({
    lang: defaultLang,
    loading: false,
  }),
  getters: {
    getLocalLang: (state): string => state.lang,
    isLoading: (state): boolean => state.loading,
  },
  actions: {
    changeLocalLang(): string {
      this.lang = changeLang();
      return this.lang;
    },
    changeLoading(): boolean {
      this.loading = !this.loading;
      return this.loading;
    },
  },
});
