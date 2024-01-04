import * as echarts from 'echarts'
export const usePie = () => {
    return{
        // backgroundColor: '#354687',
        title: [
            {
                text: '车辆维保',
                textStyle: {
                    color: '#fff'
                },
            },
            {
                text: '处理率',
                x: 'center',
                top: '32%',
                textStyle: {
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: '100',
                },
            },
            {
                text: '60%',
                x: 'center',
                top: '50%',
                textStyle: {
                    fontSize: 35,
                    color: '#00f0ff',
                    foontWeight: '500',
                },
            },
        ],
        polar: {
            radius: ['44%', '50%'],
            center: ['50%', '50%'],
        },
        angleAxis: {
            max: 100,
            show: false,
        },
        radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                type: 'pie',
                startAngle: 0,
                radius: ['83%', '90%'],
                center: ['50%', '50%'],
                data: [
                    {
                        hoverOffset: 1,
                        value: 75,
                        name: '',
                        itemStyle: {
                            color: '#00f0ff',
                        },
                        label: {
                            show: false,
                        },
                        labelLine: {
                            smooth: true,
                            lineStyle: {
                                width: 0,
                            },
                        },
                    },
                    {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            smooth: true,
                            lineStyle: {
                                width: 0,
                            },
                        },
                        value: 100 - 75,
                        itemStyle: {
                            color: 'rgba(251, 200, 79, 0)',
                        },
                    },
                ],
            },
            {
                name: '',
                type: 'pie',
                startAngle: 90,
                radius: '80%',
                center: ['50%', '50%'],
                itemStyle: {
                    labelLine: {
                        show: false,
                    },
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                        {
                            offset: 1,
                            color: 'rgba(55,70,130, 1)',
                        },
                        {
                            offset: 0,
                            color: 'rgba(55,70,130, 0)',
                        },
                    ]),
                    shadowBlur: 10,
                    // shadowColor: 'rgba(55,70,130, 1)'
                },
                data: [
                    {
                        value: 100,
                    },
                ],
            },
        ],
    };
}