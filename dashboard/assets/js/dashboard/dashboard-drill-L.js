requirejs([
    'common',
    'echart/echart-template-pie',
], function() {
    // 計畫期程-件數
    var dataPlanDurationCount = {
        dom: '#chartOutsourcing',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: [ '#FFA9F4', '#FF5CEA', '#FF10E0'],
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
        dom: '#chartOutsourcing-2',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: [ '#FFA9F4', '#FF5CEA', '#FF10E0'],
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
        dom: '#chartOutsourcing-3',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#FFBDA9', '#FF835C', '#FF4910'],
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
        dom: '#chartOutsourcing-4',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#FFBDA9', '#FF835C', '#FF4910'],
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
        dom: '#chartOutsourcing-5',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#84FFEC', '#00EAC6', '#009E85'],
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
        dom: '#chartOutsourcing-6',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#84FFEC', '#00EAC6', '#009E85'],
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
        dom: '#chartOutsourcing-7',
        title: '件數',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{c}</b> ({d}%)',
        },
        series: [{
            color: ['#119FFF', '#AADDFF'],
            data: [
                { value: 328, name: '八大類計畫' },
                { value: 121, name: '非八大類' },
            ],
        }],

    }
    renderChartTemplatePieCircle(dataPlanDurationCount);

    // 八大類計畫-經費
    var dataPlanDurationFunds = {
        dom: '#chartOutsourcing-8',
        title: '經費',
        titleFontSize: '',
        tooltip: {
            formatter: '{b}<br/><b>{d}%</b>',
        },
        series: [{
            color: ['#119FFF', '#AADDFF'],
            data: [
                { value: 85673000, name: '八大類計畫' },
                { value: 34890000, name: '非八大類' },
            ],
        }],
    }
    renderChartTemplatePieCircle(dataPlanDurationFunds);
});
