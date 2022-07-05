<template>
  <div :class="BEMSpace" :style="{
    backgroundImage: `url(${bgPath})`
  }">
  
    <div :class="createBEMName('container')">

      <div class="slogan">
        <div class="line-one">塔盒科技<span style="width: 1em;display: inline-block;"></span>稳定高效</div>
        <div class="line-two">生产数字化<span style="width: 1em;display: inline-block;"></span>管理无纸化</div>
      </div>

      <div :class="createBEMName('content')">
        <el-card :class="createBEMName('card')" shadow="never">
          <div>
            <div :class="createBEMName('logo')">
              <img class="img" :src="logoPath" />
              <div class="compony">{{ project.name }}</div>
            </div>
            <div :class="createBEMName('title')">账号登录</div>
            <password-mode />
          </div>
        </el-card>
      </div>
    </div>

    <div class="copy-right">Copyright©1996-{{ currentYear }} All Rights Reserved. 版权所有 塔盒科技 网站备案：浙ICP备05016331号-2</div>

    <div id="particles-js"></div>
  </div>
</template>

<script setup lang="ts">

import createBEMNameSpace from '@/frame/utils/bem';
import { useResourceStore } from '@/store/resource';
import { computed, onMounted } from 'vue';
import PasswordMode from './components/password-mode/index.vue'

const { BEMSpace, createBEMName } = createBEMNameSpace('login')

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const resourceStoreState = useResourceStore()

const project = computed(() => {
  return resourceStoreState.project
})

const logoPath = computed(() => {
  return `/imgs/${project.value.path}/logo.svg`
})

const bgPath = computed(() => {
  return `/imgs/${project.value.path}/bg@3x.png`
})

onMounted(() => {
  window.particlesJS.load('particles-js', '/scripts/particles/particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
  });
})

</script>

<style lang="scss">

.login {
  position: relative;
  height: 100%;
  background-color: var(--loginBgColor);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  background-position: center;
}

.login__container {
  transition: all .3s;
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 1200px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.login__content {
  transition: all .3s;
}

.slogan {
  font-weight: 600;
  color: #fff;

  .line-one {
    font-size: 48px;
  }

  .line-two {
    font-size: 36px;
    margin-top: 20px;
  }
}

.login__title {
  font-size: 18px;
  font-weight: 600;
}

.login__card {
  height: 100%;
  border-radius: 15px !important;
  overflow: hidden;

  .el-card__body {
    height: 100%;
    padding: 50px 30px 60px;
    box-sizing: border-box;
  }

  .login__logo {
    text-align: center;
    margin-bottom: 30px;
    font-size: 0;

    .img {
      width: 86px;
      height: 86px;
    }

    .compony {
      font-size: 14px;
      color: #333333;
      font-weight: 600;
      margin-top: -6px;
    }
  }
}

.copy-right {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  bottom: 30px;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 2;
  text-align: center;
}

// 手机
@media screen and (max-width: 768px) {

  .login__container {
    justify-content: center;
  }

  .login__content {
    transform: scale(.8);
    transform-origin: top;
  }

  .slogan {
    display: none;
  }
}

// 平板
@media screen and (max-width: 1100px) {
  .login__container {
    justify-content: center;
  }

  .login__content {
    transform: scale(.8);
    transform-origin: top;
  }

  .slogan {
    display: none;
  }
}

// 小屏
@media screen and (max-width: 1500px) {
  .login__container {
    width: 1000px;
  }
}

#particles-js .particles-js-canvas-el {
  transform: scale(1);
  opacity: 1;
  animation: appear 1.4s 1;
  animation-fill-mode: forwards
}

@keyframes appear {
  0% { opacity: 0; transform: scale(.1) }
  100% { opacity: 1; transform: scale(1) }
}


// 打字效果
@keyframes typing-word {
  from {
    width: 0;
  }
}

@keyframes caret {
  50% {
    border-color: currentColor;
  }
}

@keyframes hidden {
  from {
    width: 0;
  }
  to {
    width: 0;
  }
}

.line-one {
  white-space: nowrap;
  overflow: hidden;
  width: 9em;
  animation: typing-word 1.5s steps(9), caret 1s 2;
  border-right: 1px solid transparent;
}

.line-two {
  white-space: nowrap;
  overflow: hidden;
  width: 11em;
  border-right: 1px solid transparent;
  animation: typing-word 1.5s steps(11) 1.5s, caret 1s linear 1.5s 2, hidden 1.5s 1;
}

</style>