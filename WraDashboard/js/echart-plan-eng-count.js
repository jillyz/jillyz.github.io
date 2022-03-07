// define(function() {
//----計畫類型------
function renderChartPlanEngCount() {
    var domChartPlanEngCount = document.getElementById("chartPlanEngCount");
    var myChartPlanEngCount = echarts.init(domChartPlanEngCount);

    var optionPlanEngCount;
    optionPlanEngCount = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '件數',
            textStyle: {
                fontSize: 24
            },
            left: 'center',
            top: '32%',
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
            color: ['#5ECDE1', '#E9ECF7'],
            top: 0,
            center: ['50%', '40%'],
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            selectedMode: 'single',
            // showEmptyCircle: true,
            label: {
                show: false,
                position: 'center'
            },
            // emphasis: {
            //     itemStyle: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     },
            //     focus: 'self',
            // },
            // select: {
            //     itemStyle: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     },

            // },
            labelLine: {
                show: false
            },
            data: [
                { value: 328, name: '八大類計畫' },
                { value: 121, name: '非八大類' },
            ]
        }]
    };
    if (optionPlanEngCount && typeof optionPlanEngCount === 'object') {
        myChartPlanEngCount.setOption(optionPlanEngCount);
    }


}
renderChartPlanEngCount();
// });