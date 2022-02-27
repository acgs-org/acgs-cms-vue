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
    status="500"
    title="500"
    :sub-title="i18nRender('exception.500.title')"
  >
    <template #extra>
      <a-button type="primary" @click="toHome">
        {{ i18nRender("exception.500.button") }}
      </a-button>
    </template>
  </a-result>
</template>
