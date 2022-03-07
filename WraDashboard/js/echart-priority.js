// define(function() {
//----優先序------
function renderPriority() {

    //----計畫優先序 1------

    var domPriority1 = document.getElementById("chartPriority1");
    var myChartPriority1 = echarts.init(domPriority1);
    var optionPriority1;
    optionPriority1 = {
        backgroundColor: '#FFFFFF',
        series: [{
            center: ['50%', '50%'],
            type: 'gauge',
            progress: {
                show: true,
                width: 8
            },
            axisLine: {
                lineStyle: {
                    width: 8
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                distance: 5,
                length: 2,
                lineStyle: {
                    width: 2,
                    color: '#ddd'
                }
            },
            axisLabel: {
                distance: 15,
                color: '#ccc',
                fontSize: 0
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 8,
                itemStyle: {
                    borderWidth: 8
                }
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                fontSize: 28,
                offsetCenter: [0, '50%']
            },
            data: [{
                value: 20
            }]
        }]
    };

    if (optionPriority1 && typeof optionPriority1 === 'object') {
        myChartPriority1.setOption(optionPriority1);
    }

    window.onresize = function() {
        myChartPriority1.resize();
    };

    //----計畫優先序 2------

    var domPriority2 = document.getElementById("chartPriority2");
    var myChartPriority2 = echarts.init(domPriority2);
    var optionPriority2;
    optionPriority2 = {
        backgroundColor: '#FFFFFF',
        series: [{
            type: 'gauge',
            progress: {
                show: true,
                width: 8
            },
            axisLine: {
                lineStyle: {
                    width: 8
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                distance: 5,
                length: 2,
                lineStyle: {
                    width: 2,
                    color: '#ddd'
                }
            },
            axisLabel: {
                distance: 15,
                color: '#ccc',
                fontSize: 0
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 8,
                itemStyle: {
                    borderWidth: 8
                }
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                fontSize: 28,
                offsetCenter: [0, '50%']
            },
            data: [{
                value: 30
            }]
        }]
    };

    if (optionPriority2 && typeof optionPriority2 === 'object') {
        myChartPriority2.setOption(optionPriority2);
    }

    window.onresize = function() {
        myChartPriority2.resize();
    };

    //----計畫優先序 3------

    var domPriority3 = document.getElementById("chartPriority3");
    var myChartPriority3 = echarts.init(domPriority3);
    var optionPriority3;
    optionPriority3 = {
        backgroundColor: '#FFFFFF',
        series: [{
            type: 'gauge',
            progress: {
                show: true,
                width: 8
            },
            axisLine: {
                lineStyle: {
                    width: 8
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                distance: 5,
                length: 2,
                lineStyle: {
                    width: 2,
                    color: '#ddd'
                }
            },
            axisLabel: {
                distance: 15,
                color: '#ccc',
                fontSize: 0
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 8,
                itemStyle: {
                    borderWidth: 8
                }
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                fontSize: 28,
                offsetCenter: [0, '50%']
            },
            data: [{
                value: 50
            }]
        }]
    };

    if (optionPriority3 && typeof optionPriority3 === 'object') {
        myChartPriority3.setOption(optionPriority3);
    }

}
renderPriority();
// });