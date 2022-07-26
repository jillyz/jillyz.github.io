
function lineBar(target, category, amount, apprMoney, outMoney, parentBar, childrenI, childrenJ) {
    var domTarget = document.getElementById(target);
    var myChart = echarts.init(domTarget, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var colors = [ '#ff5ab8','#3b4aff', '#5dbeff',];
    // var colors = ['#3b4aff', '#5dbeff',];
    var myOptions = {
        color: colors,    
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體'
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 16
            },
            axisPointer: {
                // type: 'cross',
                // crossStyle: {
                //     color: '#999',
                //     backgroundColor: 'red'
                // }
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
                data: category,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    // color: 'rgba(255,255,255,1)',
                    textStyle:{
                        fontSize:16,
                        color: '#fff'
                    },
                    // 長label換行
                    formatter : function(params){
                        var newParamsName = "";// The final concatenated string
                        var paramsNameNumber = params.length;// Number of actual labels
                        var provideNumber = 4;// Number of words per line
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// If you change lines, you need to show a few lines and take them up.
                        /**
                         * Determine whether the number of tags is greater than the specified number, and if it is greater than the number of new lines, if it is not greater than, that is, equal to or less than, return to the original tag.
                         */
                        // The condition is equal to rowNumber > 1
                        if (paramsNameNumber > provideNumber) {
                            /** Loop each row, p represents the row */
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = "";// A string representing each intercept
                                var start = p * provideNumber;// Starting interception position
                                var end = start + provideNumber;// End Interception Position
                                // The index value of the last row is specially handled here
                                if (p == rowNumber - 1) {
                                    // No change of line for the last time
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // Each concatenation of strings and line breaks
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr;// The final string
                            }

                        } else {
                            // Assign the value of the old tag to the new tag
                            newParamsName = params;
                        }
                        //Returns the final string
                        return newParamsName
                     } 
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '經費 (千元)',
                position: 'right',
                alignTicks: true,
                axisLabel: {
                    formatter: '{value}',
                    // color: 'rgba(255,255,255,1)',
                    textStyle:{
                        fontSize:16,
                        color: '#fff',
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
                        backgroundColor: 'red'
                    },
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
                        fontSize:16
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
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
                data: amount
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
                data: apprMoney
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
                data: outMoney
            },        
        ]
    };

    function toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }

    window.addEventListener('resize', myChart.resize);

    if(myChart._dom.id == parentBar){
        var old = '';
        // Click事件
        myChart.on('click',  function(params) {
            // $('.js-chart-ij').fadeIn();
            // $('.js-chart-ij .title .org').text(params.name);
            // lineBar(childrenI[0], childrenI[1], childrenI[2], childrenI[3], childrenI[4]);                
            // lineBar(childrenJ[0], childrenJ[1], childrenJ[2], childrenJ[3], childrenJ[4]); 

            
            if(params.name != old){
                $('.js-chart-ij').fadeIn();
                old = params.name;

                $('.js-chart-ij .title .org').text(params.name);
                lineBar(childrenI[0], childrenI[1], childrenI[2], childrenI[3], childrenI[4]);                
                lineBar(childrenJ[0], childrenJ[1], childrenJ[2], childrenJ[3], childrenJ[4]);                
            }else{
                $('.js-chart-ij').fadeToggle();
            }               
        });
    }    
}




