requirejs([
    'common',
    'echart/echart-outsourcing',
    'echart/echart-funds',
    'echart/echart-organizer',
    'echart/echart-stage',
    'echart/echart-priority',
    'echart/echart-company',
    'echart/echart-hosting',
    'echart/echart-committee',
    'echart/echart-funds-1',
    'echart/echart-funds-3-1',
    'echart/echart-funds-3-2',
    'echart/echart-funds-4',
    'echart/echart-funds-5',
], function() {



    // 主辦機關 ========================================================
    renderOrganizer("#chartOrganizer");

    // 執行階段 ========================================================
    var valueStageTotal = [0, 145, 42, 91, 1, 107, 0, 0, 0];
    var valueStageLate = [0, 26, 0, 49, 0, 37, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);


    // 主辦機關 + 執行階段 連動查詢 =======================================//start

    var domChartOrganizer = document.querySelector('#chartOrganizer');
    var myChartOrganizer = echarts.init(domChartOrganizer);

    // 滑鼠移上主辦機關 Pie圖，帶入數據到執行階段曲線圖
    myChartOrganizer.on('mouseover', function(params) {
        if (params.data.name == '水利署') {
            var total = [0, 45, 22, 45, 0, 50, 0, 0, 0];
            var late = [0, 8, 0, 22, 0, 8, 0, 0, 0];
            renderStage(total, late, ' (水利署)');
            updateTableData(total, late);
        }
        if (params.data.name == '所屬機關') {
            var total = [0, 100, 62, 75, 1, 60, 0, 0, 0];
            var late = [0, 18, 0, 27, 0, 26, 0, 0, 0];
            renderStage(total, late, ' (所屬機關)');
            updateTableData(total, late);
        }
    });
    // 滑鼠移出圖表後 恢復執行階段預設數據
    myChartOrganizer.on('globalout', function(params) {
        renderStage(valueStageTotal, valueStageLate, '');
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

    // 主辦機關 + 執行階段 連動查詢 =======================================//end

    renderChartFunds1();
    renderChartFunds31();
    renderChartFunds4();
    renderChartFunds51();

});