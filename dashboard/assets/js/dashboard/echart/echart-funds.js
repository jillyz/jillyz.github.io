//----經費-------
function renderChartFunds(container, myValue, myColor='#47bba8') {
    var domFunds = document.getElementById(container);
    var myChartFunds = echarts.init(domFunds);

    var optionFunds;

    const gaugeDataFunds = [{
        value: myValue,
        // name: '經費達成率',
        title: {
            offsetCenter: ['0%', '0'],
            fontSize: 12,
            color: '#9D9D9D'
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%'],
            fontSize: 16,
            fontWeight: 'normal'
        }
    }, ];
    optionFunds = {
        // backgroundColor: '#FFFFFF',
        color: myColor,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: '#b57bee'
        //     },
        //     {
        //         offset: 1,
        //         color: '#392d69'
        //     }
        // ]),
        series: [{
            cursor: 'default',
            type: 'gauge',
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -270,
            radius: '80%',
            pointer: {
                show: false
            },
            progress: {
                show: true,
                overlap: false,
                roundCap: true,
                clip: false,
                itemStyle: {
                    borderWidth: 0,
                    borderColor: '#464646',                    
                }
            },
            axisLine: {
                lineStyle: {
                    width: 8,
                    // color: [[1,'#2e3246']],
                    color: [[1,'#2a2d3c']],
                }
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10,                
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                distance: 50,
            },
            data: gaugeDataFunds,
            title: {
                fontSize: 14,
                
            },
            detail: {
                width: 50,
                height: 14,
                fontSize: 14,
                color: 'rgba(255,255,255, .75)',
                // borderColor: 'auto',
                // borderRadius: 20,
                // borderWidth: 1,
                formatter: '{value}%'
            }
        }]
    };

    if (optionFunds && typeof optionFunds === 'object') {
        myChartFunds.setOption(optionFunds);
    }

}
renderChartFunds('chartFunds-1', 76, '#FF5CEA');
renderChartFunds('chartFunds-2', 90, '#FF835C');
renderChartFunds('chartFunds-3', 53, '#37ffdf');
renderChartFunds('chartFunds-4', 63, '#5dbeff');
// renderChartFunds('chartFunds-1', 76,);
// renderChartFunds('chartFunds-2', 90,);
// renderChartFunds('chartFunds-3', 53,);
// renderChartFunds('chartFunds-4', 63,);

