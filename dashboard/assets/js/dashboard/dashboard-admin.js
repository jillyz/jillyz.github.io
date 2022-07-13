requirejs([
    'common',
    'echart/echart-KK-gauge',
    'echart/echart-KK-stack-horizontal-bar',
    'echart/echart-KK-pie',
    'echart/echart-KK-line-bar',
    'echart/echart-KK-horizontal-bar',
], function() {

    // C-1 總件數
    var targetC1  = 'chartOutsourcing';
    var colorsC1 = ['#5dbeff', '#FF5CEA'];
    var dataC1  = [
        { value: 250, name: '已發包' },
        { value: 136, name: '未發包' },
    ]
    pie(targetC1, colorsC1, dataC1);
    
    // E 發包情形
    gauge('chartFunds-1', 76, '#FF5CEA');
    gauge('chartFunds-2', 90, '#FF835C');
    gauge('chartFunds-3', 53, '#37ffdf');
    gauge('chartFunds-4', 63, '#5dbeff');

    // C-2 總經費
    var targetC2  = 'chartOutsourcing-2';
    var colorsC2 = ['#5dbeff', '#fff61c', '#ff4aa6'];
    var dataC2  = [
        { value: 202000, name: '已發包經費' },
        { value: 5000, name: '發包結餘款' },
        { value: 92000, name: '未發包經費' },
    ]
    pie(targetC2, colorsC2, dataC2);

    // K 經費執行
    var targetK = 'funds1';
    var categoryK = ['公務預算', '水資源作業基金', '代辦經費', '前瞻基礎建設計畫第3期特別預算'];
    var budgetK = [1489870, 613588, 305314, 253379];
    var outMoneyK = [1164348, 667921, 152757, 181205];
    var balanceK = [325520, -54333, 152557, 72172];
    stackBar(targetK, categoryK, budgetK, outMoneyK, balanceK);
    
    // H 件數及經費
    var targetH = 'parentBar';
    var categoryH = ['本署', '一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局'];
    var amountH = [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2];
    var apprMoneyH = [8967, 5567,8624, 8967, 5567,8624, 8967, 5567,8624, 8967, 5567 ];
    var outMoneyH = [6789, 4532, 7790, 6789, 4532, 7790, 6789, 4532, 7790, 6789, 4532];

    // I 近五年委辦計畫趨勢圖
    var targetI = 'childBarI';
    var categoryI = [107, 108, 109, 110, 111];
    var amountI = [11, 1, 1, 18, 11, 18, 6, 5, 3, 18, 4, 14];
    var apprMoneyI = [47210, 950, 14950, 123355, 44861, 100568, 49000, 23526, 11875, 59042, 15932, 65244];
    var outMoneyI = [45500, 947, 0, 109950, 25855, 97770, 38094, 11211, 11875, 54176, 15654, 58770];
    
    // J 近五年委辦計畫趨勢圖
    var targetJ = 'childBarJ';
    var categoryJ = ['一般行政', '水利行政業務', '水資源企劃及保育', '水資源科技發展', '水資源開發及維護', '河川海岸及排水環境營造', '其他',];
    var amountJ = [11, 1, 1, 18, 11, 18, 6, 5, 3, 18, 4, 14];
    var apprMoneyJ = [47210, 950, 14950, 123355, 44861, 100568, 49000, 23526, 11875, 59042, 15932, 65244];
    var outMoneyJ = [45500, 947, 0, 109950, 25855, 97770, 38094, 11211, 11875, 54176, 15654, 58770];

    var childrenI = [targetI, categoryI, amountI, apprMoneyI, outMoneyI]
    var childrenJ = [targetJ, categoryJ, amountJ, apprMoneyJ, outMoneyJ]
    lineBar(targetH, categoryH, amountH, apprMoneyH, outMoneyH, targetH, childrenI, childrenJ);

    // F 得標廠商資訊
    var targetF = 'chartCompany';
    var titleF = '得標最多廠商';
    var categoryF = ['黎明工程顧問股份有限公司', '中興工程顧問股份有限公司', '逢甲大學',];
    var dataF = [20, 15, 12];
    horizontalBar( targetF, titleF, categoryF, dataF);

    // G 外聘評選委員
    var targetG = 'chartCommittee';
    var titleG = '鄰聘次數最多委員';
    var categoryF = ['李安安', '陳欣欣', '張明明', ];
    var dataG = [10, 8, 7];
    horizontalBar(targetG, titleG, categoryF, dataG);
});
