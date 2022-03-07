window.addEventListener('resize', function() {
    "use strict";
    window.location.reload();
});

//----發包情形------
function renderChartOutsourcing() {
    var domChartOutsourcing = document.getElementById("chartOutsourcing");
    var myChartOutsourcing = echarts.init(domChartOutsourcing);

    var optionOutsourcing;
    optionOutsourcing = {

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
            bottom: '0',
            left: 'center'
        },
        color: [
            '#E04C9B',
            '#5CC1FF',
        ],
        series: [{
            center: ['40%', '37%'],
            name: '發包情形',
            type: 'pie',
            radius: ['0%', '60%'],
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
                { value: 49, name: '未發包' },
                { value: 400, name: '已發包' },

            ]
        }]
    };
    if (optionOutsourcing && typeof optionOutsourcing === 'object') {
        myChartOutsourcing.setOption(optionOutsourcing);
    }


}
renderChartOutsourcing();

//----經費-------
function renderChartFunds() {
    var domFunds = document.getElementById("chartFunds");
    var myChartFunds = echarts.init(domFunds);

    var optionFunds;

    const gaugeDataFunds = [{
        value: 77,
        name: '經費達成率',
        title: {
            offsetCenter: ['0%', '-30%'],
            fontSize: 12,
            color: '#9D9D9D'
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%'],
            fontSize: 28,
        }
    }, ];
    optionFunds = {

        backgroundColor: '#FFFFFF',
        color: '#5CC1FF',
        series: [{
            type: 'gauge',
            center: ['65%', '50%'],
            startAngle: 90,
            endAngle: -270,
            pointer: {
                show: false
            },
            progress: {
                show: true,
                overlap: false,
                roundCap: true,
                clip: false,
                itemStyle: {
                    borderWidth: 0,
                    borderColor: '#464646'
                }
            },
            axisLine: {
                lineStyle: {
                    width: 16
                }
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                distance: 50
            },
            data: gaugeDataFunds,
            title: {
                fontSize: 14
            },
            detail: {
                width: 50,
                height: 14,
                fontSize: 14,
                color: 'auto',
                borderColor: 'auto',
                // borderRadius: 20,
                // borderWidth: 1,
                formatter: '{value}%'
            }
        }]
    };

    if (optionFunds && typeof optionFunds === 'object') {
        myChartFunds.setOption(optionFunds);
    }

}
renderChartFunds();

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

//----主督辦 主辦機關-------

function renderOrganizer() {

    var domChartOrganizer = document.getElementById("chartOrganizer");
    var myChartOrganizer = echarts.init(domChartOrganizer);

    var optionOrganizer;
    optionOrganizer = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '主辦機關',
            textStyle: {
                fontSize: 16
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
            left: 'center'
        },
        color: [
            '#5470C6',
            '#6cb9ed',
        ],
        series: [{
            center: ['50%', '42%%'],
            name: '主辦件數',
            type: 'pie',
            radius: ['30%', '55%'],
            avoidLabelOverlap: false,
            // selectedMode: true,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    // show: true,
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
                { value: 340, name: '所屬機關' },
            ]
        }]
    };
    if (optionOrganizer && typeof optionOrganizer === 'object') {
        myChartOrganizer.setOption(optionOrganizer);
    }

    //----連動查詢-------
    myChartOrganizer.on('mouseover', function(params) {
        var temp = 0;
        if (params.data.name == '水利署') {
            var total = [0, 45, 22, 45, 0, 50, 0, 0, 0];
            var late = [0, 10, 0, 20, 0, 7, 0, 0, 0];
            renderStage(labelStage, total, late, ' (水利署)');
            updateTableData(total, late);
            temp = 1;
            console.log(temp, temp == 1, temp == 2)

        }
        if (params.data.name == '所屬機關') {
            var total = [0, 100, 62, 75, 1, 60, 0, 0, 0];
            var late = [0, 16, 0, 29, 0, 10, 0, 0, 0];
            renderStage(labelStage, total, late, ' (所屬機關)');
            updateTableData(total, late);
            temp = 2;
            console.log(temp, temp == 1, temp == 2)
        }


    });
    myChartOrganizer.on('globalout', function(params) {
        renderStage(labelStage, valueStageTotal, valueStageLate, '');
        updateTableData(valueStageTotal, valueStageLate);
    });

    function updateTableData(valTotal, valLate) {
        valTotal.forEach(function(item, i) {
            var dom = document.querySelectorAll('#dataSatageTotal td');
            dom[i].innerHTML = item;
        })
        valLate.forEach(function(item, i) {
            var dom = document.querySelectorAll('#dataSatageLate td');
            if (item > 0) {
                dom[i].innerHTML = '<span>' + item + '</span>';
            } else {
                dom[i].innerHTML = '';
            }
        })
    }

}
renderOrganizer();

//----主督辦 主辦機關-------

function renderMyOrganizer() {

    var domChartMyOrganizer = document.getElementById("chartMyOrganizer");
    var myChartMyOrganizer = echarts.init(domChartMyOrganizer);

    var optionMyOrganizer;
    optionMyOrganizer = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '主辦機關',
            textStyle: {
                fontSize: 16
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
            left: 'center'
        },
        color: [
            '#5470C6',
            '#6cb9ed',
        ],
        series: [{
            center: ['50%', '42%%'],
            name: '主辦件數',
            type: 'pie',
            radius: ['30%', '55%'],
            avoidLabelOverlap: false,
            // selectedMode: true,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    // show: true,
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
                { value: 340, name: '所屬機關' },
            ]
        }]
    };
    if (optionMyOrganizer && typeof optionMyOrganizer === 'object') {
        myChartMyOrganizer.setOption(optionMyOrganizer);
    }

    //----連動查詢-------
    myChartOrganizer.on('mouseover', function(params) {
        var temp = 0;
        if (params.data.name == '水利署') {
            var total = [0, 45, 22, 45, 0, 50, 0, 0, 0];
            var late = [0, 10, 0, 20, 0, 7, 0, 0, 0];
            renderStage(labelStage, total, late, ' (水利署)');
            updateTableData(total, late);
            temp = 1;
            console.log(temp, temp == 1, temp == 2)

        }
        if (params.data.name == '所屬機關') {
            var total = [0, 100, 62, 75, 1, 60, 0, 0, 0];
            var late = [0, 16, 0, 29, 0, 10, 0, 0, 0];
            renderStage(labelStage, total, late, ' (所屬機關)');
            updateTableData(total, late);
            temp = 2;
            console.log(temp, temp == 1, temp == 2)
        }


    });
    myChartMyOrganizer.on('globalout', function(params) {
        renderStage(labelStage, valueStageTotal, valueStageLate, '');
        updateTableData(valueStageTotal, valueStageLate);
    });

    function updateTableData(valTotal, valLate) {
        valTotal.forEach(function(item, i) {
            var dom = document.querySelectorAll('#dataSatageTotal td');
            dom[i].innerHTML = item;
        })
        valLate.forEach(function(item, i) {
            var dom = document.querySelectorAll('#dataSatageLate td');
            if (item > 0) {
                dom[i].innerHTML = '<span>' + item + '</span>';
            } else {
                dom[i].innerHTML = '';
            }
        })
    }

}
renderMyOrganizer();


//----計劃執行階段-------

function renderStage(label, valueTotal, valueLate, title) {

    var domChartStage = document.getElementById("chartStage");
    var myChartStage = echarts.init(domChartStage);

    var optionStage;
    optionStage = {
        backgroundColor: '#FFFFFF',
        title: {
            text: title ? '執行階段' + title : '執行階段',
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
            left: '3%',
            right: '6%',
            top: '30%',
            bottom: '10px',
            containLabel: true,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: label
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

}
var labelStage = ['計畫申請', '計畫核可', '採購提報', '契約簽訂', '契約變更', '進度填報', '已結案', '成果上傳', '成果歸檔'];
var valueStageTotal = [0, 145, 42, 91, 1, 107, 0, 0, 0];
var valueStageLate = [0, 26, 0, 49, 0, 37, 0, 0, 0];
renderStage(labelStage, valueStageTotal, valueStageLate);

//----廠商Top5------

function renderCompany(label, value) {

    var domCompany = document.getElementById("chartCompany");
    var myChartCompany = echarts.init(domCompany);

    function longestString(arr) {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length > long1) {
                long1 = arr[i].length;
            }

        }
        return long1;
    }

    var optionCompany;
    optionCompany = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '得標廠商件數 Top 5',
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
            // formatter: '{b}<br/>得標件數: <b>{c}</b>',
            textStyle: {
                fontSize: 12
            },
        },
        grid: {
            top: 40,
            bottom: 20,
            // left: 170,
            left: long_string(label).length * 13,
            right: 40,
        },
        yAxis: {
            type: 'category',
            // data: ['黎明工程顧問股份有限公司', 'ＯＯ工程顧問股份有限公司', '逢甲大學', '天思數位科技股粉有限公司', '詮華國土測繪有限公司'],
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
            // data: [20, 15, 12, 8, 7],
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

    if (optionCompany && typeof optionCompany === 'object') {
        myChartCompany.setOption(optionCompany);
    }
}
var labelCompany = ['黎明工程顧問股份有限公司', 'ＯＯ工程顧問股份有限公司', '逢甲大學', '天思數位科技股粉有限公司', '詮華國土測繪有限公司'];
var valueCompany = [20, 15, 12, 8, 7];
renderCompany(labelCompany, valueCompany);

//----計畫主持人件數 Top5

function renderCompanyHosting() {
    var domCompanyHosting = document.getElementById("chartCompanyHosting");
    var myChartCompanyHosting = echarts.init(domCompanyHosting);

    var optionCompanyHosting;
    optionCompanyHosting = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '計畫主持人件數 Top 5',
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
            // formatter: '{b}<br/>計畫主持人件數: <b>{c}</b>',
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
            data: ['李ＯＯ', '陳ＯＯ', '張ＯＯ', '黃ＯＯ', '林ＯＯ'],
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

}
renderCompanyHosting();

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
}

var labelCommittee = ['李安安', '陳欣欣', '張明明', '黃大大', '林瑋瑋'];
var valueCommittee = [10, 8, 7, 6, 5];
renderCommittee(labelCommittee, valueCommittee);

//----只有一家廠商投標,有遴聘委員-------

function setBarWidth(domId) {
    var chartDom = document.getElementById(domId);
    chartDom.width = (chartDom.getAttribute('data-value') / chartDom.getAttribute('data-total')) * 100;
    chartDom.style.width = chartDom.width + '%';

    function roundNumber(val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }
    chartDom.title = (roundNumber(chartDom.width, 2)) + '%';
}
setBarWidth('chartOneCompany');
setBarWidth('chartHasCommittee');

//-------------- Common Function -------------------

//---陣列中最長字串--- for 圖表廠商Top5的廠商名寬度
function long_string(arr) {
    let longest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length > longest.length) {
            longest = arr[i];
        }
    }
    return longest;
}