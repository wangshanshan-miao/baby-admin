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
    getUrl: '/Brand/GetBrandStoreModelList',
    // 新增数据的api
    addUrl: '/Brand/AddBrandStore',
    // 更新数据的api
    updUrl: '/Brand/UpdateBrandStore',
    // 删除数据的api
    delUrl: '/Brand/DeleteBrandStore',
    // 删除数据api所需要的参数字段
    delKey: 'id',
    addButton: {
        text: "新增门店",
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
            label: '门店',
            // 字段名称
            prop: 'storeName',
            // 组件el-input的props
            props: {
              placeholder: '门店',
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
          label: '门店',
          prop: 'storeName'
        },
        // render渲染字段
        {
          label: '门店地址',
          prop: 'storeAddress'
        },
        {
          label: '门店联系电话',
          prop: 'contactMobile'
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
        formData.storeAddress = formData.inAddressJson ? formData.inAddressJson.codeCity : ''
        console.log(this,formData,'绑定数据钩子函数')
        return formData
      },

      // 表单数据提交前的钩子函数
      async beforeSubmit(formData) {
        // this 指向表单管理器
        formData.storeAddress = formData.inAddressJson.city+formData.address
        formData.storeLong = formData.location[0]
        formData.storeLatitude = formData.location[1]
        console.log(this,formData,'表单数据提交前的钩子函数')
        return formData
      },

      // 表单元素成员
      els: [
        // 普通输入框例子
        {
          label: '门店',
          prop: 'storeName',
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
          prop: 'storeImg',
          label: '门店图片',
          props: {
            // 多图模式
            mult: true
          }
        },
        // 下拉选择
        // 普通下拉,静态数据支撑
        {
          eType: 'city-picker',
          prop: 'storeAddress',
          label: '地址',
          events: {
            valueChange:function(citys?: CityItem[]) {
              let obj = {
                city: citys[0].label + citys[1].label + citys[2].label,
                codeCity: this.formData.storeAddress
              }
              this.formData.inAddressJson = JSON.stringify(obj)
              this.formData.cityCode = citys[2].value
              this.formData.cityName = citys[2].label
            }
          }
        },
        {
          label: '具体地址',
          prop: 'address',
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
          label: '联系电话',
          prop: 'contactMobile',
          eType: 'el-input'
        },
        // 普通输入框例子
        {
          label: '定位',
          prop: 'location',
          eType: 'a-map',

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
          label: '是否开启会员',
          prop: 'isUp',
          eType: 'el-switch'
        }
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
