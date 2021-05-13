<template>
  <a-button type="primary" loading>Loading</a-button>
  <a-button type="primary" size="small" loading>Loading</a-button>
  <br />
  <a-button type="primary" :loading="loading" @mouseenter="loading = true">mouseenter me!</a-button>
  <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
    延迟1s
  </a-button>
  <br />
  <a-button type="primary" loading />
  <a-button type="primary" shape="circle" loading />
  <a-button type="danger" shape="round" loading />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

interface DelayLoading {
  delay: number;
}
export default defineComponent({
  setup() {
    const iconLoading = ref<boolean | DelayLoading>(false);
    const enterIconLoading = () => {
      iconLoading.value = { delay: 1000 };
    };
    return {
      loading: ref(false),
      iconLoading,
      enterIconLoading,
    };
  },
});
</script>
