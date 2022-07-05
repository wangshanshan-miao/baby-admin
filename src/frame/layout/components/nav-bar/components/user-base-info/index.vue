<script lang="ts">
export default {
  name: 'UserBaseInfo'
}
</script>

<script setup lang="ts">
import createBEMNameSpace from '@/frame/utils/bem';
import { computed } from 'vue';

import TextImg from '@libComponents/text-img/index.vue'
import { CaretBottom, Operation, Tools, Service } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import tokenStorage from '@/frame/utils/token';
import { ElMessage, ElMessageBox } from 'element-plus';

const { BEMSpace, createBEMName } = createBEMNameSpace('baseinfo')

const router = useRouter()
const userStore = useUserStore()

const userData = computed(() => {
  return userStore.userData
})

const tools: any[] = [
  // {
  //   text: '个人设置',
  //   icon: Tools
  // },
  // {
  //   text: '意见反馈',
  //   icon: Service
  // }
]

const toManagement = () => {
  router.push('/system')
}

const logout = async () => {
  await ElMessageBox.confirm('是否退出登录?', '提示', {
    type: 'warning'
  })
  tokenStorage.remove()
  userStore.clear()
  router.push('/login')
}

</script>

<template>

  <el-popover
    placement="bottom-end"
    :width="260"
    :offset="10"
    trigger="hover"
    :popper-class="createBEMName('popover')"
  >
    <template #reference>
      <div :class="BEMSpace">
        <el-avatar v-if="userData?.headImgUrl" :size="30" :src="userData?.headImgUrl" :class="createBEMName('avatar')"></el-avatar>
        <div :class="createBEMName('username')">
          <span>{{ userData?.auName }}</span>
        </div>
        <el-icon><caret-bottom /></el-icon>
      </div>
    </template>

    <div :class="createBEMName('popover-content')">
      <div :class="createBEMName('profile-info')">
        <el-avatar v-if="userData?.headImgUrl" :size="40" :src="userData?.headImgUrl" :class="createBEMName('profile-avatar')"></el-avatar>
        <text-img v-else :value="userData?.auName" :width="40" background="var(--theme)" color="#fff" :class="createBEMName('profile-avatar')"></text-img>
        <div :class="createBEMName('text-info')">
          <div :class="createBEMName('company-text')">{{ userData?.auName }}</div>
        </div>
      </div>

      <!-- <div :class="createBEMName('tools')">
        <div :class="createBEMName('tools-wrap')">
          <div v-for="(tool, index) in tools" :key="index" :class="createBEMName('tools-item')">
            <el-icon :class="createBEMName('tools-item-icon')">
              <component :is="tool.icon" />
            </el-icon>
            <div :class="createBEMName('tools-item-text')">{{ tool.text }}</div>
          </div>
        </div>

        <el-button size='default' type='primary' :icon="Operation" @click="toManagement">进入后台管理</el-button>
      </div> -->

      <div :class="createBEMName('logout')" @click="logout">
        <span>退出登录</span>
      </div>

    </div>

  </el-popover>

</template>


<style lang="scss">

.baseinfo__popover {
  padding: 0 !important;
}

</style>

<style lang="scss" scoped>

.baseinfo {
  @include flex-c-center;
  cursor: pointer;
  line-height: 1;
}

.baseinfo__avatar {
  margin-right: 10px;
}

.baseinfo__username {
  margin-right: 4px;
  font-weight: 600
}

.baseinfo__profile-info {
  @include flex-c-center;
  padding: 15px;
  border-bottom: 1px solid var(--border);
}

.baseinfo__profile-avatar {
  @include fs0;
  margin-right: 10px;
}

.baseinfo__company-text {
  font-size: 14px;
  color: var(--text);
}

.baseinfo__username-text {
  font-size: 12px;
  margin-top: 4px;
  color: var(--text);
}

.baseinfo__tools {
  font-size: 0;
  padding-bottom: 20px;
  overflow: hidden;
  text-align: center;
}

.baseinfo__tools-wrap {
  margin: 15px 0 10px;
  text-align: left;
}

.baseinfo__tools-item {
  display: inline-block;
  vertical-align: top;
  width: 33.3%;
  text-align: center;
  cursor: pointer;
}

.baseinfo__tools-item-icon {
  font-size: 20px;
}

.baseinfo__tools-item-text {
  font-size: 12px;
  margin: 10px 0 15px;
}

.baseinfo__logout {
  padding: 10px 15px;
  border-top: 1px solid var(--border);
  text-align: center;
  cursor: pointer;
  user-select: none;
}

</style>