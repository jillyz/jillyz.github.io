// define(function() {
//----經費-------
function renderChartFunds34() {
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
            top: 50,
            bottom: 40,
            left: 30,
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
            data: ['核定經費', '發包經費', '件數']
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisPointer: {
                type: 'shadow'
            },
            data: ['水利規劃試驗所-水資源規劃課', '水利規劃試驗所-地下水文研究中心', '水利署-水文技術組', '水利署-水利防災中心', '水利署-水源經營組', '水利署-保育事業組', '南區水資源局-設計課']
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
                    6868,
                    2450,
                    6800,
                    7200,
                    28000,
                    8900,
                    4290,
                ]
            },
            {
                name: '發包經費',
                type: 'bar',
                yAxisIndex: 1,
                data: [
                    4368,
                    2420,
                    3870,
                    7010,
                    13000,
                    0,
                    0
                ]
            },
            {
                name: '件數',
                type: 'line',
                yAxisIndex: 2,
                data: [
                    2,
                    1,
                    2,
                    2,
                    2,
                    4,
                    1
                ]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    myChart.on('click', function(params) {
        //for demo
        document.getElementById('fundsDetail').style.display = 'block';
        renderChartFunds4();
        renderChartFunds54();
    });
}
// renderChartFunds22();
// });