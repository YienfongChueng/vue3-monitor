import * as echarts from 'echarts'
import 'echarts-liquidfill'
// 水球
export const useLiquidFill = (value) => {
    return {
        // backgroundColor: '#0F224C', //背景色
        title: {
            text: '电量消耗',
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: '预估量',
                type: 'liquidFill',
                radius: '60%',
                center: ['50%', '50%'],
                backgroundStyle: {
                    color: 'transparent',
                },
                data: [value, value],
                amplitude: 20, //水波振幅
                label: {
                    //标签设置
                    position: ['50%', '50%'],
                    // formatter: '50%', //显示文本,
                    fontSize: '35px', //文本字号,
                    color: '#fff',
                },
                outline: {
                    borderDistance: 3,
                    itemStyle: {
                    borderWidth: 2,
                    borderColor: {
                        type: 'linear',
                        x: 1,
                        y: 0,
                        x2: 0,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#007DFF',
                            },
                            {
                                offset: 0.6,
                                color: 'rgba(45, 67, 114, 1)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(45, 67, 114, 1)',
                            },
                        ],
                        globalCoord: false,
                    },
                    },
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                        offset: 1,
                        color: 'rgba(31, 222, 225, 1)',
                    },
                    {
                        offset: 0.85,
                        color: '#007DFF80',
                    },
                    {
                        offset: 0.35,
                        color: '#004a99',
                    },
                    {
                        offset: 0,
                        color: 'rgba(31, 222, 225, 1)',
                    },
                    ]),
                },
            },
        ]
    }
}