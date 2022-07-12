<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
import { defineConfig } from '@juzhenfe/page-model'
import { reactive } from 'vue';
import moment from 'moment'
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
    getUrl: '/ActivirtyControler/GetActivityItemList',
    otherParams: {
      activityId: route.currentRoute.value.query.activityId
    },
    // 新增数据的api
    addUrl: '/ActivirtyControler/AddActivityItem',
    // 更新数据的api
    updUrl: '/ActivirtyControler/UpdateActivityItem',
    // 删除数据的api
    delUrl: '/ActivirtyControler/DeleteActivityItem',
    // 删除数据api所需要的参数字段
    delKey: 'id',
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
            label: '子活动名称',
            // 字段名称
            prop: 'itemName',
            // 组件el-input的props
            props: {
              placeholder: '子活动名称',
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
          label: '子活动名',
          prop: 'itemName'
        },
        {
          label: '投票描述',
          prop: 'itemRule'
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
          label: '选手',
          width: 120,
          renderFn(row) {
            const toPage = () => {
              jumpPage(row)
            }
            return (
              <el-button onClick={ toPage }>查看</el-button>
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
        'itemName'
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
        let obj = []
        obj.push(formData.startTime) 
        obj.push(formData.endTime)
        formData.date = obj
        console.log(this,formData,'绑定数据钩子函数')
        return formData
      },

      // 表单数据提交前的钩子函数
      async beforeSubmit(formData) {
        // this 指向表单管理器
        formData.activityId = route.currentRoute.value.query.activityId
        formData.startTime = formData.date[0]
        formData.endTime = formData.date[1]
        let day1 = formData.date[0].split('-')
        day1 = day1[0]+'年' + day1[1]+'月'+day1[2]+'日'
        let day2 = formData.date[1].split('-')
        day2 = day2[0]+'年' + day2[1]+'月'+day2[2]+'日'
        formData.activityTime = day1+ ' 至 ' + day2
       console.log(this,formData,'表单数据提交前的钩子函数')
        return formData
      },

      // 表单元素成员
      els: [
        {
          label: '子活动名称',
          prop: 'itemName',
          eType: 'el-input'
        },
        {
          label: '投票描述',
          prop: 'itemRule',
          eType: 'el-input',
          props: {
              type: 'textarea',
              minRows: 4
          }
        },
        {
          label: '活动时间',
          prop: 'date',
          eType: 'el-date-picker',
          props: {
              type: "daterange",
              valueFormat: 'YYYY-MM-DD'
          }
        },
        {
          label: '活动状态',
          prop: 'status',
          eType: 'el-select',
          optionsData: {
            list: [{
              label: '未开始',
              value: 0
            }, {
              label: '进行中',
              value: 1
            }, {
              label: '已结束',
              value: 2
            }],
            _reflect: 'statusList',
            _reflectChangeKey: 'list', // 默认_reflectChangeKey为list
            // 显示的名称字段
            label: 'label',
            // 绑定的值字段
            value: 'value',
          }
        }
      ]
    }

  })
  const jumpPage = function(row){
    route.push(`/pages/player/index.vue?activityId=${row.activityId}`)
  }
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
