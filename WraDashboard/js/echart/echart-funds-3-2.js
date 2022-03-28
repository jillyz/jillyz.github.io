// define(function() {
//----經費-------
function renderChartFunds32() {
    var dom = document.getElementById("funds3");
    var myChart = echarts.init(dom);
    var app = {};

    var option;



    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            left: '5%',
            right: '15%'
        },
        toolbox: {
            // feature: {
            //     dataView: { show: true, readOnly: false },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            // }
        },
        legend: {
            data: ['核定經費', '發包經費', '件數']
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            // prettier-ignore
            data: ['一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局', '水規所', '北水局', '中水局', '南水局', '水特局']
        }],
        yAxis: [{
                type: 'value',
                name: '核定經費',
                position: 'right',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value}千元'
                }
            },
            {
                type: 'value',
                name: '發包經費',
                position: 'right',
                alignTicks: true,
                offset: 80,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}千元'
                }
            },
            {
                type: 'value',
                name: '件數',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [{
                name: '核定經費',
                type: 'bar',
                data: [
                    32115, 55455, 67338, 41030, 212588, 115320, 78305, 30020, 54246, 40829, 142786, 116652, 240039, 199786, 103110
                ]
            },
            {
                name: '發包經費',
                type: 'bar',
                yAxisIndex: 1,
                data: [
                    26706, 45398, 66126, 34996, 181178, 103279, 71972, 25646, 54042, 38952, 127153, 107957, 233472, 181901, 92521
                ]
            },
            {
                name: '件數',
                type: 'line',
                yAxisIndex: 2,
                data: [7, 10, 13, 12, 27, 22, 15, 10, 14, 15, 37, 27, 52, 55, 23]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// renderChartFunds22();
// });