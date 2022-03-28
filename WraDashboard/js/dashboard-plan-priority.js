requirejs([
    'common',
    'echart/echart-funds-1',
    'echart/echart-funds-2-1',
    'echart/echart-funds-2-2',
    'echart/echart-funds-3-1',
    'echart/echart-funds-3-2',
], function() {
    renderChartFunds1();
    renderChartFunds21();
    renderChartFunds31();
});