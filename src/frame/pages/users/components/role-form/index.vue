<template>
  <el-dialog v-model="isShow">
    <el-form ref="formRef" :rules="rules" :model="roleForm" label-width="80px">
      <el-form-item label="角色名称" prop="roName">
        <el-input v-model="roleForm.roName" />
      </el-form-item>
      <el-form-item prop="sort">
        <el-button type="info" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">{{ roleForm.id ? '更新角色' : '新增角色' }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { addRoleAsync, updRoleAsync } from '@/apis/system/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['refresh'],
  setup(props, { emit }) {
    const formRef = ref<any>(null)

    const isShow = ref(false)
    const roleForm = ref<any>({})
    const rules = {
      name: [
        { required: true, message: '请输入角色名称' }
      ]
    }
  
    const resetValue = () => {
      roleForm.value = {}
      isShow.value = true
    }

    const setValue = (role: RoleModel) => {
      roleForm.value = { ...role }
      isShow.value = true
    }

    const submit = () => {
      formRef.value.validate(async(valid: boolean) => {
        if (!valid) {
          return
        }

        const innerForm = { ...roleForm.value }
        let keyWord = ''
        let api = null
        if (innerForm.id) {
          keyWord = '更新'
          api = updRoleAsync
        } else {
          keyWord = '新增'
          api = addRoleAsync
        }
        await ElMessageBox.confirm(`是否确定${keyWord}角色？`, '提示', {
          type: 'success'
        })
        await api(innerForm)
        ElMessage.success(`${keyWord}角色成功`)
        isShow.value = false
        emit('refresh')
      })
    }

    return {
      formRef,
      isShow,
      roleForm,
      rules,

      resetValue,
      setValue,
      submit
    }
  }
})
</script>
