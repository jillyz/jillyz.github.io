requirejs([
    'common',
    // 'echart-outsourcing',
    // 'echart-funds',
    // 'echart-organizer-mine',
    // 'echart-priority',
    'echart/echart-budget-over',
    'echart/echart-budget-under',
    'echart/echart-stage',
    'echart/echart-company',
    'echart/echart-hosting',
    'echart/echart-committee',
    // 'mychart-bar',
], function() {

    // 個人主督辦數據
    var valueStageTotal = [0, 0, 0, 3, 0, 26, 1, 0, 3];
    var valueStageLate = [0, 0, 0, 1, 0, 7, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);
});