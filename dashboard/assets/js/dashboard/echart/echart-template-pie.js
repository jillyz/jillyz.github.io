// define(function() {
//----圓餅圖樣板------
function renderChartTemplatePieCircle(setting) {
    var domChart = document.querySelector(setting.dom);
    var myChart = echarts.init(domChart);

    var option;
    option = {
        backgroundColor: 'transparent',
        title: {
            text: setting.title ? setting.title : '',            
            textStyle: {
                fontSize: setting.titleFontSize ? setting.titleFontSize : '18',
                color: 'rgba(255,255,255,1)',
                fontWeight: 'normal',
                fontFamily: '微軟正黑體'
            },
            // subtext: '$',
            // subtextStyle: {
            //     color: 'white',
            // },
            left: 'left',
            // top: '40%',
            top: 'top'
        },
        tooltip: {
            trigger: 'item',
            formatter: setting.tooltip.formatter ? setting.tooltip.formatter : '',
            textStyle: {
                // fontSize: 12
            },
        },
        legend: {
            // bottom: '5%',
            // left: 'center',
            // icon: 'circle',
            // bottom: 0,
            show: false
        },
        series: [{
            // name: 'Access From',
            type: 'pie',
            top: 0,
            center: ['50%', '50%'],
            radius: ['25%', '78%'],
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