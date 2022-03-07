// define(function() {
//----評選委員遴聘次數 Top5
function renderCommittee(label, value) {


    var domCommittee = document.getElementById("chartCommittee");
    var myChartCommittee = echarts.init(domCommittee);

    var optionCommittee;
    optionCommittee = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '評選委員遴聘次數 Top 5',
            textStyle: {
                fontSize: 16
            }
        },
        color: '#5ECDE1',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            // formatter: '{b}<br/>遴聘次數: <b>{c}</b>',
            textStyle: {
                fontSize: 12
            },
        },
        grid: {
            top: 40,
            bottom: 20,
            left: 50,
            right: 40,
        },
        yAxis: {
            type: 'category',
            data: label,
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
            data: value,
            type: 'bar',
            barWidth: 8,
            label: {
                show: true,
                position: 'right',
                color: '#5ECDE1',
            },
        }]
    };

    if (optionCommittee && typeof optionCommittee === 'object') {
        myChartCommittee.setOption(optionCommittee);
    }

    window.onresize = function() {
        myChartCommittee.resize();
    };
}
var labelCommittee = ['李安安', '陳欣欣', '張明明', '黃大大', '林瑋瑋'];
var valueCommittee = [10, 8, 7, 6, 5];
renderCommittee(labelCommittee, valueCommittee);
// });