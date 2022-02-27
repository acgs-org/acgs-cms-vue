<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAppStore } from "@/stores";

// 获取当前语言类型
let locale = ref(useAppStore().getLocalLang);

/** 语言切换显示项, 两个选项直接反向处理 */
const languageLocales = reactive({
  "zh-CN": "English",
  "en-US": "简体中文",
});

/** 修改当前语言类型 */
const change = () => {
  locale.value = useAppStore().changeLocalLang();
};
</script>

<template>
  <button class="button" @click="change()">
    {{ languageLocales[locale] }}
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
