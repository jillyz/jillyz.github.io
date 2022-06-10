// define(function() {
//----水利署主辦組室 Top5
function renderTop5WraUnit(label, value) {

    var domTop5WraUnit = document.getElementById("chartTop5WraUnit");
    var myChartTop5WraUnit = echarts.init(domTop5WraUnit);

    function longestString(arr) {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length > long1) {
                long1 = arr[i].length;
            }
        }
        return long1;
    }

    var optionTop5WraUnit;
    optionTop5WraUnit = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '水利署主辦組室 Top 5',
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

    if (optionTop5WraUnit && typeof optionTop5WraUnit === 'object') {
        myChartTop5WraUnit.setOption(optionTop5WraUnit);
    }
    window.onresize = function() {
        myChartTop5WraUnit.resize();
    };
}


var labelTop5WraUnit = ['保育事業組', '水利防災中心', '綜合企劃組', '水文技術組', '資訊室'];
var valueTop5WraUnit = [76, 61, 55, 54, 44];
renderTop5WraUnit(labelTop5WraUnit, valueTop5WraUnit);
// });