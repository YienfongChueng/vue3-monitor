<template>
    <el-aside width="200px" class="aside">
        <el-menu
        :default-active="route.path"
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <navItem v-for="v in navList" :key="v.path" :item="v"></navItem>
      </el-menu>
    </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/store/permission'
import { navItem } from '.'
const route = useRoute()
const permissionStore = usePermissionStore()
const navList = ref([])
navList.value = permissionStore.routes

const handleOpen = ()=> {
    console.log("handleOpen")
}
const handleClose = ()=> {
    console.log("handleClose")
}

</script>

<style lang="scss" scoped>

</style>