<template>
  <div v-if="currentPageStatus === STATUS_200" :class="[BEMSpace, createBEMName('200')]">
    <slot />
  </div>

  <div v-else-if="currentPageStatus === STATUS_403" :class="[BEMSpace, createBEMName('403')]">
    <div :class="[createBEMName('status')]">
      <jz-icon icon="fa-solid fa-4" :fontSize="80" />
      <jz-icon icon="fa-solid fa-0" :fontSize="80" />
      <jz-icon icon="fa-solid fa-3" :fontSize="80" />
    </div>
    <div :class="createBEMName('help-text')">您无权限访问</div>
    <jz-icon icon="fa-solid fa-lock" :fontSize="60"></jz-icon>
  </div>

  <div v-else-if="currentPageStatus === STATUS_500" :class="[BEMSpace, createBEMName('500')]">
    <div :class="[createBEMName('status')]">
      <jz-icon icon="fa-solid fa-5" :fontSize="80" />
      <jz-icon icon="fa-solid fa-0" :fontSize="80" />
      <jz-icon icon="fa-solid fa-0" :fontSize="80" />
    </div>
    <div :class="createBEMName('help-text')">系统出现了一些错误</div>
    <jz-icon icon="fa-solid fa-bug" :fontSize="60"></jz-icon>
  </div>
</template>

<script lang="ts">
export default {
  name: 'JzPageStatus'
}
</script>

<script setup lang="ts">

import createBEMNameSpace from '@/frame/utils/bem';
import { STATUS_200, STATUS_403, STATUS_500, useAppStore } from '@/store/app';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const appStore = useAppStore()

const { BEMSpace, createBEMName } = createBEMNameSpace('jz-page-status')

const router = useRoute()

const currentPageStatus = computed(() => {
  return appStore.pagesStatus[router.name as string]?.status ?? STATUS_200
})

</script>

<style lang="scss" scoped>

.jz-page-status {
  height: 100%;
}

.jz-page-status {
  &.jz-page-status__500, &.jz-page-status__403 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

.fa-lock {
  color: rgb(249, 193, 97);
  margin-top: 30px;
}

.fa-bug {
  color: #999;
  margin-top: 30px;
}

.jz-page-status__status {
  color: rgb(230, 88, 88);
}

.jz-page-status__help-text {
  margin-top: 20px;
  font-size: 20px;
  color: #333;
  font-style: italic;
}

</style>
