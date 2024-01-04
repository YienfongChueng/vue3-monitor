<template>
    <div class="tags">
        <el-scrollbar class="scroll-container">
            <el-tag
                v-for="(tag,index) in tagList"
                :key="tag.path"
                class="mx-1"
                :closable="tag.path !== '/index'"
                :type="tag.path === defaultUrl? '' : 'info'"
                @click="handleJump(tag)"
                @close="handleClose(tag,index)"
            >
                {{ tag?.meta?.title }}
            </el-tag>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { ref,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTagStore } from '@/store/tag-list.js'

const route = useRoute()
const router = useRouter()
const tagStore =  useTagStore()
const { tagList } = storeToRefs(tagStore)

// 高亮当前路由导航的标签页
const defaultUrl = ref('/idnex')
// 监听路由变化，获取当前路由，
watch(() => route.path,(newVal,oldVal) => {
    defaultUrl.value = newVal

},{deep: true,immediate: true})

// 跳转路由
const handleJump = (tag) => {
    // 重复点击标签，不跳转
    if(route.path === tag.path) return
    router.push(tag.path)
}

/**
 * 关闭标签
 * 1.删除非当前模块，正常删除
 * 2.删除当前模块
 * 2.1 当前模块属于最后一个模块，删除后需要高亮前一个模块
 * 2.2 当前模块属于中间模块模块，删除后需要高亮后一个模块
*/
const handleClose = (tag, i) => {
    // store 删除
    tagStore.delTag(tag)
    // 1.删除非当前模块，正常删除
    if(route.path !== tag.path) return
    // 2.删除当前模块
    if(i === tagList.value.length) {
        // 2.1当前模块属于最后一个模块，删除后需要高亮前一个模块
        handleJump(tagList.value[i-1])
    }else {
        // 2.2当前模块属于中间模块模块，删除后需要高亮后一个模块
        handleJump(tagList.value[i])
    }
}

</script>

<style lang="scss" scoped>
.more-arrow {
    color: #fff;
    vertical-align: middle;
    cursor:pointer;
}
/* 多页签导航添加滚动条 */
.scroll-container {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
}

</style>