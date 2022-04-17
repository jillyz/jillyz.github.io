// define(function() {
//----經費-------
function renderChartFunds54() {
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
                '公共用水效率提升計畫',
                '尖端地層下陷防治技術之研發',
                '智慧水管理技術研發',
                '韌性防災調適與評估研究',
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
                    8900,
                    9250,
                    21658,
                    24700,
                ]
            },
            {
                name: '發包經費',
                type: 'bar',
                yAxisIndex: 1,
                data: [
                    0,
                    6290,
                    17368,
                    7010,
                ]
            },
            {
                name: '件數',
                type: 'line',
                yAxisIndex: 2,
                data: [
                    4,
                    3,
                    3,
                    4,
                ]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// renderChartFunds22();
// });