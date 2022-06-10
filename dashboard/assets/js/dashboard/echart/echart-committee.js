// define(function() {
//----評選委員遴聘次數 Top5
function renderCommittee(label, value) {


    var domCommittee = document.getElementById("chartCommittee");
    var myChartCommittee = echarts.init(domCommittee);

    var optionCommittee;
    optionCommittee = {
        // backgroundColor: '#FFFFFF',
        title: {
            text: '遴聘次數最多委員',
            textStyle: {
                fontSize: 13,
                color: '#fff',
                fontWeight: 'normal'
            },
            show: false,
            left: '-5',
            top: '-2.5'
        },
        // color: '#47bba8',
        // color: '#5dbeff',
        // color: '#37ffdf',
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#0071bc'
            },
            {
                offset: 1,
                color: '#37ffdf'
            }
        ]),
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
            top: 30,
            bottom: 20,
            left: 50,
            right: 40,
        },
        yAxis: {
            type: 'category',
            data: label,
            inverse: true,
            axisLabel: {
                // color: '#fff',
                color: 'rgba(255,255,255, .5)',
            }
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
            cursor: 'default',
            data: value,
            type: 'bar',
            barWidth: 10,
            label: {
                show: true,
                position: 'right',
                color: '#fff',
                // fontWeight: 'normal'
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
var labelCommittee = ['李安安', '陳欣欣', '張明明', ];
var valueCommittee = [10, 8, 7];
renderCommittee(labelCommittee, valueCommittee);
// });