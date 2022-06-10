// define(function() {
//----主督辦 主辦機關-------
function renderOrganizer(dom) {

    var domChartOrganizer = document.querySelector(dom);

    if (dom !== null) {

        var myChartOrganizer = echarts.init(domChartOrganizer);

        var optionOrganizer;
        optionOrganizer = {
            // backgroundColor: '#FFFFFF',
            title: {
                text: '主辦機關',
                textStyle: {
                    fontSize: '15',
                    color: 'rgba(255,255,255,.5)',
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                // formatter: '{a} <br/>{b} : <b>{c}</b> ({d}%)',
                formatter: '{b}<br/><b>{c}</b> ({d}%)',
                textStyle: {
                    fontSize: 12
                },
            },
            legend: {
                bottom: '0',
                left: 'center',
                show: false
            },
            color: [
                '#37ffdf',
                '#536aff',
            ],
            series: [{
                center: ['50%', '60%'],
                name: '主辦件數',
                type: 'pie',
                radius: ['40%', '65%'],
                avoidLabelOverlap: false,
                // selectedMode: true,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        position: 'outer',
                        alignTo: 'labelLine',
                        bleedMargin: 5
                      },
                    itemStyle: {
                        shadowBlur: 5,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        opacity: 1,
                    },
                    focus: 'self',
                },
                // select: {
                //     label: {
                //         show: true,
                //     },
                //     itemStyle: {
                //         borderColor: 'rgba(255,255,255,.8)',
                //         borderWidth: 2,
                //         shadowBlur: 5,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)',
                //         opacity: 1,
                //     },
                //     focus: 'self',
                // },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 109, name: '水利署' },
                    { value: 277, name: '所屬機關' },
                ]
            }]
        };
        if (optionOrganizer && typeof optionOrganizer === 'object') {
            myChartOrganizer.setOption(optionOrganizer);
        }

        // myChartOrganizer.on('click', function(params) {
        //     window.open('dashboard_plan_query.html?organizer=' + encodeURIComponent(params.name)).focus();
        // });

        window.onresize = function() {
            myChartOrganizer.resize();
        };

    }

}




// });