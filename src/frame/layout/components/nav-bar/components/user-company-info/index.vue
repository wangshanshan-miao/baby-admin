<script lang="ts">
export default {
  name: 'UserCompanyInfo'
}
</script>

<script setup lang="ts">
import createBEMNameSpace from '@/frame/utils/bem';
import { useResourceStore } from '@/store/resource';
import { useSystemStore } from '@/store/system';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const { BEMSpace, createBEMName } = createBEMNameSpace('baseinfo')

const resourceStoreState = useResourceStore()

const project = computed(() => {
  return resourceStoreState.project
})

const logoPath = computed(() => {
  return `/imgs/${project.value.path}/logo.svg`
})

const router = useRouter()

const toHome = () => {
  router.push('/')
}

</script>


<template>

<div :class="BEMSpace" @click="toHome">
  <div v-if="logoPath" :class="createBEMName('avatar')" :style="{ backgroundImage: `url(${logoPath})` }"></div>
  <div :class="createBEMName('company')">
    <span>{{ project.desc }}</span>
  </div>
</div>

</template>


<style lang="scss" scoped>

.baseinfo {
  @include flex-c-center;
  padding-left: 10px;
  cursor: pointer;
}

.baseinfo__avatar {
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-right: 10px;
}

.baseinfo__company {
  font-weight: 900;
  font-size: 16px;
}

</style>