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
    'echart/echart-funds-3-3',
    // 'echart/echart-funds-4',
    // 'echart/echart-funds-5',
], function() {



    // 個人主督辦數據
    var valueStageTotal = [0, 0, 0, 3, 0, 26, 1, 0, 3];
    var valueStageLate = [0, 0, 0, 1, 0, 7, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);

    // 執行階段 ========================================================
    var valueStageTotal = [0, 145, 42, 91, 1, 107, 0, 0, 0];
    var valueStageLate = [0, 26, 0, 49, 0, 37, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);

    renderChartFunds33();
});