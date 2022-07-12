
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
        text: "新增年龄配置",
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
            label: '未处理订单',
            value: {
                status: '未处理'
            }
            },
            {
            label: '处理中订单',
            value: {
                status: '处理中'
            }
            },
            {
            label: '已处理订单',
            value: {
                status: '已处理'
            }
            }
        ]
    },
    searchForm:{
      els:[
        {
          // 组件类型为 el-input
            eType: 'el-input',
            // 搜索项的标签
            label: '幻灯片名称',
            // 字段名称
            prop: 'slideName',
            // 组件el-input的props
            props: {
              placeholder: '幻灯片名称',
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
          }
        ]
      },
      // 表格的列成员
      els: [
        // 普通表格字段
        {
          label: '幻灯片名称',
          prop: 'slideName'
        },
        // render渲染字段
        {
          label: '幻灯片照片',
          renderFn(row) {
            return (
              <img style="width:3em;height:3em;" src={ row.slideImg }/>
            )
          }
        },
        {
          label: '显示位置',
          renderFn(row) {
            if(row.showPosition ==0) {
              return (
                <span>首页</span>
              )
            }else {
              return (
                <span>个人中心</span>
              )
            }
            
          }
        },
        {
          label: '是否启用',
          renderFn(row) {
            if (row.isOpen) {
              return (
                <span>是</span>
              )
            } else {
              return (
                <span>否</span>
              )
            }
          }
        },
        {
          label: '排序',
          prop: 'sort'
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
        'slideName','slideImg','showPosition', 'sort'
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
          prop: 'slideName',
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
          prop: 'slideImg',
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
          prop: 'showPosition',
          label: '显示位置',

          // select组件的属性
          props: {
            filterable: true,
            clearable: true
          },
          optionsData: {
            list: [
              {
                label: '首页',
                value: 0
              },
              {
                label: '个人中心',
                value: 1
              }
            ]
          }
        },
        {
          label: '是否启用',
          prop: 'isOpen',
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
          prop: 'sort',
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
