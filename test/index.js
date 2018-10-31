var gameList = [
  {'ct': 'Recently Played' , 'count': 4, 'id': 'recently'},
  {'ct': 'Top Pick' , 'count': 20, 'id': 'toppick'},
  {'ct': 'Slots' , 'count': 36, 'id': 'slots'},
  {'ct': 'Arcade' , 'count': 12, 'id':'arcade'},
  {'ct': 'Scratch Cards' , 'count': 12, 'id': 'scratchcard'},
  {'ct': 'Virtual Games' , 'count': 7, 'id': 'virtual'},
  {'ct': 'Hilo & Numbers' , 'count': 13, 'id':'numbers'},
  {'ct': 'Casino' , 'count': 7, 'id': 'casino'},
]

var html = '';
for ( var i = 0; i < gameList.length; i ++ ) {
  var count = gameList[i].count;
  html += '<div class="category-wrap" id="' + gameList[i].id  +'">';
    html += '<div class="category-name ' +  gameList[i].id +'" data-index="' + i + '" data-open="close">' + gameList[i].ct + '</div>';
    html += '<div class="game-wrap">';
    for ( var n = 0; n < count; n ++ ) {  
        html += '<div class="game-item">';
          html += '<div class="game-icon"></div>';
          html += '<div class="game-name">Toto Draw</div>';
        html += '</div>';
    }
    html += '</div>';
  html += '</div>';
}
$('#gameList').html(html);

// $('.category-item:first-child').addClass('active');

//----------------------------------

var winW = $(window).width(),
    winH = $(window).height(),
    rowCount = 0,
    bufferH = 15;


$(function(){
  reset();
});
$(window).resize(function(){
  reset();
})

function reset () {
  if ( winH >= winW ) { rowCount = 3 }
  if ( winH < winW ) { rowCount = 5 }
  iconH = $('.game-icon').height(),
    rowH = iconH * 1.4;
  //$('.game-wrap').height(rowH + bufferH);
}

$('.category-item').click(function(){
  var id = $(this).attr('data-target');
  $(this).addClass('active');
  $('.category-item').not($(this)).removeClass('active');
  // $('#' + target ).find('.category-name').trigger('click');
  toggleGameIcon(id, 'close');
});


function toggleGameIcon (id, isOpen) {
  var target = id;
  var eleCate = $('#' + target ).children('.category-name');
  var index = eleCate.attr('data-index');
  console.log(eleCate, id, isOpen, index, gameList[index])
  
  var row = parseInt(gameList[index].count / rowCount);
  if( gameList[index].count % rowCount > 0 ) {
    row = row + 1;
  } 
  if(isOpen == 'close') {
    $('.category-name').not(eleCate).attr('data-open', 'close')
    $('.category-name').next('.game-wrap').css({'height': rowH + 'px' });
    eleCate.next('.game-wrap').css({'height': (rowH * row) + bufferH + 'px' });
    eleCate.attr({'data-open': 'open'});
  }
  if(isOpen == 'open') {
    eleCate.next('.game-wrap').css({'height': rowH + 'px' });
    eleCate.attr({'data-open': 'close'});
  }
  
  $('html, body').animate({
    scrollTop: $('#' + target ).offset().top
  }, {'speed': 500, 'easing': 'swing'});
}


$('.category-name').click(function(){
  var id = $(this).parent().attr('id'),
      isOpen = $(this).attr('data-open');
  toggleGameIcon(id, isOpen);

});

$(window).scroll(function() {
	var $height = $(window).scrollTop();
  var hh = $('.banner').height() + $('.product-switch').height();
  if($height > hh) {
		$('.category-menu').addClass('fixed');
	}
  if($height <= hh) {
		$('.category-menu').removeClass('fixed');
	}
});


