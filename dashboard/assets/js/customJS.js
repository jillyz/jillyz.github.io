$(function(){
  // Tooltip
  triggerTooltip();
  
  // 關閉表單的自動完功能
  offAutocomplete();
  
  // 驅動元素toggle
  toggleElements();

  // 多層Modal
  multiModal()

  var zIndexGL = 1060;

  $('[data-bs-toggle="offcanvas"]').click(function(e){
    e.preventDefault();
    // console.log($('.offcanvas.show').last().css('z-index'));
    // $('.offcanvas.show').css('z-index', zIndexGL+1);
    // $('.offcanvas-backdrop.show').css('z-index', zIndexGL);
    zIndexGL++;
    // console.log('zIndexGL', zIndexGL);

    
    // if($('.modal.show').length>0){      
    //   $('.offcanvas.show').css('z-index', $('.modal.show').css('z-index')*1+1);
    // }
  })
  $('[data-bs-toggle="modal"]').click(function(e){
    e.preventDefault();
    // $('.modal.show').last().css('z-index', zIndexGL+1);
    // $('.modal-backdrop.show').last().css('z-index', zIndexGL);
    // console.log('zIndexGL', zIndexGL);

    // zIndexGL++;    // console.log($('.modal.show').last());
    
    if($('.offcanvas.show').length>0){      
      // $('.modal.show').last().css('z-index', $('.offcanvas.show').css('z-index')*1+1);
      // $('.modal.show').last().css('z-index', $('.offcanvas.show').css('z-index')*1+1);
      // $('.modal.show').css('z-index', zIndexGL+1);
      // $('.modal-backdrop.show').css('z-index', zIndexGL);
    }
  })
})



// 自訂Function =======================================================================
// 移除父層
function removeParent(target){
  $(target).parent().remove();
}
// 啟動BS的tooltip
function triggerTooltip(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

// 關閉瀏覽器表單的自動完成
function offAutocomplete(){
    $('form,input,select,textarea').attr("autocomplete", "off");
}

// 起訖日
function duration(targetId) {
    const elem = document.getElementById(targetId);
    const rangepicker = new DateRangePicker(elem, {
      language: "zh-TW",
    });
}
// 單日
function singleDate(inputName) {
    const elem = document.querySelector(`input[name="${inputName}"]`);
    const datepicker  = new Datepicker(elem, {
      language: "zh-TW",
    //   maxNumberOfDates: 3  //複選數量
    });
}

// 元素toggle
function toggleElements(){
  $('.js-toggle-trigger').click(function(){
    $(this).parents('.js-toggle-wrapper').children().toggle();
  })
}
//快訊輪播
function slideLine(box,stf,delay,speed,h){
  //取得id
  var slideBox = document.getElementById(box);
  //預設值 delay:幾毫秒滾動一次(1000毫秒=1秒)
  //       speed:數字越小越快，h:高度
  var delay = delay||1000,speed = speed||20,h = h||47;
  var tid = null,pause = false;
  //setInterval跟setTimeout的用法可以咕狗研究一下~
  var s = function(){tid=setInterval(slide, speed);}
  //主要動作的地方
  var slide = function(){
  //當滑鼠移到上面的時候就會暫停
    if(pause) return;
  //滾動條往下滾動 數字越大會越快但是看起來越不連貫，所以這邊用1
    slideBox.scrollTop += 1;
  //滾動到一個高度(h)的時候就停止
    // console.log('slideBox.scrollTop'+slideBox.scrollTop);
    // console.log(h);
    // console.log(slideBox.scrollTop%h == 0);
    if(slideBox.scrollTop%h == 0){
  //跟setInterval搭配使用的
      clearInterval(tid);
  //將剛剛滾動上去的前一項加回到整列的最後一項
      slideBox.appendChild(slideBox.getElementsByTagName(stf)[0]);
  //再重設滾動條到最上面
      slideBox.scrollTop = 0;
  //延遲多久再執行一次
      setTimeout(s, delay);
    }
  }
  //滑鼠移上去會暫停 移走會繼續動
  slideBox.onmouseover=function(){pause=true;}
  slideBox.onmouseout=function(){pause=false;}
  //起始的地方，沒有這個就不會動囉
  setTimeout(s, delay);
}
//設定輪播item的寬度，for 圖表輪播
function setCarouseItemWidth(target){
  var w = $(target).width() - 20;
  $(target).find('.carousel-item > div').width(w);
}
// 多層modal
function  multiModal(){
  var zIndex = 1055;
  // Modal
  Array.from(document.getElementsByClassName('showmodal')).forEach( (e) => {
      e.addEventListener('click', function(element) {
          element.preventDefault();
          if (e.hasAttribute('data-show-modal')) {
              showModal(e.getAttribute('data-show-modal'));
          }
      }); 
  });
  // Offcanvas
  Array.from(document.getElementsByClassName('showoffcanvas')).forEach( (e) => {
      e.addEventListener('click', function(element) {
          element.preventDefault();
          if (e.hasAttribute('data-show-offcanvas')) {
              showoffcanvas(e.getAttribute('data-show-offcanvas'));
          }
      }); 
  });
  // Show 彈窗
  function showModal(modal) {
      const mid = document.getElementById(modal);
      let myModal = new bootstrap.Modal(mid);
      myModal.show();

      mid.addEventListener('shown.bs.modal', function(){
        if($('.offcanvas.show').length>0){
          $(mid).css('z-index', zIndex*1+2);
          $('.modal-backdrop.show').last().css('z-index', zIndex*1+1);
        }
        zIndex = $(mid).css('z-index');
      })
  }
  // Show offcanvas
  function showoffcanvas(offcanvas) {
      const mid = document.getElementById(offcanvas);
      let myOffcanvas = new bootstrap.Offcanvas(mid);
      myOffcanvas.show();

      mid.addEventListener('shown.bs.offcanvas', function(){
        if($('.modal.show').length>0){
          $(mid).css('z-index', zIndex*1+2);
          $('.offcanvas-backdrop.show').css('z-index', zIndex*1+1);
        }
        zIndex = $(mid).css('z-index');
      })
  }
}

