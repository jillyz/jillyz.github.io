// define(function() {
//----經費-------
function renderChartBudget() {
    var domBudget = document.getElementById("chartBudgetRequestUnder");
    var myChartBudget = echarts.init(domBudget);

    var optionBudget;

    optionBudget = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '預算執行情形',
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
                name: '計畫申請',
                type: 'bar',
                stack: 'total',
                color: '#5470C6',
                // label: {
                //   show: true
                // },
                emphasis: {
                    focus: 'series'
                },
                data: [20000000]
            },
            {
                name: '剩餘經費',
                type: 'bar',
                stack: 'total',
                color: '#91CC75',
                emphasis: {
                    focus: 'series'
                },
                data: [2000000]
            },
            {
                name: '預算總經費',
                type: 'bar',
                color: '#666666',
                emphasis: {
                    focus: 'series'
                },
                data: [22000000]
            },
        ]
    };

    if (optionBudget && typeof optionBudget === 'object') {
        myChartBudget.setOption(optionBudget);
    }

}
renderChartBudget();
// });