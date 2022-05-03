requirejs([
    'common',
    'echart/echart-outsourcing',
    'echart/echart-funds',
    // 'echart/echart-organizer-mine',
    // 'echart/echart-priority',
    // 'echart/echart-budget-over',
    // 'echart/echart-budget-under',
    'echart/echart-stage',
    'echart/echart-company',
    'echart/echart-hosting',
    'echart/echart-committee',
    'echart/echart-funds-1-4',
    'echart/echart-funds-3-4',
    'echart/echart-funds-4',
    'echart/echart-funds-5-4',
    // 'mychart-bar',
], function() {

    // 個人主督辦數據
    var valueStageTotal = [0, 0, 0, 3, 0, 26, 1, 0, 3];
    var valueStageLate = [0, 0, 0, 1, 0, 7, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);

    renderChartFunds1();
    renderChartFunds34();
});