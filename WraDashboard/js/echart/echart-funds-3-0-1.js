// define(function() {
//----經費-------
function renderChartFunds301() {
    var dom = document.getElementById("funds3_Apply");
    var myChart = echarts.init(dom);
    var app = {};

    var option;

    const colors = ['#5ecde1', '#EE6666'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            top: 50,
            bottom: 40,
            left: 30,
            right: 160
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['Evaporation', 'Temperature']
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            // prettier-ignore
            data: ['水利署', '一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局', '水規所', '北水局', '中水局', '南水局', '水特局']
        }],
        yAxis: [{
                type: 'value',
                name: '提報經費',
                position: 'right',
                alignTicks: true,
                offset: 80,
                axisLine: {
                    show: false,
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
                name: '件數',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [{
                name: '提報經費',
                type: 'bar',
                data: [
                    916743.10, 32115, 55455, 67338, 41030, 212588, 115320, 78305, 30020, 54246, 40829, 142786, 116652, 240039, 199786, 103110
                ]
            },
            {
                name: '件數',
                type: 'line',
                yAxisIndex: 1,
                data: [184, 7, 10, 13, 12, 27, 22, 15, 10, 14, 15, 37, 27, 52, 55, 23]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// renderChartFunds22();
// });