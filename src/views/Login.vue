<script setup lang="ts">
import { reactive } from "vue";

import { getTokens, type LoginInfo } from "@/api/token";
import { useUserStore } from "@/stores/user";
import { i18nRender } from "@/locales";
import SelectLang from "../components/SelectLang.vue";

const loginInfo: LoginInfo = reactive({
  username: "",
  password: "",
});

const login = async () => {
  if (loginInfo.username === "") {
    alert("请输入用户名");
    return;
  }

  if (loginInfo.password === "") {
    alert("请输入密码");
    return;
  }

  const res = await getTokens(loginInfo);
  if (res.success) {
    useUserStore().tokens = res.result;
    console.log("Token: ", useUserStore().getAccessToken);
  }
};
</script>

<template>
  <SelectLang class="language" />
  <div class="login">
    <div class="form-box">
      <div class="title">
        <h1>ACGS&nbsp;&nbsp;&nbsp;&nbsp;CMS</h1>
      </div>

      <form @submit.prevent="login()" class="login-form" autocomplete="off">
        <div class="form-item">
          <input
            v-model="loginInfo.username"
            type="text"
            autocomplete="off"
            :placeholder="i18nRender('login.input.username')"
          />
          <div class="u-icon">&nbsp;</div>
        </div>
        <div class="form-item">
          <input
            v-model="loginInfo.password"
            type="password"
            autocomplete="off"
            :placeholder="i18nRender('login.input.password')"
          />
          <div class="p-icon">&nbsp;</div>
        </div>
        <button class="submit" type="submit">
          {{ i18nRender("login.button.login") }}
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="less">
.language {
  float: right;
  z-index: 1;
  top: 20px;
  right: 100px;
}

.login {
  width: 100%;
  height: 100%;
  background-size: auto;
  background: #1b2c5f url("../assets/image/login/login-bg.png") no-repeat center
    center;

  .form-box {
    width: 460px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title {
      height: 37px;
      font-size: 30px;
      line-height: 37px;
      margin-bottom: 15%;

      h1 {
        padding-left: 74px;
        box-sizing: border-box;
        text-align: left;
        color: #8c98ae;
      }
    }

    .login-form {
      width: 100%;

      .form-item {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-bottom: 13px;
        margin-bottom: 34px;

        input {
          width: 100%;
          height: 100%;
          background: transparent;
          color: #c4c9d2;
          font-size: 14px;
          padding-left: 74px;
          box-sizing: border-box;
          border: 0px;
          outline: none;
        }

        .u-icon {
          background: url("../assets/image/login/u-icon.png") no-repeat;
          background-size: 100% auto;
          background-position: left bottom;
        }

        .p-icon {
          width: 100%;
          background: url("../assets/image/login/p-icon.png") no-repeat;
          background-size: 100% auto;
          background-position: left bottom;
        }
      }

      .submit {
        width: 100%;
        height: 70px;
        color: #c4c9d2;
        font-size: 16px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 10px;
        padding-left: 74px;
        background: url("../assets/image/login/login-btn.png") no-repeat;
        background-size: 90% auto;
        background-position: center bottom;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
