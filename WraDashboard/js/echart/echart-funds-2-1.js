// define(function() {
//----經費-------
function renderChartFunds21() {
    var dom = document.getElementById("funds21");
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
            data: ['保育事業組', '水利防災中心', '水文技術組', '河川勘測隊', '秘書室', '工程事務組', '水利行政組', '資訊室', '河川海岸組', '水源經營組', '綜合企劃組']
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
                data: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                data: [2, 1, 6, 0, 0, 1, 0, 0, 0, 0, 2]
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                data: [10, 9, 0, 1, 4, 0, 5, 7, 1, 3, 8]
            }

        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// renderChartFunds22();
// });