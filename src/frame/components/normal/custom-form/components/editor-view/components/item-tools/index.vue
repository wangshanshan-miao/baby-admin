<script lang="ts">
export default {
  name: 'ItemTools'
}
</script>

<script setup lang="ts">
import { MoreFilled, Delete } from '@element-plus/icons-vue'
import createBEMNameSpace from '@/frame/utils/bem';

const { BEMSpace, createBEMName } = createBEMNameSpace('item-tools')

const emit = defineEmits<{
  (e: string): void;
}>()

const tools = [
  {
    title: '删除',
    icon: Delete,
    command: 'delete'
  }
]

const onExecCommand = (index: number) => {
  const command = tools[index].command
  emit(command)
}

</script>

<template>
  <div :class="BEMSpace">
    <slot />

    <!-- 覆盖组件上层 -->
    <div :class="createBEMName('mask')" />

    <!-- 列表 -->
    <el-popover
      placement="bottom-start"
      trigger="hover"
      popper-class="grid-tool-pop"
      :offset="4"
    >
      <template #reference>
        <div :class="createBEMName('trigger')">
          <el-icon>
            <MoreFilled />
          </el-icon>
        </div>
      </template>

      <div :class="createBEMName('list')">
        <div v-for="(tool, index) in tools" :key="index" :class="createBEMName('item')" @click="onExecCommand(index)">
          <el-icon :class="createBEMName('icon')">
            <component :is="tool.icon" />
          </el-icon>
          <span :class="createBEMName('text')">{{ tool.title }}</span>
        </div>
      </div>

    </el-popover>
  </div>
</template>

<style lang="scss">
.grid-tool-pop {
  padding: 0 !important;
  min-width: auto !important;
  width: auto !important;
}
</style>

<style lang="scss" scoped>
.item-tools {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 10%);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 1px 1px 5px 2px rgb(0 0 0 / 10%);
  }
}

.item-tools__trigger {
  position: absolute;
  top: 4px;
  right: 0px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #999;
  cursor: pointer;
  z-index: 2;
}

.item-tools__mask {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.item-tools__list {
  padding: 4px 0;
}

.item-tools__item {
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 12px;
  padding: 0 18px 0 12px;
  @include flex-c-center;
  transition: background-color .3s;

  &:hover {
    background-color: #f3f3f3;
  }
}

.item-tools__text {
  margin-left: 6px;
}

</style>