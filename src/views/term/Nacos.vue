<script setup lang="ts">
import { onMounted } from "vue";
import { outNacos, toNacos } from "@/api/out";

onMounted(() => {
  toNacos();
});
</script>

<template>
  <div class="nacos">
    <img
      @click="outNacos()"
      class="logo"
      src="@/assets/image/term/nacos/nacos-logo.png"
      alt="nacos"
    />
    <p class="title">
      一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
    </p>
  </div>
</template>

<style lang="less">
.nacos {
  margin: 0;
  min-height: 530px;
  background: url("@/assets/image/term/nacos/nacos-bg.png");
  padding-top: 200px;

  .logo {
    display: block;
    width: 257px;
    height: 50px;
    margin: 0 auto;
  }

  .title {
    opacity: 0.8;
    font-family: Avenir-Medium;
    font-size: 24px;
    color: #fff;
    max-width: 780px;
    margin: 13px auto 30px;
    text-align: center;
  }
}
</style>
