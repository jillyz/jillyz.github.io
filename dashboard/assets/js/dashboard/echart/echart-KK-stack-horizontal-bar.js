function stackBar(target, category, budgetName, outMoneyName, balanceName, budget, outMoney, balance) {
    var domTarget = document.getElementById(target); 
    var myChart = echarts.init(domTarget);
    // var colors = ['#9c88ff','#5dbeff', '#b3f24e' ];
    var colors = ['#9c88ff','#5dbeff', '#3a3d4d' ];
    var myOptions = {
        color: colors,
        textStyle: {
            fontSize: 16,
            fontFamily: '微軟正黑體',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            },  
            valueFormatter: function (value) {
                return toCurrency(value) + ' 千元';
            },
        },
        legend: {
            // show: false,
            textStyle: {
                color: 'rgba(255,255,255,1)'
            },
            formatter: function (name) {
                if(name == '剩餘經費'){
                    return '';
                } else{
                    return name
                }
            },
        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [{
            type: 'value',
            maxInterval: 50000,
            show: false,
        }],

        axisLabel: {
            formatter: '{value} (千元)',
            color: 'rgba(255,255,255,1)',
            
        },
        textStyle: {
            fontSize: 16,
        },
        yAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel:{
                textStyle:{
                    fontSize: 16
                },
                
                
                // 長label換行
                formatter : function(params){
                    var newParamsName = "";// The final concatenated string
                    var paramsNameNumber = params.length;// Number of actual labels
                    var provideNumber = 15;// Number of words per line
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
            },
            inverse: true,
            data: category,
        }],
        series: [
            {
                cursor: 'default',
                name: budgetName,
                type: 'bar',
                barWidth: 15,
                label: {
                    // show: true,
                    position: 'inside'
                },
                emphasis: {
                    focus: 'series'
                },
                data: budget
            },
            {
                cursor: 'default',
                name: outMoneyName,
                type: 'bar',
                barWidth: 15,
                stack: 'Total',
                label: {
                    // show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: outMoney
            },
            {
                
                cursor: 'default',
                name: balanceName,
                type: 'bar',
                barWidth: 15,
                stack: 'Total',
                label: {
                    // show: true,
                    position: 'left '
                },
                emphasis: {
                    focus: 'series'
                },
                data: balance
            }
        ]
    };

    window.addEventListener('resize', myChart.resize);
    function toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
    if (myOptions && typeof myOptions === 'object') {
        myChart.setOption(myOptions);
    }
}