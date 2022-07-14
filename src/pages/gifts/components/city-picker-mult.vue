<script lang="ts">
export default {
  name: 'CityPickerMult',
}
</script>

<script setup lang="ts">
import { Utils } from '@juzhenfe/modules'
import { ref, computed, watch } from 'vue'

type ExtendCityItem = CityItem & {
  disabled: boolean
}

type Props = {
  codes: string[]
}

const elTreeRef = ref<any>()

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:codes', val: string[]): void;
}>()

const citySourceData = ref<ExtendCityItem[]>([])

if (!citySourceData.value.length) {
  // 读取资源
  Utils.loadResource<string>('city.json', [
    '.'
  ]).then((res) => {
    if (!res) {
      return false
    }
    // 处理成二级
    let city: ExtendCityItem[] = JSON.parse(res)
    citySourceData.value = city.map(item => {
      item.disabled = true
      item.children?.forEach(iitem => {
        delete iitem.children
      })
      return item
    })
  })
}

function setCheckedKeys(codes: string[]) {
  if (elTreeRef.value && citySourceData.value) {
    elTreeRef.value.setCheckedKeys(codes)
  } else {
    setTimeout(() => {
      setCheckedKeys(codes)
    }, 20);
  }
}

watch(
  () => props.codes,
  (codes) => {
    if (codes) {
      setCheckedKeys(codes)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const onCheckChange = () => {
  const checkedKeys = elTreeRef.value.getCheckedKeys()
  emit('update:codes', checkedKeys)
}

</script>

<template>
  <div class="city-picker-mult">
    <el-tree
      ref="elTreeRef"
      :data="citySourceData"
      show-checkbox
      check-strictly
      node-key="value"
      @check-change="onCheckChange"
    >
    </el-tree>
  </div>
</template>

<style lang="scss" scoped>
.city-picker-mult {
  flex-grow: 1;
  width: 0;
}
.el-tree {
  display: block;
  width: 100%;

  ::v-deep .el-tree-node {
    display: inline-block;
    vertical-align: top;
    width: 50%;
  }

  ::v-deep .el-tree-node__children {
    white-space: pre-wrap;
  }

  & > ::v-deep .el-tree-node {
    display: inline-block;
    vertical-align: top;
    width: 33.3%;
  }
}

</style>