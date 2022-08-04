console.log('target');
requirejs([
    'common',
    'echart/echart-KK-stack-horizontal-bar',
    'echart/echart-KK-line-bar-B',
    ], function() {
        var target = 'lineBarB';
        var category = ['本署', '一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局', '水規所', '北水局', '中水局', '南水局', '水特局'];
        var amount = [2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2];
        var apprMoney = [8967, 5567,8624, 8967, 5567,8624, 8967, 5567,8624, 8967, 5567, 8967, 5567,8624, 8967, 5567 ];
        lineBar(target, category, amount, apprMoney); 

        // K 經費執行
        var targetK = 'funds1';
        var categoryK = ['公務預算 / 水資源企劃及保育 / 水資源保育及管理 / 水利事業保育與管理 (千元)', '前瞻基礎建設計畫第3期特別預算 / 水環境建設 / 水與安全 / 縣市管河川及區域排水整體改善計畫 (千元)'];
        var budgetNameK = '可辦理委辦計畫之經費';
        var outMoneyNameK = '已核定或契約經費';
        var balanceNameK = '';
        var budgetK = [1489870, 613588, 305314, 253379];
        var outMoneyK = [1164348, 667921, 152757, 181205];
        var balanceK = '';
        stackBar(targetK, categoryK, budgetNameK, outMoneyNameK, balanceNameK, budgetK, outMoneyK, balanceK);

        
    });
