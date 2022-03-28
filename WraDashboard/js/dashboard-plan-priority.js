requirejs([
    'common',
    // 'echart/echart-funds-1',
    // 'echart/echart-funds-2-1',
    // 'echart/echart-funds-2-2',
    // 'echart/echart-funds-3-1',
    // 'echart/echart-funds-3-2',
    'echart/echart-template-bar-priority',
], function() {
    // renderChartFunds1();
    // renderChartFunds21();
    // renderChartFunds22();
    // renderChartFunds31();


    var data_p1_wra = {
        title: '本署委辦計畫辦理情形 - 最優先計畫',
        total: 23,
        yAxis: ['保育事業組', '水利防災中心', '水文技術組', '土地管理組', '水利行政組', '資訊室', '水源經營組'],
        series: [{
            name: '計畫書未核可',
            data: [0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '計畫書已核可',
            data: [0, 0, 1, 0, 0, 0, 0]
        }, {
            name: '評選完成',
            data: [0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '簽約或議價完成',
            data: [1, 4, 6, 1, 3, 1, 6, 1]
        }]
    }
    var data_p1_aa = {
        title: '所屬機關委辦計畫辦理情形 - 最優先計畫',
        total: 27,
        yAxis: ['四河局', '五河局', '六河局', '北水局', '中水局', '南水局', '水源局'],
        series: [{
            name: '計畫書未核可',
            data: [0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '計畫書已核可',
            data: [0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '評選完成',
            data: [0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '簽約或議價完成',
            data: [1, 1, 2, 2, 11, 6, 4],
        }]
    }

    var data_p2_wra = {
        title: '本署委辦計畫辦理情形 - 優先計畫',
        total: 61,
        yAxis: ['保育事業組', '水利防災中心', '水文技術組', '河川勘測隊', '秘書室', '工程事務組', '水利行政組', '資訊室', '河川海岸組', '水源經營組', '綜合企劃組'],
        series: [{
            name: '計畫書未核可',
            data: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '計畫書已核可',
            data: [2, 1, 6, 0, 0, 1, 0, 0, 0, 0, 2],
        }, {
            name: '評選完成',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }, {
            name: '簽約或議價完成',
            data: [10, 9, 0, 1, 4, 0, 5, 7, 1, 3, 8],
        }]
    }

    var data_p2_aa = {
        title: '所屬機關委辦計畫辦理情形 - 優先計畫',
        total: 97,
        yAxis: ['一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局', '北水局', '中水局', '南水局', '水源局', '水規所'],
        series: [{
            name: '計畫書未核可',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        }, {
            name: '計畫書已核可',
            data: [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 10, 1, 3, 5, 2],
        }, {
            name: '評選完成',
            data: [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0],
        }, {
            name: '簽約或議價完成',
            data: [2, 2, 1, 3, 0, 3, 5, 5, 1, 4, 3, 14, 13, 3, 8],
        }]
    }

    var text_p1 = '最優先計畫應於110年12月31日前完成發包(決標)作業';
    var text_p2 = '優先計畫應於111年3月底前完成發包(決標)作業';

    function renderPriority() {
        var sel = document.getElementById('selectPriorityType');
        var note1 = document.getElementById('text_p');
        var table = {
                wra_p1: document.getElementById('tableWra_P1'),
                aa_p1: document.getElementById('tableAa_P1'),
                wra_p2: document.getElementById('tableWra_P2'),
                aa_p2: document.getElementById('tableAa_P2'),
            }
            // 本署
        if (sel.value == 1) {
            note1.innerText = text_p1;
            table.wra_p1.classList.remove('hide');
            table.aa_p1.classList.remove('hide');
            table.wra_p2.classList.add('hide');
            table.aa_p2.classList.add('hide');
            renderChartPriorityBar('wra', data_p1_wra);
            renderChartPriorityBar('aa', data_p1_aa);
        }
        // 所屬機關
        if (sel.value == 2) {
            note1.innerText = text_p2;
            table.wra_p1.classList.add('hide');
            table.aa_p1.classList.add('hide');
            table.wra_p2.classList.remove('hide');
            table.aa_p2.classList.remove('hide');
            renderChartPriorityBar('wra', data_p2_wra);
            renderChartPriorityBar('aa', data_p2_aa);
        }
    }

    renderPriority();

    document.getElementById('selectPriorityType').addEventListener('change', function() {
        renderPriority();
    })

});