import type { RouteRecordRaw } from "vue-router";

import { i18nRender } from "@/locales";

/** 菜单栏图标导入 */
import { FundOutlined, TeamOutlined } from "@ant-design/icons-vue";

// import LayoutVue from "@/views/Layout.vue";
// import NacosVue from "@/views/term/Nacos.vue";
// import InfoVue from "@/views/user/Info.vue";

/** 菜单栏类型定义 */
export interface Stage {
  id: string;
  title: string;
  icon?: unknown;
  path: string;
  roles: Array<string>;
  enable: boolean;
  children?: Array<Stage>;
}

/**
 * 菜单栏配置项
 *
 * -----------------------------------------------------------------------------------------------------
 * 约定:
 * 1. 参照 Stage 接口约定,添加相应配置信息
 * 2. root 用户具有项目的最高权限, 项目仅应当有一个 root 权限用户
 * 3. 默认 root 权限用户可以访问全部配置
 * 4. admin 用户具有项目的基本管理权限, 可访问所有非 root 权限限定页面
 * 5. stage 配置深度最大为 2, 不应设置过深层度路由
 * -----------------------------------------------------------------------------------------------------
 * 例:
 * 1. 添加仅 root 用户可访问页面
 *   {
 *     id: "id-code",
 *     title: "title-name",
 *     icon: "icon-name",
 *     path: "/path",
 *     roles: ["root"]    ----- 重要! 必须添加 root 角色 以限制访问
 *     enable: true,
 *     children: [...],
 *   }
 *
 * 2. 添加 admin 用户可访问页面
 *   {
 *     id: "id-code",
 *     title: "title-name",
 *     icon: "icon-name",
 *     path: "/path",
 *     roles: ["admin"]    ----- 必要! 添加 admin 角色 以限制访问
 *     enable: true,
 *     children: [...],
 *   }
 *
 * 3. 添加普通用户可访问页面
 *   {
 *     id: "id-code",    ----- 配置信息 id, 应该遵守示例约定进行设置, 此 id 用于绑定路由映射 key 不能重复
 *     title: "title-name",    ----- 该配置文件显示名称, 应当在 locales 中进行相应语言的文本配置
 *     icon: "icon-name",    ----- 该配置文件图标显示, 仅应当配置最高层次的图标, 并且使用绝对引入方式配置
 *     path: "/path",    ----- 当前配置项访问路由路径, 应当对所有配置添加相应的路由路径,但仅最深层次的路由会生效
 *     roles: ["role-name1", "role-name2"]    ----- 添加相应角色 以限制访问
 *     enable: true,    ----- 是否可用, 不可用状态仍会在画面进行显示,但是拒绝访问
 *     children: [...],    ----- 子路由配置, 建议最大配置深度为 2
 *   }
 * -----------------------------------------------------------------------------------------------------
 * 注: 尽管约定最大配置深度为 2, 但您仍可以自由进行配置深度的设置
 *     但是框架在解析配置权限时, 仅会对 2 级深度进行校验, 请您注意“权限访问控制”的配置深度
 * -----------------------------------------------------------------------------------------------------
 */
export const stage: Array<Stage> = [
  {
    id: "1",
    title: i18nRender("stage.1.title"),
    icon: FundOutlined,
    path: "/home/term",
    roles: ["root"],
    enable: false,
    children: [
      {
        id: "1-1",
        title: i18nRender("stage.1-1.title"),
        path: "/home/term/nacos",
        roles: ["root"],
        enable: false,
      },
      {
        id: "1-2",
        title: i18nRender("stage.1-2.title"),
        path: "/home/term/rabbit",
        roles: ["root"],
        enable: false,
      },
    ],
  },
  {
    id: "2",
    title: i18nRender("stage.2.title"),
    icon: TeamOutlined,
    path: "/home/user",
    roles: ["admin"],
    enable: false,
    children: [
      {
        id: "2-1",
        title: i18nRender("stage.2-1.title"),
        path: "/home/user/info",
        roles: ["admin"],
        enable: false,
      },
    ],
  },
];

/**
 * 菜单栏路由配置项
 * -----------------------------------------------------------------------------------------------------
 * 约定:
 * 1. 参照 vue-router 标准进行路由配置
 * 2. 所有路由都应在 /home 路径下进行设置, 不允许扩展其他路径
 * 3. 所有路由的 component 导入均应采用相对导入配置, 以优化加载速度
 * -----------------------------------------------------------------------------------------------------
 * 注: 将所有路由配置统一在 /home 路径下管理, 便于权限控制和访问拦截操作
 *     如果您有额外需求,需要进行其他的路由配置, 可以在 @/router 文件夹中添加相应的 routes 配置文件,将其导入 router
 * -----------------------------------------------------------------------------------------------------
 */
export const asyncRouterMap: RouteRecordRaw = {
  path: "/home",
  component: () => import("../views/Layout.vue"),
  children: [
    {
      path: "/home/term/nacos",
      component: () => import("../views/term/Nacos.vue"),
    },
    {
      path: "/home/term/rabbit",
      component: () => import("../views/term/Rabbit.vue"),
    },
    {
      path: "/home/user/info",
      component: () => import("../views/user/Info.vue"),
    },
  ],
};
