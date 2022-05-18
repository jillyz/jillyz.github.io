$(function() {

    // 選單collapse event
    $('#GSMis-collapse-menu').on('hide.bs.collapse', function() {
        // 漢堡icon切換
        $(".GSMis-hamburger-mobile > *").toggle();
        $('.GSMis-help-user-name').fadeOut();
    })
    $('#GSMis-collapse-menu').on('show.bs.collapse', function() {
        // 漢堡icon切換
        $(".GSMis-hamburger-mobile > *").toggle();
        $('.GSMis-help-user-name').fadeIn();
    })


    // 所有祖輩給.active
    $('.GSMis-menu .current').parents('li').addClass('active');
    // 手機模式時，所有.active的子輩.children給.childrenOpen
    if ($(window).width() < 992) {
        $('.GSMis-menu .active > .children').addClass('childrenOpen');
    }


    // 子選單開闔    
    /*
        螢幕寬度<992都是click動作，以上是hover動作
    */
    if ($(window).width() < 992) {
        // Click動作 (手機)
        $(".GSMis-menu .children").click(function(e) {
            e.preventDefault();
            $(this).toggleClass('childrenOpen');
            $(this).next().slideToggle();
        })
    } else if ($(window).width() >= 992 && $(window).width() <= 1024) {
        // Click動作 (iPad橫式)
        $(".GSMis-menu > li > .children").click(function(e) {
            e.preventDefault();
            $(this).toggleClass('childrenOpen');
            $(this).next().slideToggle();

            $(this).parent().siblings().children('.level-2').slideUp();
        })
        $(".GSMis-menu .level-2 .children").click(function(e) {
            e.preventDefault();
            $(this).toggleClass('childrenOpen');
            $(this).next().slideToggle();
        })
    } else {
        // Hover動作 (>992)
        $(".GSMis-menu > li").hover(function() {
            $(this).children(".children").toggleClass('childrenOpen').next().stop().slideToggle();
        })
        $(".GSMis-menu .level-2 .children").click(function(e) {
            e.preventDefault();
            $(this).toggleClass('childrenOpen');
            $(this).next().slideToggle();
        })
    }

})