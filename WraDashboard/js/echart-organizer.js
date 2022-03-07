// define(function() {
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

    window.onresize = function() {
        myChartOrganizer.resize();
    };

    //----連動查詢-------
    myChartOrganizer.on('mouseover', function(params) {
        var temp = 0;
        if (params.data.name == '水利署') {
            var total = [0, 45, 22, 45, 0, 50, 0, 0, 0];
            var late = [0, 10, 0, 20, 0, 7, 0, 0, 0];
            renderStage(labelStage, total, late, ' (水利署)');
            updateTableData(total, late);
            temp = 1;
            // console.log(temp, temp == 1, temp == 2)

        }
        if (params.data.name == '所屬機關') {
            var total = [0, 100, 62, 75, 1, 60, 0, 0, 0];
            var late = [0, 16, 0, 29, 0, 10, 0, 0, 0];
            renderStage(labelStage, total, late, ' (所屬機關)');
            updateTableData(total, late);
            temp = 2;
            // console.log(temp, temp == 1, temp == 2)
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
// });