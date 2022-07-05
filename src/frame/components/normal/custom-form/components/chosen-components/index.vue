<script lang="ts">
export default {
  name: 'ChosenComponents',
}
</script>

<script setup lang="ts">
import createBEMNameSpace from '@/frame/utils/bem'
import { getTimestamp } from '@/frame/utils/date-helper'
import { dragEvent } from '../../utils'
import components from './components'

const { BEMSpace, createBEMName } = createBEMNameSpace('chosen-components')

// props
interface Props {
  layout: CustomForm.ComponentItem[];
  colNum: number;
}
const props = defineProps<Props>()

// emits
const emit = defineEmits<{
  (e: 'add', item: CustomForm.ComponentItem): void
  (e: 'replace-all', items: CustomForm.ComponentItem[]): void
}>()

// layout items组件
let layoutItemRefs: any[] = []
// layout组件
let gridLayoutRef: any
// layout组件根元素
let gridLayoutEl: HTMLDivElement

let DragPos: any = {}

dragEvent.on('get-items', (items: any) => {
  layoutItemRefs = items
})

dragEvent.on('get-layout', (instance: any) => {
  gridLayoutRef = instance
  gridLayoutEl = instance.$el
})

const onDrag = (index: number, iindex: number, event: DragEvent) => {
  const addComponent = components[index].children[iindex]
  const layout = props.layout

  // 是否在grid中
  let mouseInGrid = false

  const parentRect = gridLayoutEl.getBoundingClientRect()

  if (
    event.x > parentRect.left &&
    event.x < parentRect.right &&
    event.y > parentRect.top &&
    event.y < parentRect.bottom
  ) {
    mouseInGrid = true
  }

  if ( mouseInGrid && layout.findIndex((item) => item.i === 'drop') === -1) {
    emit('add', {
      x: (layout.length * 2) % props.colNum,
      y: layout.length + props.colNum,
      ...addComponent.init,
      i: 'drop',
      label: '',
      prop: '',
      eType: '',
    })
  }

  let fIndex = layout.findIndex((item) => item.i === 'drop')

  if (fIndex !== -1 && layoutItemRefs[index]) {
    let layoutItemRef = layoutItemRefs[index]

    layoutItemRef.dragging = {
      top: event.y - parentRect.top,
      left: event.x - parentRect.left,
    }

    let new_pos = layoutItemRef.calcXY(
      event.y - parentRect.top,
      event.x - parentRect.left
    )

    if (mouseInGrid) {
      gridLayoutRef.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, addComponent.init.h, addComponent.init.w)
      DragPos.x = new_pos.x
      DragPos.y = new_pos.y
    } else {
      // gridLayoutRef.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, addComponent.init.h, addComponent.init.w)
      // emit('replace-all', layout.filter((obj) => obj.i !== 'drop'))
    }
  }
}

const onDragend = (index: number, iindex: number, event: DragEvent) => {
  const addComponent = components[index].children[iindex]
  const layout = props.layout
  const parentRect = gridLayoutEl.getBoundingClientRect()

  let mouseInGrid = false
  if (
    event.x > parentRect.left &&
    event.x < parentRect.right &&
    event.y > parentRect.top &&
    event.y < parentRect.bottom
  ) {
    mouseInGrid = true
  }

  if (mouseInGrid) {
    gridLayoutRef.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, addComponent.init.h, addComponent.init.w)
    emit('replace-all', layout.filter((obj) => obj.i !== 'drop'))

    emit('add', {
      x: DragPos.x,
      y: DragPos.y,
      ...addComponent.init,
      i: getTimestamp(),
      label: addComponent.title,
      prop: `prop-${addComponent.init.eType}-${DragPos.i}`,
      eType: addComponent.init.eType,
    })

    gridLayoutRef.dragEvent(
      'dragend',
      DragPos.i,
      DragPos.x,
      DragPos.y,
      addComponent.init.h,
      addComponent.init.w,
    )
  }
}
</script>

<template>
  <div :class="BEMSpace">
    <div
      v-for="(module, index) in components"
      :key="index"
      :class="createBEMName('modules')"
    >
      <div :class="createBEMName('type-title')">
        <span>{{ module.title }}</span>
      </div>
      <ul :class="createBEMName('list')">
        <li
          v-for="(comp, iindex) in module.children"
          :key="iindex"
          :class="createBEMName('item')"
          draggable="true"
          unselectable="on"
          @drag="onDrag(index, iindex, $event)"
          @dragend="onDragend(index, iindex, $event)"
        >
          <span>{{ comp.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chosen-components {
  padding: 10px;
}

.chosen-components__modules {
  font-size: 14px;
  & + .chosen-components__modules {
    margin-top: 20px;
  }
}

.chosen-components__list {
  margin-top: 10px;
  font-size: 0;
}

.chosen-components__item {
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  width: calc(50% - 4px);
  background-color: #f4f6fc;
  border: 1px solid #f4f6fc;
  line-height: 30px;
  color: #333;
  padding-left: 10px;
  box-sizing: border-box;
  cursor: move;
  user-select: none;

  &:nth-child(odd) {
    margin-right: 4px;
  }
}
</style>
