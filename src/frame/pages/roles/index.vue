<script setup lang="ts">

  import { defineConfig } from '@juzhenfe/page-model';
  import { nextTick, onMounted, ref } from 'vue';
  import PowerForm from './components/power-form.vue'

  const powerFormRef = ref<any>(null)
  const config = defineConfig<RoleModel>({
    url: '/api/Permissions/Roles',
    size: 'small',
    delKey: 'id',
    table: {
      operate: {
        els: [
          {
            text: '编辑',
            isEdit: true,
            props: {
              type: 'text'
            }
          },
          {
            text: '删除',
            isDel: true,
            props: {
              type: 'text'
            }
          },
          {
            text: '权限',
            event: 'power',
            props: {
              type: 'text'
            }
          }
        ]
      },
      els: [
        {
          prop: 'name',
          label: '角色名称'
        },
      ]
    },
    form: {
      mode: 'dialog',
      dialogProps: {
        title: '角色'
      },
      required: ['name'],
      els: [
        {
          eType: 'el-input',
          prop: 'name',
          label: '角色名称'
        }
      ]
    }
  })

  const editPower = (role: RoleModel) => {
    powerFormRef.value.setValue(role)
  }

</script>

<template>
  <div style="height: 100%">
    <page-model v-if="config" ref="pageModelRef" :config="config" @power="editPower"></page-model>

    <!-- 权限表单 -->
    <power-form ref="powerFormRef" />
  </div>
</template>
