import type { App } from "vue";

import {
  Button,
  ConfigProvider,
  Input,
  Layout,
  Menu,
  PageHeader,
  Pagination,
  Result,
  Spin,
  Table,
} from "ant-design-vue";

/** ant 组件全局引用 */
const components = [
  Button,
  ConfigProvider,
  Input,
  Layout,
  Menu,
  PageHeader,
  Pagination,
  Result,
  Spin,
  Table,
];

export const useAntComponent = (app: App<Element>) => {
  components.forEach((component) => app.use(component));
};
