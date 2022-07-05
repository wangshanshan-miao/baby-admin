<script lang="ts">

export default {
  name: 'CustomForm'
}
</script>

<script setup lang="ts">
import ChosenComponents from './components/chosen-components/index.vue'
import EditorView from './components/editor-view/index.vue'
import ComponentConfigEditor from './components/component-config-editor/index.vue'

import createBEMNameSpace from '@/frame/utils/bem';
import { reactive, ref } from 'vue';
import { jsonClone } from '@/frame/utils';

const { BEMSpace, createBEMName } = createBEMNameSpace('custom-form')

const layout = ref<CustomForm.ComponentItem[]>([])

const colNum = ref(24)

const onAddItem = (item: CustomForm.ComponentItem) => {
  const newlayout = jsonClone(layout.value)
  newlayout.push(item)
  layout.value = newlayout
}

const onDeleteItem = (index: number) => {
  const newlayout = jsonClone(layout.value)
  newlayout.splice(index, 1)
  layout.value = newlayout
}

const onReplaceAll = (layouts: CustomForm.ComponentItem[]) => {
  layout.value = layouts
}

</script>

<template>
  <div :class="BEMSpace">
    <chosen-components :class="createBEMName('chosen')" :layout="layout" :colNum="colNum" @add="onAddItem" @replace-all="onReplaceAll" />
    <editor-view :class="createBEMName('editor-view')" :layout="layout" :colNum="colNum" @delete="onDeleteItem" />
    <component-config-editor :class="createBEMName('comp-config-editor')" />
  </div>
</template>

<style lang="scss" scoped>
.custom-form {
  width: 100%;
  height: 100%;

  @include flex;
}

.custom-form__chosen {
  @include fs0;
  width: 220px;
}

.custom-form__editor-view {
  @include fg1;
  width: 0;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.custom-form__comp-config-editor {
  @include fs0;
  width: 300px;
}
</style>