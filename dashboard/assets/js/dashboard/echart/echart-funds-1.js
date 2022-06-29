// define(function() {
//----經費-------
function renderChartFunds1() {
    var dom = document.getElementById("funds1"); 
    var myChart = echarts.init(dom);
    var app = {};

    var option;
    const colors = ['#5dbeff','#ff835c', '#FFDE37' ];

    option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            textStyle: {
                color: 'rgba(255,255,255,.75)'
            }
        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            show: false
        }],

        axisLabel: {
            formatter: '{value} (千元)',
            color: 'rgba(255,255,255,.75)'
        },
        yAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            inverse: true,
            data: ['公務預算', '水資源作業基金', '代辦經費', '前瞻基礎建設計畫第3期特別預算']
        }],
        series: [
            {
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
                data: [1489870, 613588, 305314, 253379]
            },
            {
                cursor: 'default',
                name: '發包經費',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1164348, 667921, 152757, 181205]
            },
            {
                
                cursor: 'default',
                name: '剩餘經費',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'left '
                },
                emphasis: {
                    focus: 'series'
                },
                data: [325520, -154333, 152557, 72172]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}
// renderChartFunds1();
// });