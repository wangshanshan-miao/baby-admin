<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
import { defineConfig } from '@juzhenfe/page-model'
import { reactive } from 'vue';
import {useRouter} from 'vue-router'

const route = useRouter()

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
    getUrl: '/ActivirtyControler/GetActivityList',
    // 新增数据的api
    addUrl: '/ActivirtyControler/AddActivity',
    // 更新数据的api
    updUrl: '/ActivirtyControler/UpdateActivity',
    // 删除数据的api
    delUrl: '/ActivirtyControler/DeleteActivity',
    // 删除数据api所需要的参数字段
    delKey: 'id',
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
          prop: 'activityName'
        },
        // render渲染字段
        {
          label: '描述',
          prop: 'activityDes'
        },
        {
          label: '活动时间',
          prop: 'activityTime'
        },
        {
          label: '活动状态',
          renderFn(row) {
            if (row.status == 0) {
              return (
                <span>未开启</span>
              )
            }else if (row.status == 1) {
              return (
                <span>进行中</span>
              )
            } else {
              return (
                <span>已完成</span>
              )
            }
          }
        },
        {
          label: '推荐码',
          renderFn(row) {
            const toPage = () => {
              jumpPage('recommond', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        },
        {
          label: '子活动',
          renderFn(row) {
            const toPage = () => {
              jumpPage('child', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        },
        {
          label: '选手',
          renderFn(row) {
            const toPage = () => {
              jumpPage('player', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        },
        {
          label: '品牌商',
          renderFn(row) {
            const toPage = () => {
              jumpPage('brand', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        },
        {
          label: '妈妈社区',
          renderFn(row) {
            const toPage = () => {
              jumpPage('mom', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        },
        {
          label: '奖励礼品',
          renderFn(row) {
            const toPage = () => {
              jumpPage('gift', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        },
        {
          label: '礼品订单',
          renderFn(row) {
            const toPage = () => {
              jumpPage('order', row)
            }
            return (
              <el-button onClick={ toPage }>管理</el-button>
            )
          }
        }
      ]
    },
    //搜索表单
    searchForm: {
        els: [
            {
            // 组件类型为 el-input
            eType: 'el-input',
            // 搜索项的标签
            label: '活动名称',
            // 字段名称
            prop: 'activityName',
            // 组件el-input的props
            props: {
                placeholder: '活动名称',
            },
            // 组件el-input的事件
            events: {
                // 监听值的改变
                change() {
                // ...
                }
            },
            // 组件el-input的样式
            style: {
                // width: '200px' 配置input的宽度
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
          label: '活动名称',
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
          prop: 'img',
          label: '描述',
          eType: 'el-input',
          props: {
              type: 'textarea',
              minRows: 2
          },
        },
        {
          eType: 'el-date-picker',
          prop: 'date',
          label: '活动时间',
          props: {
            valueFormat: 'YYYY-MM-DD'
          }
        },
        {
          label: '活动说明',
          prop: 'roName',
          eType: 'el-input',
          props: {
              type: 'textarea',
              minRows: 4
          },
        },
        {
          label: '背景图',
          prop: 'location',
          eType: 'img-upload',
          props: {
            mode: 'image'
          }
        },
      ]
    }

  })
  const jumpPage = function (type, row) {
    if (type=="recommond") {
      route.push(`/pages/recommend/index.vue?activityId=${row.id}`)
    } else if (type == 'child') { //子活动
      route.push(`/pages/child-activity/index.vue?activityId=${row.id}`)
    } else if (type == 'player') { //选手
      route.push(`/pages/player/index.vue?activityId=${row.id}`)
    } else if (type == 'brand') { //品牌商
      route.push(`/pages/brand/index.vue?activityId=${row.id}`)
    } else if (type == 'mom') { //妈妈社区
      route.push(`/pages/mom/index.vue?activityId=${row.id}`)
    } else if (type == 'gift') { //奖励礼品
      route.push(`/pages/gift/index.vue?activityId=${row.id}`)
    } else if (type == 'order') { //礼品订单
      route.push(`/pages/order/index.vue?activityId=${row.id}`)
    }
    
  }
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
