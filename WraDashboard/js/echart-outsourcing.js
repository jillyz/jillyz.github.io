// define(function() {
//----發包情形------
function renderChartOutsourcing() {
    var domChartOutsourcing = document.getElementById("chartOutsourcing");
    var myChartOutsourcing = echarts.init(domChartOutsourcing);

    var optionOutsourcing;
    optionOutsourcing = {
        backgroundColor: '#FFFFFF',
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
            left: 'center'
        },
        color: [
            '#E04C9B',
            '#5CC1FF',
        ],
        series: [{
            center: ['40%', '32%'],
            name: '發包情形',
            type: 'pie',
            radius: ['0%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
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
                { value: 136, name: '未發包' },
                { value: 250, name: '已發包' },

            ]
        }]
    };
    if (optionOutsourcing && typeof optionOutsourcing === 'object') {
        myChartOutsourcing.setOption(optionOutsourcing);
    }

    myChartOutsourcing.on('click', function(params) {
        window.open('dashboard_plan_detail.html?outsourcing=' + encodeURIComponent(params.name)).focus();
    });

}
renderChartOutsourcing();
// });