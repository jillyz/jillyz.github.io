requirejs([
    'common',
    'echart/echart-top5-wra-unit',
    'echart/echart-top5-aa-unit',
    'echart/echart-top5-wra-person-organizer',
    'echart/echart-top5-wra-person-supervisor',
    'echart/echart-top5-aa-person',
], function() {
    setTableColumnToggle('#chkMore');
    setTableColumnToggle('#chkLate');
    setLargeTableView('#chkFullTable');
});