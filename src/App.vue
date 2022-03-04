<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAppStore } from "@/stores";
</script>

<template>
  <a-spin
    :spinning="useAppStore().isLoading"
    size="large"
    tip="loading..."
    class="loading"
  />
  <RouterView />
</template>

<style>
@import "@/assets/base.less";

.loading {
  position: absolute;
  z-index: 99;
  top: 48%;
  left: 48%;
}
</style>
