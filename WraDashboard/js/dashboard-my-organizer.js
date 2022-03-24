requirejs([
    'common',
    'echart/echart-outsourcing',
    'echart/echart-funds',
    // 'echart/echart-organizer-mine',
    'echart/echart-priority',
    'echart/echart-stage',
    'echart/echart-company',
    'echart/echart-hosting',
    'echart/echart-committee',
], function() {

    // 個人主督辦數據
    var valueStageTotal = [0, 0, 0, 3, 0, 26, 1, 0, 3];
    var valueStageLate = [0, 0, 0, 1, 0, 7, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);
});