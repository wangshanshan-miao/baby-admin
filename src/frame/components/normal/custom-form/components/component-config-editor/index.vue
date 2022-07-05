<script lang="ts">

export default {
  name: 'ComponentConfigEditor'
}
</script>

<script setup lang="ts">

import createBEMNameSpace from '@/frame/utils/bem';

const { BEMSpace, createBEMName } = createBEMNameSpace('com-config')

</script>

<template>
  <div :class="BEMSpace">
    ComponentConfigEditor
  </div>
</template>
