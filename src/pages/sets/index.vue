<script lang="ts">
export default {
  name: 'SetsPage'
}    

</script>

<script setup lang="ts">
  import { processdRequest } from '@/utils/request';
  import {PROXY_MAGIC_URL} from '../../../vite.config'
  import { onMounted,ref } from 'vue';
  import { useRoute } from 'vue-router'
  import {ElForm,ElFormItem,ElInput,ElSwitch,ElUpload,ElButton,ElLoading} from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
 import { reactive } from 'vue'
  const formRef = ref<any>(null)
  const loading = ref(false)
  const submitloading = ref(false)

  let setForm = reactive({
    isopenexamine:false,
    sharetitle:'',
    shareimg:'',
  })

  const rules = reactive({
      'sharetitle': [
        { required: true, message: '请输入分享标题' }
      ],
      'shareimg': [
        { required: true, message: '请上传分享图片' }
      ]
    })


  onMounted(() => {
    getData()
  })

  const getData = async () => {
    loading.value = true
    const result = await processdRequest.post<SetsResultModel[]>('/ConfigControler/GetSystemConfig')
    console.log(result,'1111')
    setForm.sharetitle = result.sharetitle
    setForm.shareimg = result.shareimg
    setForm.id = result.id
    setForm.isopenexamine = result.isopenexamine
    loading.value=false
  }


  const onSubmit = async () => {
    formRef.value.validate(async (valid: boolean) => {
      console.log('vali::', valid)
      if (!valid) return
      submitloading.value = true
      const result = await processdRequest.post<SetsResultModel[]>('/ConfigControler/UpdateSystemConfig',{
        ...setForm
      })
      submitloading.value=false
    })
  }
  const handleImageSuccess = (data) => {
    console.log(data)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  } 
  const beforeImageUpload = (e) => {
    console.log(e,'submit!')
  }
</script>

<template>
  <div class="sets-box">
    <div class="title">配置管理</div>
    <el-form :model="setForm" ref="formRef" :rules="rules" v-loading="loading">
      <el-form-item label="开启审核">
        <el-switch v-model="setForm.isopenexamine" />
      </el-form-item>
       <el-form-item label="分享标题">
        <el-input v-model="setForm.sharetitle" />
      </el-form-item>
      <el-form-item label="分享图片">
          <el-upload
            class="avatar-uploader"
            action='http://116.62.21.132:8670/api/upload/file'
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
          >
            <img v-if="setForm.shareimg" :src="setForm.shareimg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" v-bind:loading="submitloading" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sets-box {
  width: 80%;
  border:0;
  margin: 0 auto;
  padding-top: 24px;
}
.title{
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  font-weight: 600;
}
.avatar-uploader{
  font-size: 28px;
  color: rgb(140, 147, 157);
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-box{
  text-align: center;
}

</style>
