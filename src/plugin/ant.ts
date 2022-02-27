import type { App } from "vue";

import { ConfigProvider, Result, Button } from "ant-design-vue";

const components = [Button, ConfigProvider, Result];

export const useAntComponent = (app: App<Element>) => {
  components.forEach((component) => app.use(component));
};
