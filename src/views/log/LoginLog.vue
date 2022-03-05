<script setup lang="ts">
import { ref, onMounted } from "vue";
import TablePage, { type Column } from "@/components/page/TablePage.vue";
import { getLoginLog, type LoginLogInfo } from "@/api/log";

const title = "登录日志页";
const subTitle = "用于查看用户的登录记录";

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
    :title="title"
    :sub-title="subTitle"
    :data="tableData"
    :columns="columns"
    :loading="loading"
  />
</template>
