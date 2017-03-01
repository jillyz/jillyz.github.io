var view = {
		selectMax: 8,
    init: function() {
    	view.bindEvent();
    },
    bindEvent: function() {
        $('.selecNumbers').on('click', 'button', function() {
						$('.selecNumbers').removeClass('small');

        		var total = $('.selecNumbers button[data-select="true"]').length;
        		var status = $(this).attr('data-select') == 'false';
        		if(total <= view.selectMax) 
        		{
	        		$(this).attr('data-select', status);
        		}

        		view.checkTotal( total , $(this));
        		view.showSelectedNums();
        		
        });
        // $('.selecNumbers').on('click', 'button', function() {

        // 		var total = $('.selecNumbers button[data-select="true"]').length;
 
        		
        		
        // });
        $('.selecNumbers button').dblclick(function() {
						var status = $(this).attr('data-lock') == 'false';
        		$(this).attr('data-lock', status);
        		alert();
        });

        $('.starType').on('click', 'button[data-random]', function() {
        		var rdmN = $(this).attr('data-random');
        		var rdmNums = view.randomNotRepeatingBetween(1,80, rdmN);
        		
        		$('.selecNumbers button').attr('data-select', false);
        		for(var i=0; i<rdmNums.length; i++){
        			$('.selecNumbers button[data-val="' + rdmNums[i] + '"]').trigger('click');
        		}
        });

        $('.starType').on('click', '.selectCustom-js', function() {
        		$('.selecNumbers button').attr('data-select', false);
        		$('.selecNumbers').removeClass('small');
        		view.clearSelectedNums();
        });

        $('.betSlip').on('focus', 'input', function() {
        		$('.selecNumbers').addClass('small');
        });
        $('.betSlip').on('focus', 'blur', function() {
        		$('.selecNumbers').removeClass('small');
        });
    },
    checkTotal: function (total, $this) {
    	if(total > view.selectMax) 
  		{
    		$this.attr('data-select', false);
    		alert('已選 8 個號碼');
  		}
    },
    randomNotRepeatingBetween: function (min,max,n){
		  var arr=[];
		  var arrResult=[];
		  for(i=0;i<max-min+1;i++){
		    arr[i]=i+min;
		  }
		  for(var j,x,i=arr.length;i;j=parseInt(Math.random()*i),x=arr[--i],arr[i]=arr[j],arr[j]=x);
		  for(i=0;i<n;i++){
		    arrResult[i]=arr[i];
		  }
		  return arrResult;
		},
		showSelectedNums: function () {
			var $selectedNum = $('.selecNumbers button[data-select="true"]');
			var arr = [];
			var html = '';

			$selectedNum.each(function () {
				var val = $(this).attr('data-val');
				// arr.push(val);
				html += '<span class="item">' + val + '</span>';
			});

			// arr.forEach(function(item) {
			// 	html += '<span class="item">' + item + '</span>';
			// })

			$('#showSelectNums').html(html);

			var total = $('#showSelectNums .item').length;

		},
		clearSelectedNums: function () {
			$('#showSelectNums').html('');
		},

}

$(document).ready(function() {
    view.init();
})