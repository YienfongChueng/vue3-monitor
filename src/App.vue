<script setup>
import {ref} from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = ref(zhCn)
</script>

<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<style scoped>

</style>
