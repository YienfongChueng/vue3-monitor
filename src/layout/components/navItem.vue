<template>
    <!-- 无子级 -->
    <el-menu-item :index="item.path" v-if="!item.children" @click="addTag(item)">
        <!-- <el-icon><Menu /></el-icon> -->
        <i class="iconfont" :class="item.meta.icon"></i>
        <span>{{item.meta.title}}</span>
    </el-menu-item>
    <!-- 有子级 -->
    <el-sub-menu :index="item.path" v-else>
        <template #title>
            <i class="iconfont" :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
        </template>
        <navItem v-for="sub in item.children" :key="sub.path" :item="sub"></navItem>
    </el-sub-menu>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTagStore } from '@/store/tag-list.js'
const tagStore = useTagStore()
const { tagList } = storeToRefs(tagStore)

const { item } = defineProps({
    item: {
        type: Object
    }
})

// 点击路由，添加标签导航，注意去重
const addTag = (item) => {
    // 添加前判断是否已存在
    const isRepeat = tagList.value.some(v => v.path === item.path) // 找到则返回true，否则返回false
    if(isRepeat) return
    // 限制最多只能打开10个标签导航页
    if(tagList.value.length === 10) {
        // 自动把第二个删除
        tagStore.delTag(tagList.value[1])
    }
    // 添加
    tagStore.addTag(item)
}

</script>

<style lang="scss" scoped>
.iconfont {
    padding: 5px;
}

</style>