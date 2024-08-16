<template>
    <div class="watermark-container" ref="watermarkContainerRef">
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>

<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
import { useWaterMaker } from '@/hooks/waterMaker.js'
// 使用 defineProps 定义一个组件的 props，这些 props 描述了组件从父组件接收的属性
const props = defineProps({
  // 文本内容，类型为字符串，必须提供
  text: {
    type: String,
    required: true,
    default: '禁止转载'
  },
  // 字体大小，类型为数字，默认值为10
  fontSize: {
    type: Number,
    default: 16,
  },
  // 间距，类型为数字，默认值为1
  gap: {
    type: Number,
    default: 1,
  },
  // 颜色，类型为字符串，默认值为'rgba(82,75,75,0.58)'
  color: {
    type: String,
    default: 'rgba(82,75,75,0.58)',
  }
})

const bg = useWaterMaker(props)

// 设置水印
let div
const watermarkContainerRef = ref()
const setWaterMaker = () => {
    // 如果水印容器没有值，则直接返回，不执行后续操作
    if(!watermarkContainerRef.value) return;
    // 如果之前已经存在水印 div，则先移除它
    if(div) div.remove()
     // 创建一个新的 div 元素用于作为水印的容器
    div = document.createElement('div')
    // 从计算属性 bg 中获取 base64 编码的图片数据和样式尺寸
    const {base64,styleSize} = bg.value
    // 设置 div 的背景图片为水印图片的 base64 编码
    div.style.backgroundImage = `url(${base64})`
    // 设置背景图片的尺寸
    div.style.backgroundSize = `${styleSize}px ${styleSize}px`
    // 设置背景图片重复显示
    div.style.backgroundRepeat = "repeat";
    // 设置水印 div 的 z-index 为 9999，以确保它显示在大多数其他元素之上
    div.style.zIndex = 9999;
    // 设置水印 div 不响应鼠标事件，如点击、悬停等
    div.style.pointerEvents = "none";
    // 设置水印 div 的位置为绝对定位
    div.style.position = "absolute";
    // 使用 inset 属性设置 div 占据整个父容器的空间
    div.style.inset = "0";

    // 将水印 div 添加到水印容器中
    watermarkContainerRef.value.appendChild(div);
}

// 创建一个新的 MutationObserver，用于监听水印容器的变化 MutationObserver
const ob = new MutationObserver((enteris) => {
        enteris.forEach(entry => {
            // 删除水印的情况
            for(const dom of entry.removedNodes) {
                if(dom === div) {
                    setWaterMaker()
                }
            }
            // 修改水印的情况，如：设置透明度=1
            if(entry.target === div) {
                setWaterMaker()
            }
        });
})
onMounted(() => {
    setWaterMaker()
    // 包括子节点的变化、属性的变化以及子树的变化
    ob.observe(watermarkContainerRef.value,{
        childList:true,
        attributes:true,
        subtree:true
    })
})
onUnmounted(() => {
    ob && ob.disconnect();
    div = null
})

</script>

<style lang="scss" scoped>
.watermark-container{
    position: relative;
}

</style>