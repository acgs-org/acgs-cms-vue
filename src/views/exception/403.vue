<script setup lang="ts">
import { useRouter } from "vue-router";
import { i18nRender } from "@/locales";

const router = useRouter();
const toHome = () => {
  router.push({ path: "/login" });
};
</script>

<template>
  <a-result
    status="403"
    title="403"
    :sub-title="i18nRender('exception.403.title')"
  >
    <template #extra>
      <a-button type="primary" @click="toHome">
        {{ i18nRender("exception.403.button") }}
      </a-button>
    </template>
  </a-result>
</template>