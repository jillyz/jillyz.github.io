function pie(target, colors, data) {
    var domChartOutsourcing = document.getElementById(target);
    var myChart = echarts.init(domChartOutsourcing);  
    var myOptions = {
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
            textStyle: {
                fontSize: 16
            },
        },
        legend: {
            show: false
        },
        color: colors,
        series: [{
            cursor: 'default',
            center: ['50%', '50%'],
            type: 'pie',
            radius: ['0%', '75%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
            labelLine: {
                show: false
            },
            data: data
        }]
    };
    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }

}
