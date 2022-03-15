// define(function() {
//----圓餅圖樣板------
function renderChartTemplatePieCircle(setting) {
    var domChart = document.querySelector(setting.dom);
    var myChart = echarts.init(domChart);

    console.log(setting)

    var option;
    option = {
        backgroundColor: '#FFFFFF',
        title: {
            text: setting.title ? setting.title : '',
            textStyle: {
                fontSize: setting.titleFontSize ? setting.titleFontSize : '24'
            },
            left: 'center',
            top: '23%',
        },
        tooltip: {
            trigger: 'item',
            formatter: setting.tooltip.formatter ? setting.tooltip.formatter : '',
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
            color: setting.series[0].color ? setting.series[0].color : [],
            data: setting.series[0].data,
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }


}
// renderChartPlanKindCount();
// });