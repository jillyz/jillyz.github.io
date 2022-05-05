// define(function() {
//----經費-------
function renderChartFunds1() {
    var dom = document.getElementById("funds1");
    var myChart = echarts.init(dom);
    var app = {};

    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'value'
        }],

        axisLabel: {
            formatter: '{value}千元'
        },
        yAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            inverse: true,
            data: ['公務預算', '水資源作業基金', '代辦經費', '前瞻基礎建設計畫第3期特別預算']
        }],
        series: [{
                cursor: 'default',
                name: '預算經費',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1489870, 613588, 68030, 253379]
            },
            {
                name: '核定經費',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1164348, 667921, 72657, 181205]
            },
            {
                name: '剩餘經費',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'left'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [325520, -54333, -4627, 72172]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}
// renderChartFunds1();
// });