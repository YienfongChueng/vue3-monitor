<template>
    <div ref="chart" :style="style"></div>
</template>
<script setup>
import { ref,shallowRef,watch,computed,onMounted,onDeactivated,onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
const {width,height,option} = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type:String,
        default: '100%'
    },
    option: {
        type: Object,
        default: () => ({
            title: {
                text: 'ECharts 入门示例',
                textStyle: {
                    color: '#fff',
                },
            },
            textStyle: {
                color: '#fff',
            },
            tooltip: {},
            legend: {
                data: ['销量'],
                textStyle: {
                    color: '#fff',
                },
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        })
    }
})

const chart = ref()
const mychart = shallowRef()
const style = computed(()=> {
    return {
        width,
        height
    }
})
onMounted(() => {
    console.log('子组件mounted')
    initChart()
})

watch(()=> option,(newV,oldV)=> {
    console.log('chart watch')
    mychart.value && mychart.value.setOption(newV)
},{deep:true,immediate:true})

// 防止 echarts 页面 keepAlive 时，还在继续监听页面
onDeactivated(()=> {
    window.removeEventListener('resize',echartsResize)
})

onBeforeUnmount(()=> {
    window.removeEventListener('resize',echartsResize)
})

const echartsResize = ()=> {
        mychart.value && mychart.value.resize()
}
const initChart = () => {
    // 如果有同一个图表，切换tab展示不同数据，不用清除图表mychart.clear()，而是重新setOption即可。（未实践）
    // 基于准备好的dom，初始化echarts实例
    mychart.value = echarts.init(chart.value)
    // 使用刚指定的配置项和数据显示图表
    mychart.value.setOption(option)
    // 响应式
    window.addEventListener('resize',echartsResize)
}




</script>