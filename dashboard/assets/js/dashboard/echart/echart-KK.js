// define(function() {
//----評選委員遴聘次數 Top5
function renderCommittee(label, value) {
    var dom = document.getElementById('container');

    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;
    
  // const colors = [ '#ff5ab8','#37ffdf', '#5dbeff',];
  const colors = [ '#ff5ab8','#3b4aff', '#5dbeff',];
  option = {
    color: colors,    
    textStyle: {
      fontSize: 14,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['件數','核定經費','發包經費' ],
      textStyle: {
          color: '#fff'
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['本署', '一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局'],
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          color: 'rgba(255,255,255,1)',
          textStyle:{
            fontSize:14
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '經費',
        position: 'right',
        alignTicks: true,
        axisLabel: {
          formatter: '{value} 千元',
          color: 'rgba(255,255,255,1)',
          textStyle:{
            fontSize:14
          }
        },
        axisLine: {
          lineStyle: {
            // color: 'rgba(255,255,255,1)'
          }
        },
      },
      {
        type: 'value',
        name: '件數',
        position: 'left',
        alignTicks: true,
        axisLabel: {
          color: 'rgba(255,255,255,1)',
          textStyle:{
            fontSize:14
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            // color: colors[0]
            // color: 'rgba(255,255,255,1)',
          }
        },
      },
    ],
    series: [
      {
        name: '件數',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 件';
          }
        },
        data: [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2]
      },
      {
        name: '核定經費',
        type: 'bar',
        barWidth: '20',
        tooltip: {
          valueFormatter: function (value) {
            return toCurrency(value) + ' 千元';
          }
        },
        data: [
          8967, 5567,8624, 8967, 5567,8624, 8967, 5567,8624, 8967, 5567 
        ]
      },
      {
        name: '發包經費',
        type: 'bar',
        barWidth: '20',
        tooltip: {
          valueFormatter: function (value) {
            return toCurrency(value) + ' 千元';
          }
        },
        data: [
          6789, 4532, 7790, 6789, 4532, 7790, 6789, 4532, 7790, 6789, 4532
        ]
      },
      
    ]
  };

  function toCurrency(num){
      var parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
  }
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);

  // Click事件
  myChart.on('click',  function(params) {
    // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
    // console.log(encodeURIComponent(params));
    console.log(params.name);

    $('.js-chart-ij').fadeIn();
    $('.js-chart-ij .title .org').text(params.name);
    // console.log(params.data);

    // renderChartFunds31();
    // renderChartFunds51();
    renderChartFunds4();
        renderChartFunds51();
  });
}
// var labelCommittee = ['李安安', '陳欣欣', '張明明', ];
// var valueCommittee = [10, 8, 7];
// renderCommittee(labelCommittee, valueCommittee);
renderCommittee();
// });