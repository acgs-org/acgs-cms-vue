<script setup lang="ts">
import TablePage from "@/components/page/TablePage.vue";

const title = "用户信息页";
const subTitle = "用于添加和删除所属用户";
</script>

<template>
  <TablePage
    :title="title"
    :sub-title="subTitle"
    :data="[]"
    :columns="[]"
    :loading="false"
  />
</template>
