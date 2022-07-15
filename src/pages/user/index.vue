
<script setup lang="tsx">
  import { processdRequest } from '@/utils/request';
  import { defineConfig } from '@juzhenfe/page-model'
  import { reactive,ref, toRaw } from 'vue';
  import {ElMessageBox,ElMessage} from 'element-plus'
  // 为配置项提供反射数据源
  const reflections = reactive<{
    roleList: BrandResultModel[]
  }>({
    roleList: []
  });

  const dialogVisible = ref(false)
  const selectData = reactive([])

  const singleApply = () => {
    if(selectData.values.length === 1){
      dialogVisible.value = true
    }else{
      ElMessage({message:'请选择单条数据进行审核',type: 'warning',})
    }
  }
  const singlePost = async (status) => {
    const result = await processdRequest.post('/UserControler/ExaminUserSingle', {
      id:selectData.values[0].id,
      examineStatus:status
    })
    // selectData.values = []
    dialogVisible.value = false
  }
  const multiApply = async (status) => {
      const result = await processdRequest.post('/UserControler/ExaminUserAll')
      // selectData.values = []
      dialogVisible.value = false
  }
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
    getUrl: '/UserControler/GetUserList',
    // 新增数据的api
    addUrl: '/ConfigControler/AddAgeConfig',
    // 更新数据的api
    updUrl: '/ConfigControler/UpdateAgeConfig',
    // 删除数据的api
    delUrl: '/ConfigControler/DeleteAgeConfig',
    // 删除数据api所需要的参数字段
    delKey: 'id',
    isAutoAddButton:false,
    // addButton: {
    //     text: "新增年龄配置",
    //     props: {
    //         type: 'primary'
    //     }
    // },
    searchForm:{
      els:[
        {
          eType: 'el-input',
          label: '姓名',
          prop: 'userName',
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
          eType: 'el-date-picker',
          label: '时间',
          prop: 'activityName',
          props: {
             type:"daterange",
             valueFormat: 'YYYY-MM-DD'
          },
          events: {
            change(val) {
              console.log(val,this.formData)
              this.formData.dtStart = val[0]
              this.formData.dtEnd = val[1]
            }
          },
          style: {
            width: '200px' 
          }
        },
        {
          eType: 'el-select',
          label: '类型',
          prop: 'userType',
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
        }
      ]
    },
    table: {
      events: {
        selectionChange(selections) {
          console.log(selections)
          selectData.values = selections
          console.log(selectData,'www')
        }
      },
      selectable: true,
      selectableButtons: [
          {
              text: '审核',
              event: 'singleApply',
              props: {
                  type: 'primary'
              }
          },
          {
              text: '一键审核',
              event: 'setState',
              props: {
                  type: 'primary'
              }
          }
      ],

      // 表格的列成员
      els: [
        // render渲染字段
        {
          label: '姓名',
          prop: 'userName'
        },
        {
          label: '身份证',
          prop: 'userIdcard'
        },
        {
          label: '类型',
          renderFn(row) {
            if (row.userType ==0) {
              return(
                <span>孕妈</span>
              )
            } else {
              return(
                <span>宝妈</span>
              )
            }
          }
        },
        {
          label: 'B超/出生证明',
          renderFn(row) {
            if (row.userType ==0) {
              return(
                <img style="width:3em;height:3em;" src={ row.bmodeImg }/>
              )
            } else {
              return(
                <img style="width:3em;height:3em;" src={ row.birthCertificateimg }/>
              )
            }
          }
        },
        {
          label: '出生时间/预产期',
          prop: 'examineTime'
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
          label: '审核状态',
          renderFn(row) {
            if (row.examineStatus ==1) {
              return (
                <span>审核通过</span>
              )
            } else {
              return (
                <span>审核不通过</span>
              )
            }
            
          }
        }
      ]
    },
    // 是否存在表单
    hasForm: false,

  })
</script>

<template>
  <page-model :config='config' :reflections="reflections" @singleApply='singleApply' @multiApply='multiApply'/>
  <el-dialog
    v-model="dialogVisible"
    title="审核"
    width="30%"
  >
    <span>是否审核通过？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="singlePost(-1)">不通过</el-button>
        <el-button type="primary" @click="singlePost(1)"
          >通过</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
