requirejs([
    'common',
    'echart-outsourcing',
    'echart-funds',
    'echart-organizer-mine',
    'echart-priority',
    'echart-stage',
    'echart-company',
    'echart-hosting',
    'echart-committee',
    // 'mychart-bar',
], function() {
    // 模擬個人主督辦數據
    valueStageTotal = [0, 0, 0, 3, 0, 26, 1, 0, 3];
    valueStageLate = [0, 0, 0, 1, 0, 7, 0, 0, 0];
    renderStage(labelStage, valueStageTotal, valueStageLate);
});