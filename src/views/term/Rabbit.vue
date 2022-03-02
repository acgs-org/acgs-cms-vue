<script setup lang="ts">
import { onMounted } from "vue";
import { outRabbit, toRabbit } from "@/api/out";

onMounted(() => {
  toRabbit();
});
</script>

<template>
  <div class="rabbit">
    <img
      @click="outRabbit()"
      class="logo"
      src="@/assets/image/term/rabbit/rabbit-logo.svg"
      alt="rabbit"
    />
    <p class="title">A webinar on high availability and</p>
    <p class="title">data safety in messaging</p>
  </div>
</template>

<style lang="less">
.rabbit {
  margin: 0;
  min-height: 530px;
  background: url("@/assets/image/term/rabbit/rabbit-bg.svg") no-repeat 50px;
  padding-top: 170px;

  .logo {
    display: block;
    width: 400px;
    // width: 257px;
    // height: 50px;
    margin-left: 70px;
  }

  .title {
    opacity: 0.8;
    font-family: Avenir-Medium;
    font-size: 24px;
    color: #000;
    max-width: 780px;
    margin-top: 30px;
    margin-left: 70px;
    text-align: left;
  }
}
</style>
