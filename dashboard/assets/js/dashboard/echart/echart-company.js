// define(function() {
//----廠商Top5------
function renderCompany(label, value) {

    var domCompany = document.getElementById("chartCompany");
    var myChartCompany = echarts.init(domCompany);

    var optionCompany;
    optionCompany = {
        // backgroundColor: '#FFFFFF',
        title: {
            text: '得標最多廠商',
            textStyle: {
                fontSize: 13,
                color: '#fff',
            },
            show: false,
            left: '-5',
        },
        // color: '#47bba8',
        // color: '#37ffdf',
        // color: '#5dbeff',
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#fbb03b'
            },
            {
                offset: 1,
                color: '#ed1e79'
            }
        ]),
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
            top: 30,
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
            axisLabel: {
                // color: '#fff',
                color: 'rgba(255,255,255, .5)',
            }
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
            cursor: 'default',
            // data: [20, 15, 12, 8, 7],
            data: value,
            type: 'bar',

            barWidth: 10,
            label: {
                show: true,
                position: 'right',
                color: '#fff',
            },
        }]
    };

    if (optionCompany && typeof optionCompany === 'object') {
        myChartCompany.setOption(optionCompany);
    }

    window.onresize = function() {
        myChartCompany.resize();
    };
}
var labelCompany = ['黎明工程顧問股份有限公司', '中興工程顧問股份有限公司', '逢甲大學',];
var valueCompany = [20, 15, 12];
renderCompany(labelCompany, valueCompany);
// });