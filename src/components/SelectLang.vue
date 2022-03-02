<script setup lang="ts">
import { ref } from "vue";

import { useAppStore } from "@/stores";
import { i18nRender } from "@/locales/index";

// 获取当前语言类型
let locale = ref(useAppStore().getLocalLang);

/** 修改当前语言类型 */
const change = () => {
  locale.value = useAppStore().changeLocalLang();
};
</script>

<template>
  <button class="button" @click="change()">
    {{ i18nRender("language") }}
  </button>
</template>

<style lang="less">
.button {
  height: 30px;
  width: 100px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  border: 1px solid #222;
  border-radius: 1px;
  background-color: rgba(255, 255, 255, 0.02);
}
</style>
