$(function(){


    // 桌機漢堡
    $(".GSMis-hamburger-desktop").click(function(){
        // 控制wrapper的isClose狀態
        $('.GSMis-wrapper').toggleClass("isClose");
    })

    // 選單collapse event
    $('#GSMis-collapse-menu').on('hide.bs.collapse', function () {
        console.log(123);
        // 漢堡icon切換
        $(".GSMis-hamburger-mobile > *").toggle();
        $('.GSMis-help-user-name').fadeOut();        
    })
    $('#GSMis-collapse-menu').on('show.bs.collapse', function () {
        console.log(456);
        // 漢堡icon切換
        $(".GSMis-hamburger-mobile > *").toggle();
        $('.GSMis-help-user-name').fadeIn();
    })

    // 主選單的作用選單給.active
    /* 
        1) 所有祖輩給.active
        2) 所有.active的子輩.children給.childrenOpen
    */
    $('.GSMis-menu .current').parents('li').addClass('active');
    $('.GSMis-menu .active > .children').addClass('childrenOpen');

    // 子選單開闔    
    $(".GSMis-menu .children").click(function(e){
        e.preventDefault();
        $(this).toggleClass('childrenOpen');
        $(this).next().slideToggle();
    })
    
})