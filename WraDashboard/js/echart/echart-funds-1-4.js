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
            data: [
                '公務預算/水資源科技發展/水資源科技發展/尖端地層下陷防治技術之研發',
                '公務預算/水資源科技發展/水資源科技發展/智慧水管理技術研發',
                '公務預算/水資源科技發展/水資源科技發展/韌性防災調適與評估研究',
                '公務預算/水資源科技發展/水資源科技發展/公共用水效率提升計畫',
            ]
        }],
        series: [{
                name: '預算經費',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [
                    9090,
                    21658.750,
                    24510,
                    8900,
                ]
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
                data: [
                    9250,
                    21658.750,
                    24700,
                    8900,
                ]
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
                data: [
                    -160, 
                    0,
                    -190,
                    0
                ]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}
// renderChartFunds1();
// });