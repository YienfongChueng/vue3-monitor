
import * as echarts from 'echarts'
export const useLine = ()=> {
    let xLabel = ['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月']
    let goToSchool = ["40", "60", "22", "85", "50", "40",'33','11','23','43','54','66']
    let goOutSchool = ["20", "50", "12", "65", "30", "60",'76','45','87','34','23','21']

    return{
        tooltip: {
            trigger: 'axis',
            backgroundColor:'transparent',
            textStyle: {
                color: '#fff',
            },
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(126,199,255,0)' // 0% 处的颜色
                        }, {
                            offset: 0.5,
                            color: 'rgba(126,199,255,1)' // 100% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(126,199,255,0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
            },
        },
        legend: {
            align: "left",
            right: '10%',
            top:'10%',
            type:'plain',
            textStyle:{
                color:'#7ec7ff',
                fontSize:14
            },
            // icon:'rect',
            itemGap:50,
            itemWidth:100,
            itemHeight:10,
            icon:'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

            data: [
                {
                    name: '生活保障类'
                },
                {
                    name: '品质提升类'
                }
            ]
        },
        grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: '#233653'
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                color: '#7ec7ff',
                padding: 16,
                fontSize: 14,
                formatter: function(data) {
                    return data
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#192a44'
                },
            },
            axisTick: {
                show: false,
            },
            data: xLabel
        }],
        yAxis: [{
            name: '百分比',
            nameTextStyle: {
                color: "#7ec7ff",
                fontSize: 16,
                padding: 10
            },
            min: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#192a44'
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#233653"
                }

            },
            axisLabel: {
                show: true,
                color: '#7ec7ff',
                padding: 16,
                formatter: function(value) {
                    if (value === 0) {
                        return value
                    }
                    return value
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '生活保障类',
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                width: 4,
                color: "rgba(25,163,223,1)", // 线条颜色
                borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
                color: "rgba(25,163,223,1)",
                borderColor: "#646ace",
                borderWidth: 2

            },
        
            areaStyle: { //区域填充样式
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(25,163,223,.3)"
                    },
                    {
                        offset: 1,
                        color: "rgba(25,163,223, 0)"
                    }
                ], false),
                shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            },
            data: goToSchool
        }, {
            name: '品质提升类',
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                width: 4,
                color: "rgba(10,219,250,1)", // 线条颜色
                borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
                color: "rgba(10,219,250,1)",
                borderColor: "#646ace",
                borderWidth: 2

            },
        
            areaStyle: { //区域填充样式
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(10,219,250,.3)"
                    },
                    {
                        offset: 1,
                        color: "rgba(10,219,250, 0)"
                    }
                ], false),
                shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            },
            data: goOutSchool
        }]
    };
}