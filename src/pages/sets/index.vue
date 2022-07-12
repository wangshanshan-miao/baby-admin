
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
      pageSize: 2
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
    getUrl: '/ConfigControler/GetSystemConfig',
    // 新增数据的api
    addUrl: '/System/AddRolesInAdmin',
    // 更新数据的api
    updUrl: '/ConfigControler/UpdateSystemConfig',
    // 删除数据的api
    delUrl: '/System/DelRolesInAdmin',
    // 删除数据api所需要的参数字段
    delKey: 'roCode',
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
        'sharetitle'
      ],

      // 表单模式 弹框和全页面
      mode: 'fullpage',

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

      els: [
        {
          label: '开启审核',
          prop: 'isopenexamine',
          eType: 'el-switch',
        },
        {
          label: '分享标题',
          prop: 'sharetitle',
          eType: 'el-input',
        },
        // 图片上传
        {
          eType: 'img-upload',
          prop: 'img',
          label: '分享图片',
          props: {
            // 多图模式
            mult: false
          },
        }
      ]
    }

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" />
</template>
