// define(function() {
//----計畫類型------
function renderChartPlanEngFunds() {
    var domChartPlanEngFunds = document.getElementById("chartPlanEngFunds");
    var myChartPlanEngFunds = echarts.init(domChartPlanEngFunds);

    var optionPlanEngFunds;
    optionPlanEngFunds = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '經費',
            textStyle: {
                fontSize: 24
            },
            left: 'center',
            top: '32%',
        },
        tooltip: {
            trigger: 'item',
            // formatter: '{b}<br/><b>{c}</b> ({d}%)',
            formatter: '{b}<br/><b>{d}%</b>',
            // valueFormatter: (value) => value.toLocaleString('zh-TW', { style: 'currency', currency: 'NTD', minimumFractionDigits: 0 }),
            textStyle: {
                fontSize: 12
            },
        },
        legend: {
            bottom: '5%',
            left: 'center',
            icon: 'circle',
            bottom: 0,
        },
        series: [{
            // name: 'Access From',
            type: 'pie',
            color: ['#5ECDE1', '#E9ECF7'],
            top: 0,
            center: ['50%', '40%'],
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
            // emphasis: {
            //     itemStyle: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     }
            // },
            labelLine: {
                show: false
            },
            data: [
                { value: 85673000, name: '八大類計畫' },
                { value: 34890000, name: '非八大類' },
            ]
        }]
    };
    if (optionPlanEngFunds && typeof optionPlanEngFunds === 'object') {
        myChartPlanEngFunds.setOption(optionPlanEngFunds);
    }


}
renderChartPlanEngFunds();
// });