// define(function() {
//----經費-------
function renderChartFunds332() {
    var dom = document.getElementById("funds332");

    if(dom) {
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
                data: ['水源一科', '水源二科', '水源三科']
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
                        20200, 19115, 15670
                    ]
                },
                {
                    name: '發包經費',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [
                        10400, 18426, 9862
                    ]
                },
                {
                    name: '件數',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [5, 4, 3]
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
            renderChartFunds51();
        });
    }
  
}
// renderChartFunds22();
// });