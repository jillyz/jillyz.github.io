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
            // formatter: '{b}<br/><b>{c}</b> ({d}%)',
            formatter: function(params){
                return `${params.name}<br><b>${toCurrency(params.value)} (${params.percent}%)</b>`;
            },
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
            data: data,
        }]
    };
    function toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }

}
