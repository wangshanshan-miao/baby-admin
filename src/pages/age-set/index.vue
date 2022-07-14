
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
    getUrl: '/ConfigControler​/GetAgeConfigList',
    // 新增数据的api
    addUrl: '/ConfigControler/AddAgeConfig',
    // 更新数据的api
    updUrl: '/ConfigControler/UpdateAgeConfig',
    // 删除数据的api
    delUrl: '/ConfigControler/DeleteAgeConfig',
    // 删除数据api所需要的参数字段
    delKey: 'id',
    addButton: {
        text: "新增",
        props: {
            type: 'primary'
        }
    },
    tabs: {
        // 可选
        props: {
            // 配置eltabs的参数
            // 如 type: 'card'
        },
        // 根据panes构建el-tab-pane
        panes: [
            {
            label: '婴儿年龄范围',
            value: {
                ageType: 1
            }
            },
            {
            label: '孕周范围',
            value: {
                ageType: 0
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
      //  ""ageType"": 0  //0=孕妈，1=宝妈
      els: [
        // 普通表格字段
        {
          label: '婴儿年龄范围',
          prop: 'slideageNameName',
        },
        // render渲染字段
        {
          label: '创建时间',
          prop: 'createTime',
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
        'ageName','ageType'
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
        {
          label: '婴儿年龄范围',
          prop: 'ageName',
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
          eType: 'el-select',
          prop: 'ageType',
          label: '类型',

          // select组件的属性
          props: {
            filterable: true,
            clearable: true
          },
          optionsData: {
            list: [
              {
                label: '孕妈',
                value: 0
              },
              {
                label: '宝妈',
                value: 1
              }
            ]
          }
        },
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
