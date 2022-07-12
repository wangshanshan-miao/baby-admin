
<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
  import { defineConfig } from '@juzhenfe/page-model'
  import { reactive,ref } from 'vue';
import {useRouter} from 'vue-router'

const route = useRouter()
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
    getUrl: '/Brand/GetBrandBusinessList',
    // 新增数据的api
    addUrl: '/Brand/AddBrandBusiness',

    // 更新数据的api
    updUrl: '/Brand/UpdateBrandBusiness',
    // 删除数据的api
    delUrl: '/Brand/DeleteBrandBusiness',
    // 删除数据api所需要的参数字段
    delKey: 'id',
    addButton: {
        text: "新增品牌商",
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
            label: '品牌商名称',
            // 字段名称
            prop: 'businessName',
            // 组件el-input的props
            props: {
              placeholder: '品牌商名称',
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
          label: '品牌商',
          prop: 'businessName'
        },
        // render渲染字段
        {
          label: '公司名',
          prop: 'companyName'
        },
        {
          label: '联系人',
          prop: 'contactPerson'
        },
        {
          label: '联系电话',
          prop: 'contactMobile'
        },
        {
          label: '门店信息',
          renderFn(row) {
            const toPage = () => {
              jumpPage('brand', row)
            }
            return (
              <el-button onClick={toPage}>查看</el-button>
            )
          }
        },
        {
          label: '商品信息',
          renderFn(row) {
            const toPage = () => {
              jumpPage('goods', row)
            }
            return (
              <el-button onClick={toPage}>查看</el-button>
            )
          }
        },
        {
          label: '订单信息',
          renderFn(row) {
            const toPage = () => {
              jumpPage('order', row)
            }
            return (
              <el-button onClick={toPage}>查看</el-button>
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
        'businessName'
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
          label: '品牌商名称',
          prop: 'businessName',
          eType: 'el-input'
        },

        // 图片上传
        {
          eType: 'img-upload',
          prop: 'businessImg',
          label: '品牌商图片',
          props: {
            // 多图模式
            mult: true
          }
        },
        {
          label: '公司名称',
          prop: 'companyName',
          eType: 'el-input'
        },
        {
          label: '联系人',
          prop: 'contactPerson',
          eType: 'el-input'
        },
        {
          label: '手机号',
          prop: 'contactMobile',
          eType: 'el-input'
        }
      ]
    }

  })

  const jumpPage = function(type, row) {
    if (type == 'brand') {
      route.push(`/pages/brand-product/index.vue`)
    } else if (type == 'goods') {
      route.push(`/pages/brand-store/index.vue`)
    } else if (type == 'order') {
      route.push(`/pages/order/index.vue`)
    }
  }
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
