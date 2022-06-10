// define(function() {
//----主督辦 主辦機關-------
function renderMyOrganizer(label, valueTotal, valueLate) {

    var domChartMyOrganizer = document.getElementById("chartMyOrganizer");
    var myChartMyOrganizer = echarts.init(domChartMyOrganizer);

    var optionMyOrganizer;
    optionMyOrganizer = {
        backgroundColor: '#FFFFFF',
        // title: {
        //     text: '主督辦件數',
        //     textStyle: {
        //         fontSize: 16
        //     }
        // },
        color: ['#5470C6', '#FF6961'],
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
            top: 10,
            bottom: 40,
            left: 80,
            right: 40,
        },
        legend: {
            bottom: 0,
            right: 0,
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
                name: '總件數',
                type: 'bar',
                data: valueTotal,
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    color: '#5470C6',
                },
            },
            {
                name: '進度落後',
                type: 'bar',
                data: valueLate,
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    color: '#FF6961',
                },
            },
        ]
    };
    if (optionMyOrganizer && typeof optionMyOrganizer === 'object') {
        myChartMyOrganizer.setOption(optionMyOrganizer);
    }

    window.onresize = function() {
        myChartMyOrganizer.resize();
    };


    //----連動查詢-------
    myChartMyOrganizer.on('mouseover', function(params) {
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
        // renderStage(labelStage, valueStageTotal, valueStageLate, '');
        // updateTableData(valueStageTotal, valueStageLate);
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
var labelMyOrganizer = ['個人主辦', '個人督辦', '控管單位執行'];
var valueMyOrganizerTotal = [1, 1, 33];
var valueMyOrganizerLate = [1, 0, 8];
renderMyOrganizer(labelMyOrganizer, valueMyOrganizerTotal, valueMyOrganizerLate);
// });