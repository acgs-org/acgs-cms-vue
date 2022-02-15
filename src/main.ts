import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";
import i18n from "./locales";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(VueAxios, axios);

app.mount("#app");
