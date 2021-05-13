import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupAntd } from '@/plugin/antd'

const app = createApp(App)

app.use(store)
  .use(router)

setupAntd(app)

app.mount('#app')
