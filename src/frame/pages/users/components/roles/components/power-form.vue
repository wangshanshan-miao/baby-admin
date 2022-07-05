<template>
  <el-dialog v-model="isShow" title="角色权限">
    <el-form
      :model="powerForm"
      label-width="100px"
    >
      <el-form-item label="可查看页面">
        <el-tree
          ref="powerTree"
          :data="menus"
          :props="{
            label: 'muName',
            children: 'childs'
          }"
          check-strictly
          empty-text="加载中.."
          show-checkbox
          node-key="muCode"
          :expand-on-click-node="false"
          :default-expand-all="true"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">更新权限</el-button>
        <el-button type="primary" @click="chooseAll">全选</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { getMenuAsync, getRolePwerAsync } from '@/apis/system/menu'
import { getRoleMenuAsync, removeRoleMenuAsync, updateRolePowerAsync, updRoleMenuAsync } from '@/apis/system/role'
import { tree, flatList } from '@/frame/utils'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const store = useUserStore()
    const isShow = ref(false)
    const powerForm =  ref<any>({})
    const powerTree = ref<any>(null)
    const menus = ref<MenuModel[]>([])
    const menuIds = ref<string[]>([])
    let currentRole: RoleModel
    let totalMenuIds: string[] = []

    const setValue = (role: RoleModel) => {
      currentRole = role
      isShow.value = true
      getMenus()
    }

    const getMenus = async () => {
      const [totalMenu, powers] = await Promise.all([
        getMenuAsync(),
        getRolePwerAsync({
          roCode: currentRole.roCode
        })
      ])

      const allowedCodes = powers?.muCode?.split(',') ?? []

      if (totalMenu) {
        totalMenuIds = totalMenu.map(a => a.muCode)
        menus.value = tree(totalMenu, 'muCode', 'pmuCode', 'childs')
      } else {
        menus.value = []
      }

      // 设置选中项
      powerTree.value.setCheckedKeys(allowedCodes)
    }

    const chooseAll = () => {
      powerTree.value.setCheckedKeys(totalMenuIds)
    }

    const submit = async () => {
      const selectedMenus: MenuModel[] = powerTree.value.getCheckedNodes()

      // 更新权限
      await updateRolePowerAsync({
        roCode: currentRole.roCode,
        muCode: selectedMenus.map(a => a.muCode).join(',') || 'null'
      })
      ElMessage.success('更新权限成功!')
      isShow.value = false
    }

    return {
      isShow,
      powerForm,
      powerTree,
      menus,

      setValue,
      chooseAll,
      submit
    }
  }
})
</script>
