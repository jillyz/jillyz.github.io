// define(function() {
//----經費-------
function renderChartFunds() {
    var domFunds = document.getElementById("chartFunds");
    var myChartFunds = echarts.init(domFunds);

    var optionFunds;

    const gaugeDataFunds = [{
        value: 77,
        name: '經費達成率',
        title: {
            offsetCenter: ['0%', '-30%'],
            fontSize: 12,
            color: '#9D9D9D'
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%'],
            fontSize: 28,
        }
    }, ];
    optionFunds = {
        backgroundColor: '#FFFFFF',
        color: '#5CC1FF',
        series: [{
            type: 'gauge',
            center: ['65%', '50%'],
            startAngle: 90,
            endAngle: -270,
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
                    borderColor: '#464646'
                }
            },
            axisLine: {
                lineStyle: {
                    width: 16
                }
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                distance: 50
            },
            data: gaugeDataFunds,
            title: {
                fontSize: 14
            },
            detail: {
                width: 50,
                height: 14,
                fontSize: 14,
                color: 'auto',
                borderColor: 'auto',
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
renderChartFunds();
// });