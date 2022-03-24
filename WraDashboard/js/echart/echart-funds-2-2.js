// define(function() {
//----經費-------
function renderChartFunds22() {
    var dom = document.getElementById("funds2");
    var myChart = echarts.init(dom);
    var app = {};

    var option;



    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {},
        grid: {
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
            data: ['一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局', '北水局', '中水局', '南水局', '水規所', '水特局']
        },
        series: [

            {
                name: '計畫書已核可',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1, 2, 6, 1, 4, 6, 1, 2, 3, 5, 11, 5, 6, 12, 6]
            },
            {
                name: '評選完成',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 3, 0]
            },
            {
                name: '簽約或議價完成',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [4, 5, 7, 9, 14, 12, 8, 6, 6, 5, 6, 39, 28, 8, 12]
            }

        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}
// renderChartFunds21();
// });