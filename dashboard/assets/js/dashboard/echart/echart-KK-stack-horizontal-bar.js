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