function gauge(target, myValue, myColor) {
    var domTarget = document.getElementById(target);
    var myChart = echarts.init(domTarget);
    const gaugeData = [{
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體'
        },
        value: myValue,
        title: {
            offsetCenter: ['0%', '0'],
            fontSize: 12,
            color: '#9D9D9D'
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%'],
            fontSize: 24,
            // fontWeight: 'normal'
        }
    }, ];
    var myOptions = {
        color: myColor,
        series: [{
            cursor: 'default',
            type: 'gauge',
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -270,
            radius: '85%',
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
                    width: 9,
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
            data: gaugeData,
            title: {
                fontSize: 14,
                
            },
            detail: {
                width: 50,
                height: 14,
                fontSize: 14,
                color: 'rgba(255,255,255, 1)',
                formatter: '{value}%',
            }
        }]
    };

    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }

    window.onresize = function() {
        myChart.resize();
    };
}



