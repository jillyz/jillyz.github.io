// define(function() {
//----經費-------
function renderChartFunds21() {
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
            data: ['綜企組', '水文組', '水源組', '河海組', '保育組', '工務組', '水政組', '土地組', '河勘隊', '防災中心', '資訊室', '秘書室']
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
                data: [2, 10, 2, 2, 5, 1, 0, 0, 1, 2, 0, 0]
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
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
                data: [8, 7, 3, 1, 11, 0, 9, 1, 1, 13, 13, 4]
            }

        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// renderChartFunds22();
// });