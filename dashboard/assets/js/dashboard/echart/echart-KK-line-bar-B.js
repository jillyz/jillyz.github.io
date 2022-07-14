
function lineBar(target, category, amount, apprMoney) {
    var domTarget = document.getElementById(target);
    var myChart = echarts.init(domTarget, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var colors = [ '#ff5ab8', '#5dbeff', '#3b4aff'];
    var myOptions = {
        color: colors,    
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體'
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 16
            },
            axisPointer: {
                // type: 'cross',
                // crossStyle: {
                //     color: '#999',
                //     backgroundColor: 'red'
                // }
            }
        },
        legend: {
            data: ['件數','提報經費' ],
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: category,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    // color: 'rgba(255,255,255,1)',
                    textStyle:{
                        fontSize:16,
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '提報經費',
                position: 'right',
                alignTicks: true,
                axisLabel: {
                    formatter: '{value} 千元',
                    // color: 'rgba(255,255,255,1)',
                    textStyle:{
                        fontSize:16,
                        color: '#fff',
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
                        backgroundColor: 'red'
                    },
                },
            },
            {
                type: 'value',
                name: '件數',
                position: 'left',
                alignTicks: true,
                axisLabel: {
                    color: 'rgba(255,255,255,1)',
                    textStyle:{
                        fontSize:16
                    }
                },
                axisLine: {
                    lineStyle: {
                        // color: colors[0]
                        color: 'rgba(255,255,255,1)',
                    }
                },
            },  
        ],
        series: [
            {
                name: '件數',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 件';
                    }
                },
                data: amount
            },
            {
                name: '提報經費',
                type: 'bar',
                barWidth: '20',
                tooltip: {
                    valueFormatter: function (value) {
                        return toCurrency(value) + ' 千元';
                    }
                },
                data: apprMoney
            },       
        ]
    };

    function toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }

    window.addEventListener('resize', myChart.resize);
    
}




