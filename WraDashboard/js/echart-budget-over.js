// define(function() {
//----經費-------
function renderChartBudget() {
    var domBudget = document.getElementById("chartBudgetRequestOver");
    var myChartBudget = echarts.init(domBudget);

    var optionBudget;

    optionBudget = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '預算核定總經費',
            textStyle: {
                fontSize: 13
            },
            left: '-5',
            top: '-2.5'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            top: '25%',
            right: 0,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                color: "#bbb",
                fontSize: 9
            },
        },
        yAxis: {
            type: 'category',

            data: ['']
        },
        series: [{
                name: '預算申請',
                type: 'bar',
                color: '#5470C6',
                emphasis: {
                    focus: 'series'
                },
                data: [25700000]
            },
            {
                name: '預算核定總經費',
                type: 'bar',
                stack: 'total',
                color: '#666666',
                emphasis: {
                    focus: 'series'
                },
                data: [22000000]
            },

            {
                name: '超額申請',
                type: 'bar',
                stack: 'total',
                stack: 'total',
                color: '#EE6666',
                emphasis: {
                    focus: 'series'
                },
                data: [3700000]
            },
        ]
    };

    if (optionBudget && typeof optionBudget === 'object') {
        myChartBudget.setOption(optionBudget);
    }

}
renderChartBudget();
// });