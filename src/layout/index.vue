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
          <router-view v-slot="{ Component, route }">
              <!-- <transition name="fade-transform" appea mode="default"> -->
                <component :is="Component" />
              <!-- </transition> -->
          </router-view>
          <!-- 大量使用缓存组件，会使性能下降，如果需要，则需要在路由配置中指定某些组件可以缓存 -->
          <!-- 并非所有打开过标签的组件都可以缓存，因为会影响性能 -->
            <!-- <router-view v-slot="{ Component, route }">
              <transition name="fade-transform" appea mode="default">
                <keep-alive :include="cacheView">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
              </transition>
            </router-view> -->
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
import { storeToRefs } from 'pinia'
import {ref,computed} from 'vue'

const { removeToken } = useToken()
const router = useRouter()
const tagStore = useTagStore()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

const { tagList,cacheView } = storeToRefs(tagStore)

console.log("cacheView",cacheView)

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
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

</style>