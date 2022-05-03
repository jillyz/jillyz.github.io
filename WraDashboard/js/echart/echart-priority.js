// define(function() {
//----優先序------

renderPriority('#chartPriority1', 91);
renderPriority('#chartPriority2', 91);
renderPriority('#chartPriority3', 96);

function renderPriority(dom, data) {
    var domPriority = document.querySelector(dom);

    if (domPriority) {
        var myChartPriority = echarts.init(domPriority);
        var optionPriority;
        optionPriority = {
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
                    offsetCenter: [0, '70%']
                },
                data: [{
                    value: data
                }]
            }]
        };

        if (optionPriority && typeof optionPriority === 'object') {
            myChartPriority.setOption(optionPriority);
        }

        // myChartPriority.getZr().on('click', function(params) {
        //     window.open('dashboard_plan_query.html?priority=1').focus();
        // });

        window.onresize = function() {
            myChartPriority.resize();
        };
    }
}


// });