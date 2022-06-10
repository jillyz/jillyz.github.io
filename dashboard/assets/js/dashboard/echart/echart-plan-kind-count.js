// define(function() {
//----計畫類型------
function renderChartPlanKindCount() {
    var domChartPlanKindCount = document.getElementById("chartPlanKindCount");
    var myChartPlanKindCount = echarts.init(domChartPlanKindCount);

    var optionPlanKindCount;
    optionPlanKindCount = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '件數',
            textStyle: {
                fontSize: 24
            },
            left: 'center',
            top: '23%',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
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
            // selectedMode: 'single',
            showEmptyCircle: true,
            label: {
                show: false,
                position: 'center'
            },
            // emphasis: {
            //     itemStyle: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     }
            // },
            // selected: {
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
                { value: 128, name: '單一年度計畫' },
                { value: 114, name: '延續性計畫' },
                { value: 202, name: '跨年度計畫' },
                { value: 16, name: '代辦計畫' },
            ]
        }]
    };
    if (optionPlanKindCount && typeof optionPlanKindCount === 'object') {
        myChartPlanKindCount.setOption(optionPlanKindCount);
    }


}
renderChartPlanKindCount();
// });