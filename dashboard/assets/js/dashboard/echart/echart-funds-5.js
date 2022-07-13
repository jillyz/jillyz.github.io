// define(function() {
//----經費-------
function renderChartFunds51() {
    console.log('renderChartFunds51');
    var dom = document.getElementById("funds5");
    var myChart = echarts.init(dom);
    var app = {};

    var option;



    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    option = {
        backgroundColor: '#FFFFFF',
        // title: {
        //     text: '綜企組',
        //     textStyle: {
        //         fontSize: 16,
        //         color: '#3E3E3E',
        //     },
        //     left: '-5',
        // },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            top: 70,
            bottom: 70,
            left: '5%',
            right: 160
        },
        toolbox: {
            // feature: {
            //     dataView: { show: true, readOnly: false },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            // }
        },
        legend: {
            data: ['核定經費', '發包經費', '件數'],
            bottom: 10,
            left: 20
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisPointer: {
                type: 'shadow'
            },
            data: [
                '一般行政',
                '水利行政業務',
                '水資源企劃及保育',
                '水資源科技發展',
                '水資源開發及維護',
                '河川海岸及排水環境營造',
                '其他',
            ],

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
                    47210, 950, 14950, 123355, 44861, 100568, 49000, 23526, 11875, 59042, 15932, 65244
                ]
            },
            {
                name: '發包經費',
                type: 'bar',
                yAxisIndex: 1,
                data: [
                    45500, 947, 0, 109950, 25855, 97770, 38094, 11211, 11875, 54176, 15654, 58770
                ]
            },
            {
                name: '件數',
                type: 'line',
                yAxisIndex: 2,
                data: [11, 1, 1, 18, 11, 18, 6, 5, 3, 18, 4, 14]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// renderChartFunds22();
// });