
function horizontalBar(target, title ,category, data) {
    var domTarget = document.getElementById(target);
    var myChart = echarts.init(domTarget);    
    var myOptions = {
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體',
        },
        title: {
            text: title,
            textStyle: {
                fontSize: 16,
                color: 'rgba(255, 255, 255, 1)',
                fontWeight: 'normal',
            },
            show: true,
            left: '-5',
            top: '-2.5'
        },
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#fbc523'
            },
            {
                offset: 1,
                color: '#fa8800'
            }
        ]),
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 16
            },
        },
        grid: {
            top: 40,
            bottom: 20,
            right: 40,
            containLabel: true,
        },
        yAxis: {
            type: 'category',
            data: category,
            inverse: true,
            axisLabel: {
                color: '#fff',
                textStyle:{
                    fontSize: 16
                }
            }
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            }
        },
        series: [{
            cursor: 'default',
            data: data,
            type: 'bar',
            barWidth: 13,
            label: {
                show: true,
                position: 'right',
                color: '#fff',
            },
        }]
    };

    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }

    window.onresize = function() {
        myChart.resize();
    };
}

