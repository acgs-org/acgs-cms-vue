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
    status="404"
    title="404"
    :sub-title="i18nRender('exception.404.title')"
  >
    <template #extra>
      <a-button type="primary" @click="toHome">
        {{ i18nRender("exception.404.button") }}
      </a-button>
    </template>
  </a-result>
</template>
