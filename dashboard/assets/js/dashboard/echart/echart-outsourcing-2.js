// define(function() {
//----發包情形------
function renderChartOutsourcing() {
    var domChartOutsourcing = document.getElementById("chartOutsourcing-2");
    var myChartOutsourcing = echarts.init(domChartOutsourcing, 'dark');

    var optionOutsourcing;
    optionOutsourcing = {
        backgroundColor: 'transparent',
        // title: {
        //     text: '主辦機關',
        //     textStyle: {
        //         fontSize: 16
        //     }
        // },
        tooltip: {
            trigger: 'item',
            // formatter: '{a} <br/>{b} : <b>{c}</b> ({d}%)',
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
            textStyle: {
                fontSize: 12
            },
        },
        legend: {
            bottom: '10',
            left: 'center',
            show: false
        },
        color: [
            // '#5dbeff',
            // '#ff835c',
            // '#FFDE37',
            '#5dbeff',
            '#fff61c',
            '#ff4aa6',
            // '#5dbeff',
            // '#ff835c',
            // '#adcbdf'
        ],
        series: [{
            cursor: 'default',
            center: ['50%', '50%'],
            name: '發包情形',
            type: 'pie',
            radius: ['0%', '75%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
            // inverse: true,
            // selectedMode: 'single',
            emphasis: {
                // label: {
                //   show: true,
                //   fontSize: '40',
                //   fontWeight: 'bold'
                // },
                // itemStyle: {
                //     shadowBlur: 10,
                //     shadowOffsetX: 0,
                //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                // },
                // focus: 'self'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 202000, name: '已發包經費' },
                { value: 5000, name: '發包結餘款' },
                { value: 92000, name: '未發包經費' },

            ]
        }]
    };
    if (optionOutsourcing && typeof optionOutsourcing === 'object') {
        myChartOutsourcing.setOption(optionOutsourcing);
    }

    // myChartOutsourcing.on('click', function(params) {
    //     window.open('dashboard_plan_query.html?outsourcing=' + encodeURIComponent(params.name)).focus();
    // });

}
renderChartOutsourcing();
// });