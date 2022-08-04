// define(function() {
//----計劃執行階段-------
function renderStage(container, category, valueTotal) {

    var domChartStage = document.getElementById(container);
    var myChartStage = echarts.init(domChartStage);

    var optionStage;
    optionStage = {
        // backgroundColor: '#FFFFFF',
        title: {
            // text: noteTitle ? '執行階段' + noteTitle : '執行階段',
            textStyle: {
                fontSize: 16,
                // color: '#fff',
                color: 'rgba(255,255,255,.75)',
                fontWeight: 'normal'
            },
            show: false
        },
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體'
        },
        // color: ['#5470C6', '#FF6961'],
        color: ['#5470C6'],
        // backgroundColor: '#fff',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            textStyle: {
                fontSize: 16
            },
        },
        legend: {
            data: ['總件數', '進度落後'],
            right: '5%',
            top: '10%',
            show: false,
            textStyle: {
                color: 'white'
            },
        },
        toolbox: {
            feature: {
                // saveAsImage: {
                //   title: '存為圖片'
                // },
                // dataView: { show: true, readOnly: false },
            }
        },
        grid: {
            left: '35px',
            right: '65px',
            top: '30px',
            bottom: '10px',
            containLabel: true,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: category,
            // show: false
            axisLabel: {
                color: '#3a3d4d'
            }
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                show: true,
                color: 'white',
                fontSize: 14
            }
        }],
        series: [{
                name: '總件數',
                type: 'line',
                // stack: 'x',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: .97,
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: .15,
                            color: '#5DBEFF'
                        },
                        {
                            offset: .82,
                            color: '#37FFDF'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: valueTotal
            },
            // {
            //     name: '進度落後',
            //     type: 'line',
            //     // stack: 'x',
            //     smooth: true,
            //     lineStyle: {
            //         width: 0
            //     },
            //     showSymbol: false,
            //     areaStyle: {
            //         opacity: 0.8,
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //                 offset: 0,
            //                 color: 'rgb(255, 0, 97)'
            //             },
            //             {
            //                 offset: 1,
            //                 color: '#FF6961'
            //             }
            //         ])
            //     },
            //     emphasis: {
            //         focus: 'series',
            //     },
            //     data: valueLate
            // },

        ]
    };
    if (optionStage && typeof optionStage === 'object') {
        myChartStage.setOption(optionStage);
    }

    window.addEventListener('resize', function() {
        "use strict";
        myChartStage.resize();
    });


}


// });