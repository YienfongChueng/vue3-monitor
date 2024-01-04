<template>
    <div>
        <Weather></Weather>
        <!-- 第一行 -->
        <div class="module-box">
            <div class="box" v-for="item in listBox" :key="item.id">
                <div class="list-box">
                    <i><el-icon><component :is="item.icon"></component></el-icon></i>
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
        <!-- 第二行 -->
        <div class="index-content">
            <div class="content-right">
                <el-card class="box-card content" style="height:490px">
                    <!-- 地图展示 -->
                    <MyMap></MyMap>
                </el-card>
            </div>
            <div class="content-left">
                <div style="flex:0 1 100%">
                    <el-card class="box-card content">
                        <Chart height="200px" :option="liquidFillOpt" ></Chart>
                    </el-card>
                </div>
                <div style="flex:0 1 100%">
                    <el-card class="box-card content">
                        <Chart height="200px" :option="barOption" ></Chart>
                    </el-card>
                </div>
            </div>
        </div>
        <!-- 第三行 -->
        <div class="index-content">
            <div style="flex:0 1 40%">
                <el-card class="box-card content">
                    <Chart height="300px" :option="lineOption"></Chart>
                </el-card>
            </div>
            <div style="flex:0 1 60%">
                <el-card class="box-card content">
                    <Chart height="300px" :option="lineBarOption"></Chart>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,shallowRef,onMounted } from 'vue'
import {ChromeFilled,TakeawayBox,LocationFilled,Opportunity,PieChart} from '@element-plus/icons-vue'
import Chart from './components/chart.vue'
import MyMap from './components/myMap.vue'
import Weather from './components/weather.vue'
import { useLiquidFill } from './options/liquidFill.js'
import { useLineBar } from './options/lineBar.js'
import { usePie } from './options/pie.js'
import { useLine } from './options/line.js'
import { apiUserInfo } from '@/api/modules/user'

// onMounted(()=> {
//     apiUserInfo().then(res => {
//         console.log(res)
//     })
// })

const listBox = shallowRef([
    {id:1,title: '电量监控',icon: ChromeFilled},
    {id:2,title: '车辆详情',icon: TakeawayBox},
    {id:3,title: '地图分布',icon: LocationFilled},
    {id:4,title: '车辆监控',icon: Opportunity},
    {id:5,title: '统计分析',icon: PieChart},
])
const liquidFillData = ref(0.6) // 一般请求接口返回结果
const liquidFillOpt = useLiquidFill(liquidFillData.value)

const lineBarOption = useLineBar()

const barOption = usePie()

const lineOption = useLine()
</script>

<style lang="scss" scoped>

</style>