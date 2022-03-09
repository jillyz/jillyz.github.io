requirejs([
    'common',
    'echart-top5-wra-unit',
    'echart-top5-aa-unit',
    'echart-top5-wra-person-organizer',
    'echart-top5-wra-person-supervisor',
    'echart-top5-aa-person',
], function() {
    setTableColumnToggle('#chkMore');
    setTableColumnToggle('#chkLate');
    setLargeTableView('#chkFullTable');
});