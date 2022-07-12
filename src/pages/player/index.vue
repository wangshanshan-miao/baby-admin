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
    getUrl: '/ActivirtyControler/GetActivityPlayerList',
    otherParams: {
      activityId: route.currentRoute.value.query.activityId
    },
    // 新增数据的api
    addUrl: '/ActivirtyControler​/AddActivityPlayer',
    // 更新数据的api
    updUrl: '/ActivirtyControler/UpdateActivityPlayer',
    // 删除数据的api
    delUrl: '/ActivirtyControler​/DeleteActivityPlayer',
    // 删除数据api所需要的参数字段
    delKey: 'id',
    addButton: {
        text: "新建选手",
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
            label: '选手名称',
            // 字段名称
            prop: 'playerName',
            // 组件el-input的props
            props: {
              placeholder: '选手名称',
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
      selectable: true,
      selectableButtons: [
        {
            text: '新建选手',
            event: 'add',
            props: {
                type: 'primary'
            }
        },
        {
            text: '批量设置淘汰',
            event: 'setState',
            props: {
                type: 'primary'
            }
        }
    ],
    events: {
        selectionChange(selection) {

        },
        setState() {
            console.log(111)
        }
    },
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
      els: [
        {
          label: '选手名称',
          prop: 'playerName'
        },
        {
          label: '照片',
          prop: 'playerImg',
          renderFn(row) {
            return (
              <img style="width: 100%" src={ row.playerImg } />
            )
          }
        },
        {
            label: '擅长领域',
           prop: 'playerFields'
        },
        {
          label: '选手介绍',
          prop: 'playerIntroduce'
        },
        {
          label: '选中状态',
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
          label: '投票数（排序）',
          prop: 'votesNumber'
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
        'playerName'
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
        formData.activityId = route.currentRoute.value.query.activityId
        formData.playerFieldsIcon = ""
        formData.status = 0
        console.log(this,formData,'表单数据提交前的钩子函数')
        return formData
      },

      // 表单元素成员
      els: [
        {
          label: '选手名称',
          prop: 'playerName',
          eType: 'el-input'
        },
        // 图片上传
        {
          eType: 'img-upload',
          prop: 'playerImg',
          label: '照片',
          props: {
            // 多图模式
            mult: true
          }
        },
        {
          label: '擅长领域',
          prop: 'playerFields',
          eType: 'el-input',
          props: {
              
          }
        },
        {
          label: '选手介绍',
          prop: 'playerIntroduce',
          eType: 'el-input',
          props: {
              type: 'textarea',
              minRows: 4
          }
        },
        {
          label: '视频',
          prop: 'playerVideo',
          eType: 'img-upload',
          props: {
              mode: 'video'
          }
        }
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
