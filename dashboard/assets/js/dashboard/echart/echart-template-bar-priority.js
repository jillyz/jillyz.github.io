// define(function() {
//----經費-------
function renderChartPriorityBar(domId, data) {
    var dom = document.getElementById(domId);
    var myChart = echarts.init(dom);
    var app = {};

    var option;

    option = {
        backgroundColor: '#FFFFFF',
        title: {
            text: data.title ? data.title : '',
            textStyle: {
                fontSize: 16,
                left: 0,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            top: 35
        },
        grid: {
            top: 70,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            inverse: true,
            data: data.yAxis,
        },
        color: ['#5ECDE1', '#5470C6', '#91CC75', '#FAC858'],
        series: [{
                name: data.series[0].name,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data.series[0].data,
                cursor: 'default',
            },
            {
                name: data.series[1].name,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data.series[1].data,
                cursor: 'default',
            },
            {
                name: data.series[2].name,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data.series[2].data,
                cursor: 'default',
            },
            {
                name: data.series[3].name,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series',
                },
                data: data.series[3].data,
                cursor: 'default',
            }
        ],
    };

    myChart.resize();

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }



    window.onresize = function() {
        myChart.resize();
    };

}
// renderChartFunds21();
// });