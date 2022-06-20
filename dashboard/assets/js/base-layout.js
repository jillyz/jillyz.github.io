$(function(){
    
    // 主選單的作用選單給.active
    menuActive();

    // 側邊攔開合
    sidebarStatus();

    // 子選單開闔    
    subMenuOperation();

    // Header上方功能panel
    headerPanelOperation();  

    // go to top
    goTop();
})

// == 自訂function =====================================
// 主選單的作用選單給.active
const menuActive = () => {
    /* 
        1) 所有祖輩給.active
        2) 所有.active的子輩.children給.childrenOpen
    */
    $('.GSMis-menu .current').parents('li').addClass('active');
    $('.GSMis-menu .active > .children').addClass('childrenOpen');

    // 常用選單
    $('#panel-favorite .current').parents('#btn-favorite').find('.children').addClass('active');
}
// 側邊攔開合
const sidebarStatus = () => {
    let status = 'isOpen';

    // 取得client端session storage的sidebar紀錄
    if (sessionStorage.getItem("sidebar")) {
        $(".GSMis-wrapper").removeClass('isClose isOpen').addClass(sessionStorage.getItem("sidebar"));
    } else{
        sessionStorage.setItem("sidebar", status);
    }
    // 桌機漢堡
    $(".GSMis-hamburger-desktop").click(function(){
        // 控制wrapper的isClose狀態
        $('.GSMis-wrapper').toggleClass("isClose isOpen");       
        $('.level-2').removeAttr('style');
        status = $(".GSMis-wrapper").attr('class').split(' ')[1];
        sessionStorage.setItem("sidebar", status);
    })
}
// Go to top
const goTop = () => {
    $(window).scroll(function () {
        if ($(window).scrollTop() == "0") {
            $(".GSMis-go-top").fadeOut(200);
        } else {
            $(".GSMis-go-top").fadeIn(200);
        }
    })
};
// 子選單開闔
const subMenuOperation = () => {
    // Click
    $(".GSMis-menu .children").click(function(e){
        e.preventDefault();
        if(!$('.GSMis-wrapper').hasClass('isClose')){
            $(this).toggleClass('childrenOpen');
            $(this).next().slideToggle();
        }
    })  
    // Hover
    $('.GSMis-menu li').hover(function(e){
        if($('.GSMis-wrapper').hasClass('isClose')){
            const title =  $(this).find('.level-2').prev().find('span').text();
            $(this).find('.level-2').attr('data-title', title)
            $(this).find('.level-2').toggle();
        }
    }); 

    // 常用功能hover狀態
    if($('.GSMis-wrapper').hasClass('isClose')){
        $('#btn-favorite').hover(function(){
            $('#panel-favorite').show();            
            
        },
        function(){
            $('#panel-favorite').hide();  
        })
    }
}
// Header上方功能panel
const headerPanelOperation = () => {
    $('.header-help-wrapper .link').click(function(e){
        $(this).parents('.item').siblings().find('.link').removeClass('active').next().hide();
        $(this).next().fadeToggle('200');
        if(!$(this).hasClass('noActive')){
            $(this).toggleClass('active')
        }
        e.stopPropagation();
    })

    // 點旁邊則關閉Header浮動面板
    $(document).on('click', function(e){
        if (!$(e.target).is('.content, .content *')) {
            $('.content').fadeOut(200);
            $('.header-help-wrapper .link').removeClass('active')
        }
    })

    //切換帳號
    $('.js-btn-user-switch').click(function(e){
        e.preventDefault();
        $('#user-switch-form-wrapper').toggle();
    })

    // 外聘委員預警按鈕狀態
    var offcanvasEarlyWarning = document.getElementById('offcanvasEarlyWarning')
    offcanvasEarlyWarning.addEventListener('hide.bs.offcanvas', function () {
        $('[data-bs-target="#offcanvasEarlyWarning"]').removeClass('active');
    })
    offcanvasEarlyWarning.addEventListener('show.bs.offcanvas', function () {
        $('[data-bs-target="#offcanvasEarlyWarning"]').addClass('active');
    })
}

