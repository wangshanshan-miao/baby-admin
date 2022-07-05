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
          label: '商品图片',
          renderFn(row) {
            return (
              <img style="width:3em;height:3em;" src="https://img0.baidu.com/it/u=8212649,2817595929&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"/>
            )
          }
        },
        // render渲染字段
        {
          label: '商品名称',
          renderFn(row) {
            return (
              <span>{ row.address }</span>
            )
          }
        },
        {
          label: '商品规格',
          renderFn(row) {
            return (
              <span>{ row.address1 }</span>
            )
          }
        },
        {
          label: '商品代码',
          renderFn(row) {
            return (
              <span>{ row.address2 }</span>
            )
          }
        },
        {
          label: '商品描述',
          renderFn(row) {
            return (
              <span>{ row.contactPhone3 }</span>
            )
          }
        },
        {
          label: '数量（发放/库存）',
          renderFn(row) {
            return (
              <span>{ row.contactPhone1 }</span>
            )
          }
        },
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
          label: '产品名',
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
        {
          label: '产品规格',
          prop: 'ro1',
          eType: 'el-input',

          // 布局属性
          col: {
            span: 24
          },
          style: {
            width: '100%'
          }
        },
        {
          label: '产品代码',
          prop: 'roCode',
          eType: 'el-input',
          col: {
            span: 24
          },
          style: {
            width: '100%'
          }
        },
        {
          label: '品牌',
          prop: 'roCode',
          eType: 'el-input',
          col: {
            span: 24
          },
          style: {
            width: '100%'
          }
        },
        {
          eType: 'img-upload',
          prop: 'img',
          label: '商品图',
          props: {
            // 多图模式
            mult: true
          }
        },
        {
          label: '商品描述',
          prop: 'desc',
          eType: 'el-input',
          props:{
            type:'textarea'
          },
          col: {
            span: 24
          },
          style: {
            width: '100%'
          }
        },
        {
          label: '是否启用',
          prop: 'desc1',
          eType: 'el-switch',
          col: {
            span: 24
          },
          style: {
            width: '100%'
          }
        },
        {
          label: '是否限制',
          prop: 'desc2',
          eType: 'el-switch',
          col: {
            span: 24
          },
          style: {
            width: '100%'
          }
        },
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
