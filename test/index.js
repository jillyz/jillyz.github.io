var gameList = [
  {'ct': 'Recently Played' , 'count': 2, 'id': 'recently'},
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
    bufferH = 5;


$(function(){
  reset();
  indicator();
});
$(window).resize(function(){
  reset();
  indicator();
})

function reset () {
  if ( winH >= winW ) { rowCount = 3 }
  if ( winH < winW ) { rowCount = 5 }
  iconH = $('.game-icon').height(),
    rowH = iconH * 1.4;
  // $('.game-wrap').height(rowH + bufferH);
  $('.category-menu').addClass('slideIn');
}

$('.category-item').click(function(){
  var id = $(this).attr('data-target');
  $(this).addClass('active');
  $('.category-item').not($(this)).removeClass('active');
  toggleGameIcon(id, 'close');
  // $('#' + id + ' .category-name').trigger('click');
});

function toggleGameIcon (id, isOpen) {
  var target = id;
  var eleCate = $('#' + target ).children('.category-name');
  var index = eleCate.attr('data-index');
  
  var row = parseInt(gameList[index].count / rowCount);
  if( gameList[index].count % rowCount > 0 ) {
    row = row + 1;
  } 

  // if(isOpen == 'close') {
  //   $('.category-name').not(eleCate).attr('data-open', 'close')
  //   $('.category-name').next('.game-wrap').css({'height': rowH + 'px' });
  //   eleCate.next('.game-wrap').css({'height': rowH * row + bufferH + 'px' });
  //   eleCate.attr({'data-open': 'open'});
  // }
  // if(isOpen == 'open') {
  //   eleCate.next('.game-wrap').css({'height': rowH + 'px' });
  //   eleCate.attr({'data-open': 'close'});
  // }
  
  $('html, body').animate({
    scrollTop: $('#' + target ).offset().top
  }, {'speed': 500, 'easing': 'swing'});
}


$('.category-name').click(function(){
  var id = $(this).parent().attr('id'),
      isOpen = $(this).attr('data-open');
  toggleGameIcon(id, isOpen);

});

$('.balance').click(function(){
  $(this).toggleClass('hide');
})

function indicator (){
  var arrTop = [],
      lenCateItem = $('.category-item').length;
  for(var i = 0; i < lenCateItem; i++) {
    arrTop.push($('.category-wrap').eq(i).offset().top);
  }

  $(window).scroll(function() {
    var $height = $(window).scrollTop();
    var hh = $('.banner').height() + $('.product-switch').height() - bufferH;
    if($height > hh) {
      $('.category-menu, .balance-wrap, .menu').addClass('fixed');
    }
    if($height <= hh) {
      $('.category-menu, .balance-wrap, .menu').removeClass('fixed');
    }
    
    //window.scrollY
    var y = window.scrollY ;
    var len = arrTop.length;
    for( var i=0; i<len; i++) {

      if( y < arrTop[0] ) {
        $('.category-wrap .category-name').removeClass('fixed');
      }

      if( y >= arrTop[i] && y < arrTop[i+1] ) {
        $('.category-item').eq(i).addClass('active');
        $('.category-item').not($('.category-item').eq(i)).removeClass('active');
        $('.category-wrap .category-name').removeClass('fixed');
        $('.category-wrap').eq(i).find('.category-name').addClass('fixed');
      }
      
      if( y > arrTop[len-1] ) {
        $('.category-item').eq(len-1).addClass('active');
        $('.category-item').not($('.category-item').eq(len-1)).removeClass('active');
        $('.category-wrap .category-name').removeClass('fixed');
        $('.category-wrap').eq(len-1).find('.category-name').addClass('fixed');
      }
    }
    
  });

}




