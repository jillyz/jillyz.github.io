// define(function() {
//----計劃執行階段-------
function renderStage(valueTotal, valueLate, noteTitle) {

    var domChartStage = document.getElementById("chartStage");
    var myChartStage = echarts.init(domChartStage);

    var optionStage;
    optionStage = {
        backgroundColor: '#FFFFFF',
        title: {
            text: noteTitle ? '執行階段' + noteTitle : '執行階段',
            textStyle: {
                fontSize: 16
            }
        },
        color: ['#5470C6', '#FF6961'],
        backgroundColor: '#fff',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            textStyle: {
                fontSize: 12
            },
        },
        legend: {
            data: ['總件數', '進度落後'],
            right: '5%',
            top: '10%',
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
            left: '4%',
            right: '6%',
            top: '30%',
            bottom: '10px',
            containLabel: true,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['計畫申請', '計畫核可', '採購提報', '契約簽訂', '契約變更', '進度填報', '已結案', '成果上傳', '成果歸檔']
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                show: true,
                color: "#bbb",
                fontSize: 9
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
                    opacity: 0.6,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: valueTotal
            },
            {
                name: '進度落後',
                type: 'line',
                // stack: 'x',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 0, 97)'
                        },
                        {
                            offset: 1,
                            color: '#FF6961'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series',
                },
                data: valueLate
            },

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