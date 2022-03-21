// define(function() {
//----計畫主持人件數 Top5

function renderCompanyHosting() {
    var domCompanyHosting = document.getElementById("chartCompanyHosting");
    var myChartCompanyHosting = echarts.init(domCompanyHosting);

    var optionCompanyHosting;
    optionCompanyHosting = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '得標最多計畫主持人',
            textStyle: {
                fontSize: 13
            },
            left: '-5',
        },
        color: '#5ECDE1',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            // formatter: '{b}<br/>計畫主持人件數: <b>{c}</b>',
            textStyle: {
                fontSize: 12
            },
        },
        grid: {
            top: 30,
            bottom: 20,
            left: 50,
            right: 40,
        },
        yAxis: {
            type: 'category',
            data: ['李曉明', '陳曉惠', '張曉華', '黃小泉', '林小康'],
            inverse: true,
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            }
        },
        series: [{
            type: 'bar',
            barWidth: 8,
            data: [10, 8, 7, 6, 5],
            label: {
                show: true,
                position: 'right',
                color: '#5ECDE1',
            },
        }]
    };

    if (optionCompanyHosting && typeof optionCompanyHosting === 'object') {
        myChartCompanyHosting.setOption(optionCompanyHosting);
    }

    window.onresize = function() {
        myChartCompanyHosting.resize();
    };

}
renderCompanyHosting();
// });