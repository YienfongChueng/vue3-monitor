
export const useLineBar = () => {
    return {
        // backgroundColor: '#000',
        title: {
            text: '车辆分析',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            top: "4%",
            left: '75%',
            itemWidth: 20,
            itemHeight: 8,
            itemStyle: {
            color: "#18A4FF"
            },
            textStyle: {
                color: "#c0c3cd",
                fontSize: 13,
                padding: [2, 0, 0, 0]
            }
        },
        grid: {
            top: '23%',
            left: '14%',
            bottom: '25%',
            right: '10%'
        },
        xAxis: {
                nameTextStyle: {
                    color: "#c0c3cd",
                    padding: [0, 0, -10, 0],
                    fontSize: 14
                },
                axisLabel: {
                    interval: 0,
                },
                color: '#639FD2', //坐标轴字颜色
                margin: 15,
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                splitLine: {     //网格线
                    show: false
                },
                data: ["2018-11", "2018-12", "2019-01", "2019-02", "2019-03", "2019-04"],
                type: "category"
        },
        yAxis: {
            axisLine: {
                show: false, //隐藏X轴轴线
            },
            axisTick: {
                show: false //隐藏X轴刻度
            },
            axisLabel: {
                show: false
            },
            splitLine: {     //网格线
                show: false
            }
        },
        series: [
            {
                name: '市场份额',
                data: [200, 85, 112, 275, 305, 415],
                type: "bar",
                barMaxWidth: "auto",
                // "barWidth": 7,
                barWidth: 17,
                itemStyle: {
                    borderRadius: [7, 7, 0, 0], // 圆角（左上、右上、右下、左下）
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: "linear",
                        global: false,
                        colorStops: [{
                            offset: 0,
                            color: "#0667B2"
                        }, {
                            offset: 1,
                            color: "#31DEFF"
                        }]
                    }
                },
                label: {
                    show: true,
                    position: "top",
                    distance: 10,
                    color: "#fff",
                    formatter: '{c}%',
                    fontSize: 13
                }
            },
            {
                name: '市场排名',
                type: 'line',
                symbol: 'circle',
                symbolSize: 30,
                itemStyle: {
                    color: '#0F80C2',
                    borderColor: '#fff',
                    borderWidth: 1
                },
                lineStyle: {
                    width: 2,
                    color: "#0F80C2",
                },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 10,
                    color: '#fff'
                },
                data: [80, 162, 91, 134, 144, 130]
            },
        ]
    }
}