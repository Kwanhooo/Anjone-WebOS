<!-- 点击用户名时出现的用户选项DropDown -->
<template>
  <div id="user-option-wrapper" class="select-box-wrapper __closable__">
    <div class="select-box-item" @click="loadAccountSettings()">
      <svg
        t="1672903677398"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3864"
        width="18"
        height="18"
        fill="#515151"
      >
        <path
          d="M506.075809 546.976206c-145.260076 0-263.436846-118.16774-263.436846-263.418785 0-145.260076 118.17677-263.436846 263.436846-263.436846 145.260076 0 263.436846 118.16774 263.436846 263.436846C769.512655 428.799436 651.335885 546.976206 506.075809 546.976206zM506.075809 76.996419c-113.896181 0-206.561002 92.664821-206.561002 206.561002S392.179628 490.100362 506.075809 490.100362c113.905212 0 206.561002-92.646759 206.561002-206.54294S619.981021 76.996419 506.075809 76.996419z"
          p-id="3865"
        ></path>
        <path
          d="M514.754388 621.191146c-250.902125 0-455.024817 174.88103-455.024817 389.840656l28.437922 0c0-199.607302 190.991939-361.411765 426.586895-361.411765s426.586895 161.804462 426.586895 361.411765l20.156698 0 8.281224 0C969.788235 796.072176 765.647482 621.191146 514.754388 621.191146z"
          p-id="3866"
        ></path>
        <path
          d="M514.754388 678.057959c219.547262 0 398.148973 149.360049 398.148973 332.964812l28.437922 0c0-199.607302-190.991939-361.411765-426.586895-361.411765S88.167493 811.4245 88.167493 1011.031802l28.437922 0C116.605415 827.427039 295.207126 678.057959 514.754388 678.057959z"
          p-id="3867"
        ></path>
      </svg>
      <span>账户信息</span>
    </div>
    <div class="select-box-item" @click="loadFeedback()">
      <svg
        t="1672904926056"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3520"
        width="18"
        height="18"
      >
        <path
          d="M512 65.984C266.08 65.984 65.984 266.08 65.984 512c0 245.952 200.064 446.016 446.016 446.016 245.952 0 446.016-200.064 446.016-446.016C958.016 266.08 757.952 65.984 512 65.984zM512 894.016C301.344 894.016 129.984 722.624 129.984 512 129.984 301.344 301.344 129.984 512 129.984c210.624 0 382.016 171.36 382.016 382.016C894.016 722.624 722.624 894.016 512 894.016z"
          fill="#515151"
          p-id="3521"
        ></path>
        <path
          d="M512 255.2c-77.216 0-140.032 62.272-140.032 138.816 0 17.664 14.336 32 32 32s32-14.336 32-32c0-41.952 33.376-74.816 76.032-74.816 41.952 0 76.032 34.368 76.032 76.64 0 15.968-22.848 38.784-43.008 58.944C514.56 485.216 480 519.744 480 566.016l0 45.696c0 17.696 14.336 32 32 32s32-14.304 32-32l0-45.696c0-19.744 23.52-43.264 46.272-65.984 28.928-28.928 61.76-61.728 61.76-104.192C652.032 318.272 589.216 255.2 512 255.2z"
          fill="#515151"
          p-id="3522"
        ></path>
        <path
          d="M512 753.92m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
          fill="#515151"
          p-id="3523"
        ></path>
      </svg>
      <span>问题反馈</span>
    </div>
    <hr
      style="
        width: 80%;
        height: 1px;
        margin: 6px 0 6px 10%;
        background: #9d9d9d;
        border: 0;
      "
    />
    <div class="select-box-item" @click="onExitClicked()">
      <svg
        t="1672905011521"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7284"
        width="18"
        height="18"
      >
        <path
          d="M416 800c-159.058 0-288-128.942-288-288 0-159.058 128.942-288 288-288 99.854 0 187.838 50.817 239.502 128l74.116 0C671.355 238.026 552.79 160 416 160 221.596 160 64 317.596 64 512s157.596 352 352 352c136.79 0 255.355-78.026 313.618-192l-74.116 0C603.838 749.184 515.854 800 416 800zM951.392 504.021 806.168 363.195c-3.176-3.08-5.75-2.002-5.75 2.425L800.418 480 479.997 480C462.323 480 448 494.327 448 512c0 17.677 14.325 32 31.997 32l320.421 0 0 114.379c0 4.42 2.571 5.521 5.75 2.452l145.195-140.127C956.133 516.101 956.145 508.63 951.392 504.021z"
          fill="#515151"
          p-id="7285"
        ></path>
      </svg>
      <span>退出</span>
    </div>
    <div class="select-box-item" style="padding: 0">
      <a-popconfirm
        ok-text="确认"
        cancel-text="取消"
        style="width: 100%"
        ok-type="danger"
        @confirm="onShutdownConfirm"
      >
        <templete slot="title">
          <span
            >您真的确认要<strong style="color: #ff4d4f">关机</strong>吗？</span
          ><br />
          <span>所有未保存的工作都将丢失！</span>
        </templete>

        <div
          href="#"
          style="
            display: flex;
            padding: 0.3em 1.2em;
            color: #6c6c6c;
            flex-direction: row;
            align-items: center;
          "
        >
          <svg
            t="1672905035700"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7655"
            width="18"
            height="18"
          >
            <path
              d="M512 934.4c-230.4 0-418.133-187.733-418.133-418.133 0-157.867 89.6-302.934 230.4-375.467 17.066-8.533 38.4 0 46.933 17.067 8.533 17.066 0 38.4-17.067 46.933-119.466 59.733-192 179.2-192 311.467 0 192 157.867 349.866 349.867 349.866s349.867-157.866 349.867-349.866C861.867 384 789.333 264.533 665.6 204.8c-17.067-8.533-25.6-29.867-17.067-46.933 8.534-17.067 29.867-25.6 46.934-17.067 145.066 72.533 230.4 213.333 230.4 375.467C930.133 746.667 742.4 934.4 512 934.4z m0-430.933c-17.067 0-34.133-17.067-34.133-34.134V106.667c0-17.067 17.066-34.134 34.133-34.134s34.133 17.067 34.133 34.134v362.666c0 17.067-17.066 34.134-34.133 34.134z"
              fill="#515151"
              p-id="7656"
            ></path>
          </svg>
          <span>关机</span>
        </div>
      </a-popconfirm>
    </div>
    <div class="select-box-item" style="padding: 0">
      <a-popconfirm
        ok-text="确认"
        cancel-text="取消"
        style="width: 100%"
        ok-type="danger"
        @confirm="onRebootConfirm"
      >
        <templete slot="title">
          <span
            >您真的确认要<strong style="color: #ff4d4f">重启</strong>吗？</span
          ><br />
          <span>所有未保存的工作都将丢失！</span>
        </templete>
        <div
          href="#"
          style="
            display: flex;
            padding: 0.3em 1.2em;
            color: #6c6c6c;
            flex-direction: row;
            align-items: center;
          "
        >
          <svg
            t="1672905065324"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8600"
            width="16"
            height="16"
            style="margin: 0 17px 0 1px"
          >
            <path
              d="M142.883389 940.648975H71.441694v-214.325083h214.325083v71.441695H142.883389v142.883388z"
              p-id="8601"
              fill="#515151"
            ></path>
            <path
              d="M511.998809 1023.997619a509.379281 509.379281 0 0 1-435.198988-242.127809L137.525262 744.184316A440.557115 440.557115 0 1 0 71.441694 511.998809H0a511.998809 511.998809 0 1 1 511.998809 511.99881z"
              p-id="8602"
              fill="#515151"
            ></path>
          </svg>
          <span>重启</span>
        </div>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SettingsDialog from '@/components/Settings/Dialog'

export default {
  name: 'UserOptions',
  data() {
    return {}
  },
  methods: {
    loadAccountSettings() {
      $nuxt.$store.dispatch('dock/GetNewUid').then((res) => {
        const pendingObj = {
          uid: res,
          icon: require('@/assets/image/settings.png'),
          name: '系统设置',
          isActive: true,
        }
        // extend一个要打开的组件
        const VueComponent = Vue.extend(SettingsDialog)
        const wrapper = document.createElement('div')
        document.getElementById('desktop-wrapper').appendChild(wrapper)
        const newInstance = new VueComponent({
          el: wrapper,
          propsData: {
            uid: pendingObj.uid,
          },
        })
        // 在pending表中添加打开的组件
        $nuxt.$store.commit('dock/NEW_PENDING', pendingObj)
      })
      // 关闭所有可关闭的小组件(__closable__)
      const closable = document.querySelector('.__closable__')
      closable !== null && closable.remove()
    },
    loadFeedback() {},
    onExitClicked() {
      $nuxt.$store.dispatch('sys/DestroySysResource').then(() => {
        this.clearUserState()
        $nuxt.$router.push('/auth')
        this.$message.success('您已安全退出！')
      })
    },
    onShutdownConfirm() {
      $nuxt.$store.dispatch('sys/DestroySysResource').then(() => {
        this.clearUserState()
        $nuxt.$router.push('/auth')
        this.$message.warn('设备正在关闭！即将断开连接...')
      })
    },
    onRebootConfirm() {
      $nuxt.$store.dispatch('sys/DestroySysResource').then(() => {
        this.clearUserState()
        $nuxt.$router.push('/auth')
        this.$message.warn('设备正在重启！即将断开连接...')
      })
    },
    clearUserState() {
      $nuxt.$store.dispatch('dock/ClearUserState')
      sessionStorage.clear()
    },
  },
}
</script>

<style lang="less">
#user-option-wrapper {
  z-index: 999999;
  font-size: 13px;
  background: white;
  box-shadow: rgb(0 0 0 / 5%) 0px 9px 28px 8px, rgb(0 0 0 / 8%) 0px 6px 16px,
    rgb(0 0 0 / 12%) 0px 3px 6px -4px;
  padding: 3px 0;

  .select-box-item {
    cursor: pointer;
    height: 30px;
    transition: all ease-in-out 0.3s;
    padding: 0.3em 1.2em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    &:hover {
      background: #f5f5f5;

      svg * {
        fill: #337ff3 !important;
      }
    }
  }

  svg {
    margin-right: 16px;
  }
}
</style>
