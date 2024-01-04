<template>
  <div id="module">
    <el-container>
        <!-- 左侧导航 -->
        <navMenu />
      <el-container>
        <el-header>
          <!-- 面包屑 -->
          <breadCrumb/>
          <el-button class="exit" type="primary" @click="logout">退出</el-button>
          <!-- 标签导航 -->
          <tag/>
        </el-header>
        <!-- 右侧主体 -->
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { navMenu,breadCrumb, tag } from './components'
import { apiLogout } from '@/api/modules/user.js'
import { useRouter } from 'vue-router'
import useToken from '@/utils/auth'
import { useTagStore } from '@/store/tag-list'
import { useUserStore } from '@/store/user.js'
import { usePermissionStore } from '@/store/permission.js'

const { removeToken } = useToken()
const router = useRouter()
const tagStore = useTagStore()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

const logout = ()=> {
  apiLogout().then(res => {
    ElMessage.success('登出成功！')
    // 清除token
    removeToken()
    // 清除多页签导航
    tagStore.$patch({
      tagList: [{ path:'/index', name: 'index', meta: { title: '首页'}}]
    })
    // 清除用户信息
    userStore.resetUser()
    permissionStore.resetMenus()
    router.push('/login')
  })
}

</script>

<style lang="scss" scoped>

</style>