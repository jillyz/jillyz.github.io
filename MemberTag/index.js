// (function(){

// var tagIt = document.querySelectorAll('.tag-it');

// for (var i = 0; i < tagIt.length; i++) {

//     var self = tagIt[i];

//     self.addEventListenter('click', function (event) {
//       alert();

//     }, false);

// }

// })();


var view = {
  init: function(){
    $('[data-toggle="tooltip"]').tooltip();
    view.bindEvent();
  },
  bindEvent: function(){
    $('.tag-it').click(function(){
      $(this).fadeOut();
    });
    $('.swith-mode-js').click(function(){
      var mode = $('#mode').attr('data-mode');
      if(mode === 'member') { 
        $('#mode').attr('data-mode', 'tag');
        $('#tag-setting-1').addClass('active');
      };
      if(mode === 'tag') { 
        $('#mode').attr('data-mode', 'member');
        $('#tag-setting-1').removeClass('active');
      };
      $('.btn-mode-switch').toggleClass('hidden');
    });
  },
  noticeShow: function(){
    
  }
}

$(function(){
  view.init();  
});

