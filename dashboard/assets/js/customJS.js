$(function(){
  // Tooltip
  triggerTooltip();
  
  // 關閉表單的自動完功能
  offAutocomplete();
  
  // 驅動元素toggle
  toggleElements();
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

