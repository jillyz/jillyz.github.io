// define(function() {
//----水利署督辦人員 Top5
function renderTop5WraPersonSupervisor(label, value) {

    var domTop5WraPersonSupervisor = document.getElementById("chartTop5WraPersonSupervisor");
    var myChartTop5WraPersonSupervisor = echarts.init(domTop5WraPersonSupervisor);

    function longestString(arr) {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length > long1) {
                long1 = arr[i].length;
            }
        }
        return long1;
    }

    var optionTop5WraPersonSupervisor;
    optionTop5WraPersonSupervisor = {
        backgroundColor: '#FFFFFF',
        title: {
            text: '水利署督辦人員 Top 5',
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

    if (optionTop5WraPersonSupervisor && typeof optionTop5WraPersonSupervisor === 'object') {
        myChartTop5WraPersonSupervisor.setOption(optionTop5WraPersonSupervisor);
    }
    window.onresize = function() {
        myChartTop5WraPersonSupervisor.resize();
    };
}

var labelTop5WraPersonSupervisor = ['水源經營組/李苗宏', '水利防災中心/林呈益', '水源經營組/鄭宇君', '保育事業組/林哲正', '水利防災中心/唐家祺'];
var valueTop5WraPersonSupervisor = [71, 61, 55, 46, 36];
renderTop5WraPersonSupervisor(labelTop5WraPersonSupervisor, valueTop5WraPersonSupervisor);
// });