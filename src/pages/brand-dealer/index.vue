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
    addButton: {
        text: "新建品牌商",
        props: {
            type: 'primary'
        }
    },
    searchForm:{
      els:[
        {
          // 组件类型为 el-input
            eType: 'el-input',
            // 搜索项的标签
            label: '品牌商',
            // 字段名称
            prop: 'store',
            // 组件el-input的props
            props: {
              placeholder: '品牌商',
            },
            // 组件el-input的事件
            events: {
              // 监听值的改变
              change(val) {
                console.log(val)
                // changeQuery(val)
              }
            },
            // 组件el-input的样式
            style: {
              width: '200px' 
            }
          }
      ]
    },
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
          },
          {
            text: '结束',
            isEdit: true,
            props: {
              type: 'primary',
            }
          }
        ]
      },
      els: [
        {
          label: '品牌商',
          prop: 'roCode'
        },
        {
          label: '创建时间',
          renderFn(row) {
            return (
              <span>{ row.address }</span>
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
        console.log(this,formData,'绑定数据钩子函数')
        return formData
      },

      // 表单数据提交前的钩子函数
      async beforeSubmit(formData) {
        // this 指向表单管理器
        console.log(this,formData,'表单数据提交前的钩子函数')
        return formData
      },

      // 表单元素成员
      els: [
        // 普通输入框例子
        {
          label: '品牌商',
          prop: 'roName',
          eType: 'el-select',

          // 布局属性
          col: {
            span: 24
          },

          // 控制组件根元素的样式
          style: {
            width: '100%'
          }
        }
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
