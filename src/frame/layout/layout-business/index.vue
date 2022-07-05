<script lang="ts">
export default {
  name: 'LayoutBusiness'
}
</script>

<script setup lang="ts">

import NavBar from '../components/nav-bar/index.vue'
import AsideMenu from './components/aside-menus/index.vue'
import MainContent from '../components/main-content/index.vue'
import TagViews from '../components/tag-views/index.vue'

import createBEMNameSpace from '@/frame/utils/bem'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useUserStore } from '@/store/user'

const { BEMSpace, createBEMName } = createBEMNameSpace('layout-a')

const route = useRoute()
const store = useUserStore()

const isDashboard = computed(() => {
  return route.path === '/dashboard'
})

watch(() => route.path, () => {
  store.updateCurrentMenu()
}, {
  immediate: true
})

</script>

<template>
  <div :class="BEMSpace">
    <nav-bar :class="createBEMName('nav-bar')" />
    <div :class="createBEMName('content-wrap')">
      <aside-menu :class="[createBEMName('aside-menu')]" />
      <div :class="createBEMName('main-wrap')">
        <main-content :class="createBEMName('main')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.layout-a {
  height: 100%;
  @include flex-direction;
  background-color: #fff;
  // min-width: 1200px;
}

.layout-a__nav-bar {
  @include fs0;
}

.layout-a__content-wrap {
  @include flex;
  @include fg1;
  height: 0;
}

.layout-a__aside-menu {
  @include fs0;
}

.layout-a__main-wrap {
  @include fg1;
  width: 0;
  @include flex-direction;
  border: 10px solid var(--pageBg);
}

.layout-a__tag-views {
  flex-shrink: 0;
}

.layout-a__main {
  flex-grow: 1;
  height: 0;
}

</style>