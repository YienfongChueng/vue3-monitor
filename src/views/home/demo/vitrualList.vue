
<template>
    <!-- 可视区(container) -->
  <div ref="containerRef" class="container" @scroll="scrollEvent">
    <!-- 内容虚拟撑开区(phantom) -->
    <div class="phantom" :style="{ height: phantomHeight + 'px' }"></div>
    <!-- 内容可见区(content) -->
    <div class="content" :style="{ transform: getTransform }">
        <div 
            class="content-item"
            ref="items" 
            v-for="item in visibleData" 
            :key="item.id" 
            :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }">
          {{ item.id }}
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import {throttle} from '@/utils'
// 列表数据
const listData = ref(new Array(1000).fill({}).map((item, index) => ({ id: index })))

// 固定子项高度
const itemHeight = ref(60)
// 可视区数据
const visibleInfo = reactive({
    startIndex: 0,// 起始索引
    endIndex: 0,// 结束索引
    height: 0,// 可视区高度
    count: 0 // 可视区子项个数
})

// 注意：前置缓冲个数不能超过前置索引，后置缓冲区个数加上已有可视区个数之和不能超过总数据个数
// 缓冲区比例（缓冲区数据与可视区数据的比例）
const bufferRatio = 1
// 起始缓冲数量
const aboveCount = computed(() => {
    return Math.min(visibleInfo.startIndex, visibleInfo.count * bufferRatio)
})
// 终止缓冲数量
const belowCount = computed(() => {
    return Math.min(listData.value.length - visibleInfo.endIndex, visibleInfo.count * bufferRatio)
})
 // 可视区内容
const visibleData = computed(() => {
    const start = visibleInfo.startIndex - aboveCount.value
    const end = visibleInfo.endIndex + belowCount.value
    return listData.value.slice(start, end)
    //  return listData.value.slice(visibleInfo.startIndex, Math.min(visibleInfo.endIndex, listData.value.length))
})

// 可视区子项个数
const visibleCount = computed(() => {
    // 为什么是ceil：ceil是向上取整 有小数就+1 确保足量数量不留白
    return Math.ceil(visibleInfo.height / itemHeight.value)
})
// 内容区需要被撑开的高度--内容虚拟撑开区
const phantomHeight = ref(0)
// 可视区示例
const containerRef = ref(null)
// 偏移量
const startOffset = ref(0)
// 偏移量对应的style：滚动后偏移多少子项元素 需要增补回来
const getTransform = computed(() => `translate(0,${startOffset.value}px)`)

// 初始化
onMounted(() => {
    visibleInfo.height = containerRef.value.clientHeight
    phantomHeight.value = listData.value.length * itemHeight.value
    visibleInfo.count = Math.ceil(visibleInfo.height / itemHeight.value)
    visibleInfo.startIndex = 0
    visibleInfo.endIndex = visibleInfo.startIndex + visibleInfo.count
    // visibleInfo.endIndex = visibleInfo.startIndex + visibleCount.value
})

// 监听可视区滚动事件
const scrollEvent = throttle((e)=> {
    const scrollTop = e.target.scrollTop
    // 为什么是floor：floor是向下取整 取整数部分 确保每个子项完整滚动
    visibleInfo.startIndex = Math.floor(scrollTop / itemHeight.value)
    visibleInfo.endIndex = visibleInfo.startIndex + visibleCount.value
    // startOffset.value = visibleInfo.startIndex * itemHeight.value
    getOffsetY()
}, 100)


// 获取偏移量
const getOffsetY = () => {
  // 实际滑出可视区个数
  const realStart = visibleInfo.startIndex - aboveCount.value
  if (realStart) {
    startOffset.value = visibleInfo.startIndex * itemHeight.value
  } else {
    startOffset.value = 0
  }
}



</script>

<style lang="scss" scoped>
/**可视区(container)**/
.container {
  width: 200px;
  height: 300px;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  position: relative;
  background-color: #ccc;
}
/**内容可见区(content)**/
.content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: yellow;
}
.content-item {
  box-sizing: border-box;
  border: 1px solid #ddd;
  text-align: center;
  color: #333;
}

</style>