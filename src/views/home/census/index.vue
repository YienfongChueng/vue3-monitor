<template>
    <div class="module-box">
        <el-card class="analysis-box">
            <div class="titleText">{{validData?.name}}</div>
            <div class="valueText validText">{{validData?.value}}<span>辆</span></div>
        </el-card>
        <el-card class="analysis-box">
            <div class="titleText">{{invalidData?.name}}</div>
            <div class="valueText invalidText">{{invalidData?.value}}<span>辆</span></div>
        </el-card>
    </div>
    <el-card class="charts">
        <Chart height="300px" v-if="!isLoad" :option="option"></Chart>
    </el-card>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import { censusStatCar } from '@/api/modules/car.js'
import Chart from '@/views/home/index/components/chart.vue'
const validData = ref({})
const invalidData = ref({})
const option = ref({})
const isLoad = ref(true)

onMounted(()=> {
    getData()
})

async function getData() {
    const {data: {data}} = await censusStatCar()
    isLoad.value = false
    validData.value = data.valid
    invalidData.value = data.invalid
    option.value = getOption([
        {
            name: validData.value.name,
            value: validData.value.value
        },
        {
            name: invalidData.value.name,
            value: invalidData.value.value
        }
    ])
}
function getOption(data) {
    return {
        title: {
          text: '车辆分析',
          textStyle: {
            color: '#fff'
          }
        },
        color: [   //按顺序设置渐变颜色
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#00ACFF'
            }, {
              offset: 1, color: '#0074FF'
            }],
            global: false // 缺省为 false
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#B262FF'
            }, {
              offset: 1, color: '#7B33FF'
            }],
            global: false
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            top: 50,
            label: {
              show: true,
              position: 'outside',
              formatter: function(val) {
                return '{a|' + val.name + '}{b|\n' + val.value + '辆}'
              },
                rich: {
                    a: {
                    color: '#B262FF',
                    fontSize: '12'
                    },
                    b: {
                    color: '#0086FF',
                    fontSize: '12',
                    padding: [4, 0, 0, 0]
                    }
                }
            },
            labelLine: {
              show: true,
              length: 40,
              length2: 30,
              minTurnAngle: 105,
              lineStyle: {
                width: 2
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              textColor: '#000'
            },
            itemStyle: {
              borderCap: 'round'
            },
            data: data // 数据
          }
        ]
    }
}
</script>

<style lang="scss" scoped>
    .analysis-box {
        flex:0 1 49%;
        height: 150px;
        text-align: center;
        .titleText {
            font-size: 30px;
            font-weight: 500;
           
        }
        .valueText {
            font-size: 50px;
            font-weight: 700;
            
        }
        .validText {
            color: #1bc6bd; 
        }
        .invalidText {
            color: #fe8688;
        }
        span{
            padding: 0 10px;
            font-size: 25px;
        }
    }
    .charts {
        margin: 20px 0;
    }

</style>