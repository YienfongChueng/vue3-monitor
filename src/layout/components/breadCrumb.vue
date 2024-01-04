<template>
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="v in breadcrumb" :key="v.path">
            <router-link :to="v.path">{{v.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const breadcrumb = ref([])

function getBreadCrumb(matched) {
    const filtersList = matched.filter(v => v.name !== 'layout')
    breadcrumb.value = filtersList
}
watch(route,(newVal,oldVal) => {
    getBreadCrumb(newVal.matched)
},{
    immediate: true,
    deep: true
})


</script>

<style lang="scss" scoped>

</style>