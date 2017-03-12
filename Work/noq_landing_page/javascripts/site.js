/* eslint-env browser, jquery */
var rem = 16;
var winH = $(window).height();
var winW = $(window).width();

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var isAndroid = /Android/i.test(navigator.userAgent);
var isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);

var isLandscape = winW > winH;
var isPortrait = winW <= winH;

if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

var view = {
  init: function() {
    FastClick.attach(document.body);

    view.pageIsLoaded();
    view.pnlHeaderStyle();
    view.btnScrollDown_isAnimated();
    view.coverContent_hide();
    view.pnlQuickDownload_show();
    view.btnScrollTop_show();
    if(! isMobile) {
      view.scrollAnimation();
    }
    view.bindEvent();
  },
  bindEvent: function() {
    $(window).scroll(function() {
      view.pnlHeaderStyle();
      view.pnlQuickDownload_show();
      view.coverContent_hide();
      view.btnScrollTop_show();
      if(! isMobile) {
        view.coverBgParallax();
        view.scrollAnimation();
      }
    });

    $('.page').on('click', '.scrollTo-js', function(e) {
      var toID = $(this).attr("href");
      var offSetTop = 0;
      var speed = 1000;

      if (toID.includes('step') && !isMobile) {
        offSetTop = $(toID).offset().top - (8 * rem);
      } 
      else if (toID === '#corePoint') {
        offSetTop = $('#corePoint').outerHeight() - 3*rem;
      }
      // else if (toID == '#download' || toID == '#banner') {
      //   offSetTop = $(toID).offset().top - ( 3 * rem);
      //   speed = 1000;
      // }
      else {
        offSetTop = $(toID).offset().top - (3 * rem);
      }

      $('html, body').animate({scrollTop: offSetTop}, speed);

      return false;
    });

    $('.page').on('click', '.qrcode', function() {
      var imgUrl = $(this).attr('src');
      var imgAlt = $(this).attr('alt');
      $('.show-QRcode').removeClass('hidden');
      $('.show-QRcode img').attr('src',imgUrl);
      $('.show-QRcode .txt').text(imgAlt);
      $('body').css({'overflow':'hidden'});
      return false;
    });
    $('.page').on('click', '.show-QRcode, .show-QRcodeimg', function() {
      $('.show-QRcode').addClass('hidden');
      $('body').css({'overflow':'auto'});
      return false;
    });
  },
  coverBgParallax: function(){
    var scrlTop = $(window).scrollTop();
    var coreH = $('#corePoint').height();
    if (isLandscape) {
      $('.bg').css({'background-position-y':  80 - ((scrlTop/coreH)*100*.15)  + '%'});
    }
  },
  coverContent_hide:function(){
    var scrlTop = $(window).scrollTop();
    var coreH = $('#corePoint').height();
    if (isLandscape) {
      $('.btnScrollDown,.banner-content').css({'opacity': 1- scrlTop/coreH*1.5});
      $('.bg').css({'background-size': (1.6 - (scrlTop/coreH)*.15) * 100 + '% auto' });
      // $('.bg').css({'-webkit-filter':'blur(' + (scrlTop/coreH)*5 + 'px)'});
    }
    console.log(scrlTop/coreH)
  },
  scrollAnimation:function(){

    var winH = $(window).height();
    var winH2 = $(window).height() * .5;

    $('.advance .item').each(function(){
      var h = $(this).offset().top - $(window).scrollTop();
      if( h < winH) {
        $(this).css({'opacity':1});
      } else {
        $(this).css({'opacity':0});
      }
    });

    $('.step .screen').each(function(){
      var h = $(this).offset().top - $(window).scrollTop();
      if( h < winH2) {
        $(this).css({'opacity':1, 'top':0});
      } else {
        $(this).css({'opacity':0, 'top':30});
      }
    });
    
    $('.step').each(function(){
      var $con = $(this).find('.how-content');
      var h = $(this).offset().top - $(window).scrollTop();
      if( h < winH2) {
        $con.css({'opacity':1, 'left':0});
      } else {
        if( $(this).hasClass('even')) {
          $con.css({'opacity':0, 'left': -50});          
        } else {
          $con.css({'opacity':0, 'left':50});
        }
      }
    });
  },
  isExitCover: function() {
    return $(document).scrollTop() > $('#banner').height() + $('#corePoint').height();
  },
  isOnPageBottom: function() {
    if ($('.cta-again').length > 0) {
      return ($('.cta-again').offset().top - $(document).scrollTop() - winH) <= 0;
    }

    return false;
  },
  // 以下採用：是否套用 hidden 樣式來達到元素的顯示/隱藏，
  // 是為了在 HTML 內可以先套用 class="hidden" 以預先隱藏元素，再用本函式變更為隱藏/顯示
  // 元素不與 jQuery 的 show() 或 hide() 混用，以免不起作用
  show: function(dom) {
    $(dom).removeClass('hidden');
  },
  hide: function(dom) {
    $(dom).addClass('hidden');
  },
  // 當載入完成後，顯示頁面 (主要是為了封面圖片需載入完成而做)
  pageIsLoaded: function() {
    $('body').removeClass('isLoading');
    $('.loading').hide();
    $('.page').addClass('show');
    // 變成 .page.show 之後才會開始做CSS動畫
    view.bannerTextEffect();
  },
  bannerTextEffect: function() {
    $('.page.show .banner .effect-js').inewsticker({
      speed: 5000,
      effect: 'fade',
      delay_after: 5000
    });
  },
  // 若非行動裝置，才給「捲動提示按鈕」做動畫呈現
  btnScrollDown_isAnimated: function() {
    if (isMobile === false) {
      $('.banner-btn-scroll-down').addClass('is-desktop');
    }
  },
  pnlHeaderStyle: function() {
    if (isMobile === false) {
      $('.header').removeClass('isMobile');
      var coverH = $('#banner').height() + $('#corePoint').height();
      if ($(document).scrollTop() > coverH + 6 * rem) {
        $('.header').addClass('view');
      } else {
        $('.header').removeClass('view');
      }
    } else {
      $('.header').addClass('view');
    }
  },
  // 判斷何時顯示「快速下載APP」的區塊
  pnlQuickDownload_show: function() {
    var isExitCover = view.isExitCover();
    var isOnPageBottom = view.isOnPageBottom();
    view.hide('#getApp');

    if (isAndroid || isIos) {
      if (isExitCover) {
        view.show('#getApp');
      } else {
        view.hide('#getApp');
      }
      if (isOnPageBottom) {
        view.hide('#getApp');
      }
    }
  },
  btnScrollTop_show: function() {
    var isExitCover = view.isExitCover();
    view.hide('.btn-scroll-top');
    if (isExitCover) {
      view.show('.btn-scroll-top');
    } else {
      view.hide('.btn-scroll-top');
    }
  }
};

$(document).ready( function() {
  view.init();
});
