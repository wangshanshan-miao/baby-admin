<script lang="ts">

export default {
  name: 'ToolsBar'
}
</script>

<script setup lang="ts">
import createBEMNameSpace from '@/frame/utils/bem';

const { BEMSpace, createBEMName } = createBEMNameSpace('tools-bar')


</script>

<template>
  <div :class="BEMSpace">
    tools-bar
  </div>
</template>
