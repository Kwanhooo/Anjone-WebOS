<template>
  <div class="wrapper">
    <div class="content-wrapper">
      <div class="brand-wrapper">
        <img src="/logo.png" alt="anjone-logo" class="logo" />
        <div class="slogan">家庭数据中心</div>
      </div>
      <div class="child-wrapper">
        <NuxtChild keep-alive="keep-alive" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Auth',
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@LOGO_MAX_WIDTH: 13rem;

.wrapper {
  width: 100vw;
  height: 100vh;
  background: url('assets/image/background.jpg') no-repeat center center fixed;
  background-size: cover;

  display: flex;
  justify-content: center;

  .content-wrapper {
    //height: 50vh;
    display: flex;
    flex-direction: column;
    //margin: auto;
    margin-top: 27vh;
    //width: 100%;
    //position: fixed;
    //right: 13%;
    //top: 20%;

    .brand-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5rem;

      .logo {
        max-width: @LOGO_MAX_WIDTH;
        width: auto;
        height: auto;
        margin: 0 auto;
      }

      .slogan {
        display: block;
        font-size: 1.3rem;
        color: white;
        margin: 1rem auto;
      }
    }
  }
}
</style>
