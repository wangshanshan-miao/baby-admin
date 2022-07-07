
<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
  import { defineConfig } from '@juzhenfe/page-model'
  import { reactive,ref } from 'vue';
  // 为配置项提供反射数据源
  const reflections = reactive<{
    roleList: BrandResultModel[]
  }>({
    roleList: []
  });

  const getData = async () => {
    const result = await processdRequest.post<BrandResultModel[]>('/System/GetRolesListInAdmin', {
      pageIndex: 1,
      pageSize: 2,
      brandName,
    })
    console.log(result,'1111')
    reflections.roleList = result
  }

  const config = defineConfig<BrandResultModel>({
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
    searchForm:{
      els:[
        {
          eType: 'el-input',
          label: '活动名',
          prop: 'activityName',
          props: {
            placeholder: '活动名',
          },
          events: {
            change(val) {
              console.log(val)
            }
          },
          style: {
            width: '200px' 
          }
        },
        {
          eType: 'el-input',
          label: '姓名',
          prop: 'name',
          props: {
            placeholder: '姓名',
          },
          events: {
            change(val) {
              console.log(val)
            }
          },
          style: {
            width: '200px' 
          }
        },
        {
          eType: 'el-input',
          label: '收件人',
          prop: 'recive',
          props: {
            placeholder: '收件人',
          },
          events: {
            change(val) {
              console.log(val)
            }
          },
          style: {
            width: '200px' 
          }
        },
        {
          eType: 'el-date-picker',
          label: '时间',
          prop: 'activityName',
          props: {
             type:"daterange"
          },
          events: {
            change(val) {
              console.log(val)
            }
          },
          style: {
            width: '200px' 
          }
        },
          
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
          }
        ]
      },
      // 表格的列成员
      els: [
        // 普通表格字段
        {
          label: '活动名',
          prop: 'roCode'
        },
        // render渲染字段
        {
          label: '姓名',
          prop: 'roname'
        },
        {
          label: '收件人',
          renderFn(row) {
            return (
              <span>{ row.name }</span>
            )
          }
        },
        {
          label: '手机号',
          renderFn(row) {
            return (
              <span>{ row.phone }</span>
            )
          }
        },
        {
          label: '地址',
          renderFn(row) {
            return (
              <span>{ row.address }</span>
            )
          }
        },
        {
          label: '领取时间',
          renderFn(row) {
            return (
              <span>{ row.contactPhone1 }</span>
            )
          }
        },
        {
          label: '发货时间',
          renderFn(row) {
            return (
              <span>{ row.contactPhone1 }</span>
            )
          }
        }
      ]
    },
    // 是否存在表单
    hasForm: false,
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
          label: '幻灯片名称',
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

        // 图片上传
        {
          eType: 'img-upload',
          prop: 'img',
          label: '幻灯片图片',
          props: {
            // 多图模式
            mult: true
          }
        },
        // 下拉选择
        // 普通下拉,静态数据支撑
        {
          eType: 'el-select',
          prop: 'roName2',
          label: '显示位置',

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
        {
          label: '是否启用',
          prop: 'roName',
          eType: 'el-switch',
          // 布局属性
          col: {
            span: 24
          },
          // 控制组件根元素的样式
          style: {
            width: '100%'
          }
        },
        // 普通输入框例子
        {
          label: '排序',
          prop: 'location',
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
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
