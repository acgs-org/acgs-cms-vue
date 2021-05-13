import type { App } from 'vue'
import { Button, Layout, Menu, Table, Tag, PageHeader } from 'ant-design-vue'

const components = [
  Button,
  Layout,
  Menu,
  Table,
  Tag,
  PageHeader
]

export function setupAntd (app: App<Element>):void {
  components.forEach(plugin => {
    app.use(plugin)
  })
}
