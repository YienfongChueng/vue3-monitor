<template>
    <div class="wrap" ref="contentRef">
        这意味着如果你知道BufferGeometry的一个属性会增长，比如顶点的数量， 
        你必须预先分配足够大的buffer来容纳可能创建的任何新顶点。 
        当然，这也意味着BufferGeometry将有一个最大大小 —— 无法创建一个可以高效地无限扩展的BufferGeometry
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
const contentRef = ref()
onMounted(() => {
    contentRef.value.addEventListener('selectionchange',() => {
        console.log(document.getSelection());
    })
})


</script>
<style lang="scss" scoped>
.wrap {
    color: #fff;
    font-size: 14px;
}
</style>