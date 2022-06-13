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
    
  const colors = [ '#ff5ab8', '#5dbeff','#37ffdf',];
option = {
  color: colors,
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
    data: ['件數','發包經費', '核定經費', ],
    textStyle: {
        // color: '#fff'
        color: 'rgba(255,255,255,.75)'
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
      data: ['本屬', '一河局', '二河局', '三河局', '四河局', '五河局', '六河局', '七河局', '八河局', '九河局', '十河局'],
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        // color: '#fff',
        color: 'rgba(255,255,255,.75)'
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
        // color: '#fff',
        color: 'rgba(255,255,255,.75)'
      },
      axisLine: {
        lineStyle: {
          // color: '#fff'
          color: 'rgba(255,255,255,.75)'
        }
      },
    },
    {
      type: 'value',
      name: '件數',
      position: 'left',
      alignTicks: true,
      axisLabel: {
        color: 'rgba(255,255,255,.75)'
      },
      axisLine: {
        show: true,
        lineStyle: {
          // color: colors[0]
          color: 'rgba(255,255,255,.75)'
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
      name: '發包經費',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return toCurrency(value) + ' 千元';
        }
      },
      data: [
        6789, 4532, 7790, 6789, 4532, 7790, 6789, 4532, 7790, 6789, 4532
      ]
    },
    {
      name: '核定經費',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return toCurrency(value) + ' 千元';
        }
      },
      data: [
        8967, 5567,8624, 8967, 5567,8624, 8967, 5567,8624, 8967, 5567 
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
}
var labelCommittee = ['李安安', '陳欣欣', '張明明', ];
var valueCommittee = [10, 8, 7];
// renderCommittee(labelCommittee, valueCommittee);
renderCommittee();
// });