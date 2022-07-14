<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
import { defineConfig } from '@juzhenfe/page-model'
import { reactive,ref } from 'vue';
import {useRouter} from 'vue-router'
import CityPickerMult from './components/city-picker-mult.vue'
const route = useRouter()

  // 为配置项提供反射数据源
  const reflections = reactive({
    brandList: [],
    goodsList: []
  })
  const cityData = [
    {name:111,code:1111},
    {name:222,code:222},
    {name:333,code:333},
  ]
  // 接口获取下拉列表数据
  ;(async () => {
    const result = await processdRequest.post('/Brand/GetBrandBusinessList', {
      pageIndex: 1,
      pageSize: 2,
      businessName: '',
      QueryAll: 1
    })
    reflections.brandList = result
  })()
  ;(async () => {
    const result = await processdRequest.post('/Brand/GetBrandGoodsList', {
      pageIndex: 1,
      pageSize: 2,
      goodsName: '',
    })
    reflections.goodsList = result
  })()

  const config = defineConfig<TestRoleResultModel>({
    // 启用反射数据源,需要为pageModel注入reflections
    reflect: true,

    // 页面的整体尺寸
    size: 'default',

    // 获取列表的api
    getUrl: '/ActivirtyControler/GetActivityGoodsList',
    otherParams: {
      activityId: route.currentRoute.value.query.activityId
    },
    // 新增数据的api
    addUrl: '/ActivirtyControler/AddActivityGoods',
    // 更新数据的api
    updUrl: '/ActivirtyControler/UpdateActivityGoods',
    // 删除数据的api
    delUrl: '/ActivirtyControler​/DeleteActivityPlayer',
    // 删除数据api所需要的参数字段
    delKey: 'id',
    addButton: {
        text: "新建活动商品管理",
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
            label: '活动奖品',
            // 字段名称
            prop: 'goodsName',
            // 组件el-input的props
            props: {
              placeholder: '活动奖品',
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
      els: [
        {
          label: '礼品名称',
          prop: 'goodsName'
        },
        {
          label: '库存',
          prop: 'stockCount',
          renderFn(row) {
            
          }
        },
        {
            label: '已兑换',
           prop: 'sendCount'
        },
        {
          label: '身份类型',
          renderFn(row) {
            if (row.identityType == 0) {
              return (
                <span>不限制</span>
              )
            } else if (row.identityType == 1) {
              return (
                <span>宝妈</span>
              )
            } else {
              return (
                <span>孕妈</span>
              )
            }
          }
        },
        {
          label: '是否年龄限制',
          renderFn(row) {
            if(row.ageIsLimit) {
              return(
                <span>是</span>
              )
            } else {
              return(
                <span>否</span>
              )
            }
          }
        },
        {
          label: '是否地区限制',
          renderFn(row) {
            if(row.areaIsLimit) {
              return(
                <span>是</span>
              )
            } else {
              return(
                <span>否</span>
              )
            }
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
      moduleConfig: {
          type: 'tabs',  
      },
      // 弹窗模式的参数配置
      dialogProps: {
        width: '800px'
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
          label: '品牌商',
          prop: 'activityId',
          eType: 'el-select',
          moduleName: '基本信息',
          optionsData: {
            list: [],
            _reflect: 'brandList',
            _reflectChangeKey: 'list',
            label: 'businessName',
            value: 'id'
          }
        },
        {
          eType: 'el-select',
          prop: 'goodsId',
          label: '产品',
          moduleName: '基本信息',
          optionsData: {
            list: [],
            _reflect: 'goodsList',
            _reflectChangeKey: 'list',
            label: 'goodsName',
            value: 'id'
          }
        },
        {
          label: '发放数量',
          prop: 'roName',
          eType: 'el-input',
          moduleName: '基本信息'
        },
        {
          label: '身份限制',
          prop: 'businessName',
          eType: 'el-radio-group',
          moduleName: '限制',
          optionsData: {
            list: [{
              label: 0,
              value: '不限制'
            },{
              label: 1,
              value: '孕妈'
            }, {
              label: 2,
              value: '宝妈'
            }],
            // 需要对组件赋数据源时，例： 
            // 添加需要反射的数据源名称
            _reflect: 'statusList',
            // 从外部数据源取出数据后的赋值对象key
            _reflectChangeKey: 'list', // 默认_reflectChangeKey为list
            // 显示的名称字段
            label: 'value',
            // 绑定的值字段
            value: 'label',
          }
        },
        {
          label: '孕期限制',
          prop: 'ageIsLimit',
          eType: 'el-switch',
          moduleName: '限制'
        },
        {
          eType: 'el-select',
          prop: 'receiveLimitCount',
          label: '孕周范围',
          moduleName: '限制',
          props: {
            filterable: true,
            clearable: true
          },
          optionsData: {
            list: [
              {
                label: '0周',
                value: 0
              },
              {
                label: '婴6个月',
                value: 1
              }
            ]
          }
        },
        {
          label: '使用范围',
          prop: 'areaIsLimit',
          eType: 'el-radio-group',
          moduleName: '限制',
          optionsData: {
            list: [{
              value: false,
              label: '全国通用'
            }, {
              value: true,
              label: '指定地区'
            }],
            label: 'label',
            value: 'value',
          }
        },
        {
          // 不再使用eType
          label: '指定地区',
          moduleName: '限制',
          // 此处row为表单数据formData
          renderFn(row) {
            // 处理事件
            const update = (val: Array<[]>) => {
              console.log(val,'val娃娃晚上')

              row.cityCodes = val
            }
            // 将一些复杂的逻辑隐藏在自定义组件中
            return (
                <CityPickerMult 
                    codes={ row.cityCodes }
                   onUpdate:codes={ update }
                />
            )
          }
        }
      ]
    }

  })
</script>

<template>
 <Limits @onUpdateValue="()=>{console.log(111)}"/>
  <page-model :config='config' :reflections="reflections" />
</template>
