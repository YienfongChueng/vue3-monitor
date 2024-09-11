<template>
    <h2 style="color:#fff">并发请求</h2>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import { handQueue } from '@/utils/queueRequest.js'

const imageList = [
  "https://yanxuan-item.nosdn.127.net/cac68a7880bec1c72dcfce112d10e955.png",
  "https://yanxuan-item.nosdn.127.net/06a158d2888b20383a466227e39bbbc7.jpg",
  "https://yanxuan.nosdn.127.net/8f8092d5bf6a133a8cb59ab7b9f790e9.png",
  "https://yanxuan-item.nosdn.127.net/eac6c40fdb0f977fdf80048d7b181ffa.png",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg",
]
onMounted(()=> {
    console.log("imageList")
    handQueue(imageList)
})

</script>

<style lang="scss" scoped>

</style>