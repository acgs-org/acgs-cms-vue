<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { MenuOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";

import { getMenus } from "@/util/router";

const selectedKeys = ref<Array<string>>([]);
const collapsed = ref<boolean>(false);

const menus = getMenus();
const router = useRouter();

// 路由跳转方法
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toRoute = (menu: any) => {
  console.log(menu.path);
  router.push(menu.path);
};
</script>

<template>
  <a-layout class="layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      class="sider"
      collapsible
    >
      <div class="logo">ACGS</div>

      <!-- 菜单导航栏 -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu v-for="menu in menus" :key="menu.id">
          <template #title>
            <component :is="menu.icon"></component>
            <span>{{ menu.title }}</span>
          </template>
          <a-menu-item
            v-for="subMenu in menu.children"
            :key="subMenu.id"
            @click="toRoute(subMenu)"
          >
            {{ subMenu.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- 头部信息显示 -->
      <a-layout-header class="header" style="">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuOutlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>

      <!-- 主画面显示区 -->
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less">
.layout {
  height: 100%;
  background: #fff;

  .sider {
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.3);
      margin: 16px;
      color: #fff;
      text-align: center;
      line-height: 32px;
    }

    .logo:hover {
      color: #1890ff;
    }
  }

  .header {
    background: #fff;
    padding: 0;

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }

    .trigger:hover {
      color: #1890ff;
    }
  }
}
</style>
