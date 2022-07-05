<script lang="ts">
export default {
  name: 'EditView',
}
</script>

<script setup lang="ts">
import ToolsBar from './components/tools-bar/index.vue'
import ItemTools from './components/item-tools/index.vue'

import createBEMNameSpace from '@/frame/utils/bem'
import { nextTick, onBeforeUpdate, onMounted, onUpdated, ref, toRefs, watch } from 'vue'
import { dragEvent } from '../../utils'

const { BEMSpace, createBEMName } = createBEMNameSpace('editor-view')

interface Props {
  layout: CustomForm.ComponentItem[];
  colNum: number;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', index: number): void;
}>()

const {
  layout
} = toRefs(props)

// layout组件引用
const gridlayoutRef = ref<any>()
onMounted(() => {
  nextTick(() => {
    dragEvent.emit('get-layout', gridlayoutRef.value)
  })
})

// layoutitems组件引用
const gridItems = ref<any[]>([])
const setItem = (item: any) => {
  item && gridItems.value.push(item)
}

onBeforeUpdate(() => {
  gridItems.value = []
})

onUpdated(() => {
  dragEvent.emit('get-items', gridItems.value)
})

const onDelete = (index: number) => {
  emit('delete', index)
}

</script>

<template>
  <div :class="BEMSpace">
    <tools-bar :class="createBEMName('toolsbar')" />

    <grid-layout
      ref="gridlayoutRef"
      :layout.sync="layout"
      :class="createBEMName('list')"
      :col-num="props.colNum"
      :row-height="5"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="item.i"
        :ref="setItem"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <item-tools v-if="item.eType" @delete="onDelete(index)">
          <component :is="item.eType" v-bind="item.props" />
        </item-tools>
      </grid-item>
    </grid-layout>
  </div>
</template>

<style lang="scss" scoped>
.editor-view {
  @include flex-direction;
}

.editor-view__toolsbar {
  @include fs0;
  height: 45px;
  border-bottom: 2px solid #e4e7ed;
  box-sizing: border-box;
}

.editor-view__list {
  flex-grow: 1;
  height: 0;
}
</style>
