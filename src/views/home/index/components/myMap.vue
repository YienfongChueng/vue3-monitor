<template>
    <div ref="mymap" style="height:400px"></div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import chinaMap from '@/assets/json/china.json'
import { useMyMap } from '../options/mymap.js'

const mymap = ref()

onMounted(() => {
    initChart()
})
const initChart = ()=> {
    let mychart = echarts.init(mymap.value) // 实例化
    echarts.registerMap('china',chinaMap) // 注册地图
    mychart.setOption(useMyMap())
    //响应式
    window.addEventListener('resize',()=>{
        mychart.resize();
    })
}


</script>