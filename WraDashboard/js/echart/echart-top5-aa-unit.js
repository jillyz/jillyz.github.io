// define(function() {
//----所屬機關單位 Top5
function renderTop5AaUnit(label, value) {

    var domTop5AaUnit = document.getElementById("chartTop5AaUnit");
    var myChartTop5AaUnit = echarts.init(domTop5AaUnit);

    function longestString(arr) {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length > long1) {
                long1 = arr[i].length;
            }
        }
        return long1;
    }

    var optionTop5AaUnit;
    optionTop5AaUnit = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '所屬機關單位 Top 5',
            top: 10,
            textStyle: {
                fontSize: 16
            }
        },
        color: '#5ECDE1',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            // formatter: '{b}<br/>得標件數: <b>{c}</b>',
            textStyle: {
                fontSize: 12
            },
        },
        grid: {
            top: 40,
            bottom: 20,
            // left: 170,
            left: long_string(label).length * 13,
            right: 40,
        },
        yAxis: {
            type: 'category',
            // data: ['黎明工程顧問股份有限公司', 'ＯＯ工程顧問股份有限公司', '逢甲大學', '天思數位科技股粉有限公司', '詮華國土測繪有限公司'],
            data: label,
            inverse: true,
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            }
        },
        series: [{
            // data: [20, 15, 12, 8, 7],
            data: value,
            type: 'bar',

            barWidth: 8,
            label: {
                show: true,
                position: 'right',
                color: '#5ECDE1',
            },
        }]
    };

    if (optionTop5AaUnit && typeof optionTop5AaUnit === 'object') {
        myChartTop5AaUnit.setOption(optionTop5AaUnit);
    }
    window.onresize = function() {
        myChartTop5AaUnit.resize();
    };
}

var labelTop5AaUnit = ['中區水資源局', '南區水資源局', '水利規劃試驗所', '第五河川局', '北區水資源局'];
var valueTop5AaUnit = [171, 169, 166, 97, 93];
renderTop5AaUnit(labelTop5AaUnit, valueTop5AaUnit);
// });