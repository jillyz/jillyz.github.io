var gameList = [
    {'ct': 'Recently Played' , 'count': 4, 'id': 'recently'},
    {'ct': 'Top Pick' , 'count': 54, 'id': 'toppick'},
    {'ct': 'Slots' , 'count': 36, 'id': 'slots'},
    {'ct': 'Arcade' , 'count': 12, 'id':'arcade'},
    {'ct': 'Scratch Cards' , 'count': 12, 'id': 'scratchcard'},
    {'ct': 'Virtual Games' , 'count': 7, 'id': 'virtual'},
    {'ct': 'Hilo & Numbers' , 'count': 13, 'id':'numbers'},
    {'ct': 'Casino' , 'count': 7, 'id': 'casino'},
  ]
  
  $('#gameList').css({'margin-bottom': 30  + 'px'});
  
  var html = '';
  for ( var i = 0; i < gameList.length; i ++ ) {
    var count = gameList[i].count;
    html += '<div class="category-wrap" id="' + gameList[i].id  +'">';
      html += '<div class="category-name ' +  gameList[i].id +'" data-index="' + i + '" data-open="false">' + gameList[i].ct + '</div>';
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
  $('.category-item:first-child').addClass('active');
  
  //----------------------------------
  
  var winW = $(window).width(),
      winH = $(window).height(),
      rowCount = 0;
  
  if ( winH >= winW ) { rowCount = 3 }
  if ( winH < winW ) { rowCount = 5 }
  
  $('.category-name').click(function(){
    var target = $(this).parent('.category-wrap').attr('id');
    var isOpen = $(this).attr('data-open');
    var index = $(this).attr('data-index');
    var row = parseInt(gameList[index].count / rowCount);
    if( gameList[index].count % rowCount >0 ) {
      row = row + 1;
    }  
    if(isOpen == 'false') {
      $('.category-name').not($(this)).attr('data-open', 'false')
      $('.category-name').next('.game-wrap').css({'height': '110px' });
      $(this).next('.game-wrap').css({'height': 111 * row + 'px' });
      $(this).attr({'data-open': 'true'});
    }
    if(isOpen == 'true') {
      $(this).next('.game-wrap').css({'height': '110px' });
      $(this).attr({'data-open': 'false'});
    }
    
    $('html, body').animate({
      scrollTop: $('#' + target ).offset().top
    }, {'speed': 500, 'easing': 'swing'});
    
  });
  
  $('.category-item').click(function(){
    var target = $(this).attr('data-target');
    $(this).addClass('active');
    $('.category-item').not($(this)).removeClass('active');
    $('#' + target ).find('.category-name').trigger('click');
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
  
  
  