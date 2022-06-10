// define(function() {
//----水利署主辦人員 Top5
function renderTop5WraPersonOrganizer(label, value) {

    var domTop5WraPersonOrganizer = document.getElementById("chartTop5WraPersonOrganizer");
    var myChartTop5WraPersonOrganizer = echarts.init(domTop5WraPersonOrganizer);

    function longestString(arr) {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length > long1) {
                long1 = arr[i].length;
            }
        }
        return long1;
    }

    var optionTop5WraPersonOrganizer;
    optionTop5WraPersonOrganizer = {
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

    if (optionTop5WraPersonOrganizer && typeof optionTop5WraPersonOrganizer === 'object') {
        myChartTop5WraPersonOrganizer.setOption(optionTop5WraPersonOrganizer);
    }
    window.onresize = function() {
        myChartTop5WraPersonOrganizer.resize();
    };
}

var labelTop5WraPersonOrganizer = ['保育事業組/高華璟', '水文技術組/蔡孟蓉', '水文技術組/李嘉文', '水利防災中心/陳惠玲', '綜合企劃組/徐浩仁'];
var valueTop5WraPersonOrganizer = [12, 10, 9, 9, 9];
renderTop5WraPersonOrganizer(labelTop5WraPersonOrganizer, valueTop5WraPersonOrganizer);
// });