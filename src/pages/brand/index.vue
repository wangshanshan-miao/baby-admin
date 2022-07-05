<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
import { defineConfig } from '@juzhenfe/page-model'
import { reactive } from 'vue';

  // 为配置项提供反射数据源
  const reflections = reactive<{
    roleList: TestRoleResultModel[]
  }>({
    roleList: []
  })

  // 接口获取下拉列表数据
  ;(async () => {
    const result = await processdRequest.post<TestRoleResultModel[]>('/System/GetRolesListInAdmin', {
      pageIndex: 1,
      pageSize: 2
    })
    reflections.roleList = result
  })()

  const config = defineConfig<TestRoleResultModel>({
    // 启用反射数据源,需要为pageModel注入reflections
    reflect: true,

    // 页面的整体尺寸
    size: 'default',

    // 获取列表的api
    getUrl: '/System/GetRolesListInAdmin',
    // 新增数据的api
    addUrl: '/System/AddRolesInAdmin',
    // 更新数据的api
    updUrl: '/System/UpdateRolesInAdmin',
    // 删除数据的api
    delUrl: '/System/DelRolesInAdmin',
    // 删除数据api所需要的参数字段
    delKey: 'roCode',
    table: {
      // 表格操作栏
      operate: {
        els: [
          {
            text: '编辑',
            isEdit: true,
            props: {
              type: 'primary',
            }
          },
          {
            text: '删除',
            isDel: true,
            props: {
              type: 'danger',
            }
          }
        ]
      },
      // 表格的列成员
      els: [
        // 普通表格字段
        {
          label: '角色编码',
          width: 320,
          prop: 'roCode'
        },
        // render渲染字段
        {
          label: '员工名称',
          renderFn(row) {
            return (
              <span>{ row.roName }</span>
            )
          }
        }
      ]
    },
    // 是否存在表单
    hasForm: true,
    // 表单模型
    form: {

      // elForm的属性配置
      props: {
        labelWidth: '160px'
      },

      // 快速填写表单必填参数
      required: [
        'roName'
      ],

      // 表单模式 弹框和全页面
      mode: 'dialog',

      // 弹窗模式的参数配置
      dialogProps: {
        width: '600px'
      },

      // 绑定数据钩子函数
      async bindData(formData) {
        // this 指向表单管理器
        console.log(this)
        return formData
      },

      // 表单数据提交前的钩子函数
      async beforeSubmit(formData) {
        // this 指向表单管理器
        console.log(this)
        return formData
      },

      // 表单元素成员
      els: [

        // 普通输入框例子
        {
          label: '角色名称',
          prop: 'roName',
          eType: 'el-input',

          // 布局属性
          col: {
            span: 24
          },

          // 控制组件根元素的样式
          style: {
            width: '100%'
          }
        },

        // 下拉选择
        // 普通下拉,静态数据支撑
        {
          eType: 'el-select',
          prop: 'roName2',
          label: '静态数据下拉',

          // select组件的属性
          props: {
            filterable: true,
            clearable: true
          },
          optionsData: {
            list: [
              {
                label: '下拉选项1',
                value: '选项1'
              },
              {
                label: '下拉选项2',
                value: '选项2'
              }
            ]
          }
        },

        // 下拉选择
        // 接口数据支撑下拉
        {
          eType: 'el-select',
          prop: 'roName3',
          label: '接口数据下拉',
          props: {
            filterable: true,
            clearable: true
          },
          optionsData: {
            list: [],
            _reflect: 'roleList',
            label: 'roName',
            value: 'roName'
          }
        },

        // 图片上传
        {
          eType: 'img-upload',
          prop: 'img',
          label: '图片',
          props: {
            // 多图模式
            mult: true
          }
        }
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
