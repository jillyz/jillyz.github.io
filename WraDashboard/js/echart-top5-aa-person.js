// define(function() {
//----水利署主辦人員 Top5
function renderTop5AaPerson(label, value) {

    var domTop5AaPerson = document.getElementById("chartTop5AaPerson");
    var myChartTop5AaPerson = echarts.init(domTop5AaPerson);

    function longestString(arr) {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length > long1) {
                long1 = arr[i].length;
            }
        }
        return long1;
    }

    var optionTop5AaPerson;
    optionTop5AaPerson = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '水利署主辦人員 Top 5',
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

    if (optionTop5AaPerson && typeof optionTop5AaPerson === 'object') {
        myChartTop5AaPerson.setOption(optionTop5AaPerson);
    }
    window.onresize = function() {
        myChartTop5AaPerson.resize();
    };
}
var labelTop5AaPerson = ['李恩彤/第九河川局', '何文賢/第八河川局', '賴正哲/中區水資源局', '廖雯雯/北區水資源局', '徐劭涵/中區水資源局'];
var valueTop5AaPerson = [12, 11, 10, 10, 9];
renderTop5AaPerson(labelTop5AaPerson, valueTop5AaPerson);
// });