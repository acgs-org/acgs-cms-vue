<script setup lang="ts">
import { ref, onMounted } from "vue";

import TablePage, { type Column } from "@/components/page/TablePage.vue";
import { getLoginLog, type LoginLogInfo } from "@/api/log";
import { i18nRender } from "@/locales";

const tableData = ref<Array<LoginLogInfo>>([]);
const loading = ref<boolean>(true);

onMounted(() => {
  getLoginLog().then((res) => {
    if (res.success) {
      tableData.value = res.result;
      loading.value = false;
    }
  });
});

const columns: Array<Column> = [
  { title: "登录账户", key: "username", dataIndex: "username" },
  { title: "用户昵称", key: "nick", dataIndex: "nick" },
  { title: "登录日期", key: "loginTime", dataIndex: "loginTime" },
];
</script>

<template>
  <TablePage
    :title="i18nRender('page.log.login-log.title')"
    :sub-title="i18nRender('page.log.login-log.sub-title')"
    :data="tableData"
    :columns="columns"
    :loading="loading"
  />
</template>
