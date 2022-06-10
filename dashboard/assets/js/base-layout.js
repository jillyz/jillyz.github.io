$(function(){
    // ==桌機漢堡
    $(".GSMis-hamburger-desktop").click(function(){
        // 控制wrapper的isClose狀態
        $('.GSMis-wrapper').toggleClass("isClose isOpen");       
        $('.level-2').removeAttr('style');
    })

    // ==主選單的作用選單給.active
    /* 
        1) 所有祖輩給.active
        2) 所有.active的子輩.children給.childrenOpen
    */
    $('.GSMis-menu .current').parents('li').addClass('active');
    $('.GSMis-menu .active > .children').addClass('childrenOpen');


    // Header上方功能panel
    headerPanelOperation();
    
    // 子選單開闔    
    subMenuOperation();

    // go to top
    goTop();
})

// == 自訂function =====================================
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

    $('#btn-favorite').hover(function(){
        if($('.GSMis-wrapper').hasClass('isClose')){
            $('#panel-favorite').toggle();            
        }
    })
}

// Header上方功能panel
const headerPanelOperation = () => {
    $('.header-help-wrapper .link').click(function(e){
        $(this).parents('.item').siblings().find('.link').removeClass('active').next().hide();
        $(this).next().fadeToggle('200');
        if(!$(this).hasClass('dropdown')){
            $(this).toggleClass('active')
        }
        e.stopPropagation();
    })

    // 點旁邊則關閉Header浮動面板
    $(document).on('click', function(e){
        if (!$(e.target).is('.content, .content *')) {
            $('.content').fadeOut(200);
        }
    })

    // 使用者切換
    $('.js-btn-user-switch').click(function(e){
        e.preventDefault();
        $('#user-switch-form-wrapper').toggle();
    })
}

