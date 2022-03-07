// define(function() {
//----計畫類型------
function renderChartPlanKindFunds() {
    var domChartPlanKindFunds = document.getElementById("chartPlanKindFunds");
    var myChartPlanKindFunds = echarts.init(domChartPlanKindFunds);

    var optionPlanKindFunds;
    optionPlanKindFunds = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '經費',
            textStyle: {
                fontSize: 24
            },
            left: 'center',
            top: '23%',
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
            top: 0,
            center: ['50%', '30%'],
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
                { value: 939900000, name: '新興計畫' },
                { value: 1029890000, name: '延續性計畫' },
                { value: 774900000, name: '跨年度計畫' },
                { value: 254970000, name: '代辦計畫' },
            ]
        }]
    };
    if (optionPlanKindFunds && typeof optionPlanKindFunds === 'object') {
        myChartPlanKindFunds.setOption(optionPlanKindFunds);
    }


}
renderChartPlanKindFunds();
// });