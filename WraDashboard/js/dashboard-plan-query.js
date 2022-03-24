requirejs([
    'common',
    // 'echart-plan-kind-count',
    // 'echart-plan-kind-funds',
    // 'echart-plan-eng-count',
    // 'echart-plan-eng-funds',
    'echart/echart-template-pie',
    'echart/echart-stage',
], function() {
    // setTableColumnToggle('#chkMore');
    // setTableColumnToggle('#chkLate');
    // setLargeTableView('#chkFullTable');


    // 執行階段
    var valueStageTotal = [0, 145, 42, 91, 1, 107, 0, 0, 0];
    var valueStageLate = [0, 26, 0, 49, 0, 37, 0, 0, 0];
    renderStage(valueStageTotal, valueStageLate);


    // 計畫期程-件數
    var dataPlanDurationCount = {
        dom: '#chartPlanDurationCount',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#5470C6', '#91CC75', '#FAC858'],
            data: [
                { value: 128, name: '單一年度計畫' },
                { value: 114, name: '延續性計畫' },
                { value: 202, name: '跨年度計畫' },
            ],
        }],

    }
    renderChartTemplatePieCircle(dataPlanDurationCount);

    // 計畫期程-經費
    var dataPlanDurationFunds = {
        dom: '#chartPlanDurationFunds',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#5470C6', '#91CC75', '#FAC858'],
            data: [
                { value: 939900000, name: '單一年度計畫' },
                { value: 1029890000, name: '延續性計畫' },
                { value: 774900000, name: '跨年度計畫' },
            ],
        }],
    }
    renderChartTemplatePieCircle(dataPlanDurationFunds);

    // 計畫類別-件數
    var dataPrimaryClassCount = {
        dom: '#chartPrimaryClassCount',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#5470C6', '#91CC75', '#FAC858'],
            data: [
                { value: 128, name: '代辦業務' },
                { value: 114, name: '科技發展' },
                { value: 202, name: '輔助行政' },
            ],
        }],

    }
    renderChartTemplatePieCircle(dataPrimaryClassCount);

    // 計畫類別-經費
    var dataPrimaryClassFunds = {
        dom: '#chartPrimaryClassFunds',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#5470C6', '#91CC75', '#FAC858'],
            data: [
                { value: 939900000, name: '代辦業務' },
                { value: 1029890000, name: '科技發展' },
                { value: 774900000, name: '輔助行政' },
            ],
        }],
    }
    renderChartTemplatePieCircle(dataPrimaryClassFunds);


    // 契約形式-件數
    var chartContractCount = {
        dom: '#chartContractCount',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#5470C6', '#91CC75', '#FAC858'],
            data: [
                { value: 128, name: '一般契約' },
                { value: 114, name: '無需訂約' },
                { value: 202, name: '開口契約' },
            ],
        }],

    }
    renderChartTemplatePieCircle(chartContractCount);

    // 契約形式-經費
    var dataContractFunds = {
        dom: '#chartContractFunds',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#5470C6', '#91CC75', '#FAC858'],
            data: [
                { value: 939900000, name: '一般契約' },
                { value: 1029890000, name: '無需訂約' },
                { value: 774900000, name: '開口契約' },
            ],
        }],
    }
    renderChartTemplatePieCircle(dataContractFunds);

    // 八大類計畫-件數
    var dataPlanDurationCount = {
        dom: '#chartPlanEngCount',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#5ECDE1', '#E9ECF7'],
            data: [
                { value: 328, name: '八大類計畫' },
                { value: 121, name: '非八大類' },
            ],
        }],

    }
    renderChartTemplatePieCircle(dataPlanDurationCount);

    // 八大類計畫-經費
    var dataPlanDurationFunds = {
        dom: '#chartPlanEngFunds',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#5ECDE1', '#E9ECF7'],
            data: [
                { value: 85673000, name: '八大類計畫' },
                { value: 34890000, name: '非八大類' },
            ],
        }],
    }
    renderChartTemplatePieCircle(dataPlanDurationFunds);
});