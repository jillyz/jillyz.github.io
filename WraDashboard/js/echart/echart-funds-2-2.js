// define(function() {
//----經費-------
function renderChartFunds22() {
    var dom = document.getElementById("funds22");
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
            data: ['四河局', '五河局', '六河局', '北水局', '中水局', '南水局', '水源局']
        },
        color: ['#5ECDE1', '#5470C6', '#91CC75', '#FAC858'],
        series: [{
                name: '計畫書未核可',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [0, 0, 0, 0, 0, 0, 0]
            },
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
                data: [0, 0, 0, 0, 0, 0, 0]
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
                data: [0, 0, 0, 0, 0, 0, 0]
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
                data: [1, 1, 2, 2, 11, 6, 4]
            }
        ],
        // series: [{
        //         name: '計畫書未核可',
        //         type: 'bar',
        //         stack: 'total',
        //         label: {
        //             show: true
        //         },
        //         emphasis: {
        //             focus: 'series'
        //         },
        //         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        //     },
        //     {
        //         name: '計畫書已核可',
        //         type: 'bar',
        //         stack: 'total',
        //         label: {
        //             show: true
        //         },
        //         emphasis: {
        //             focus: 'series'
        //         },
        //         data: [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 10, 1, 3, 5, 2]
        //     },
        //     {
        //         name: '評選完成',
        //         type: 'bar',
        //         stack: 'total',
        //         label: {
        //             show: true
        //         },
        //         emphasis: {
        //             focus: 'series'
        //         },
        //         data: [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0]
        //     },
        //     {
        //         name: '簽約或議價完成',
        //         type: 'bar',
        //         stack: 'total',
        //         label: {
        //             show: true
        //         },
        //         emphasis: {
        //             focus: 'series'
        //         },
        //         data: [2, 2, 1, 3, 0, 3, 5, 5, 1, 4, 3, 14, 13, 3, 8]
        //     }

        // ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}
// renderChartFunds21();
// });