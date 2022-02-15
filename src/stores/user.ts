import { defineStore } from "pinia";

import type { Tokens } from "@/api/token";
import type { User } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: (): { tokens: Tokens; user: User } => ({
    tokens: {
      accessToken: "",
      refreshToken: "",
    },
    user: {
      id: "",
      username: "",
      roles: [],
      nick: "",
    },
  }),
  getters: {
    getTokens: (state): Tokens => state.tokens,
    getAccessToken: (state): string => state.tokens.accessToken,
    getRefreshToken: (state): string => state.tokens.refreshToken,
    getUserId: (state): string => state.user.id,
    getUserRoles: (state): Array<string> => state.user.roles,
  },
  actions: {
    logout() {
      this.$reset();
    },
  },
});
