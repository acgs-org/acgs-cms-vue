import type { App } from "vue";

import { Button, ConfigProvider, Layout, Menu, Result } from "ant-design-vue";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";

const components = [Button, ConfigProvider, Layout, Menu, Result];

export const icons = [MenuFoldOutlined, MenuUnfoldOutlined];

export const useAntComponent = (app: App<Element>) => {
  components.forEach((component) => app.use(component));
};
