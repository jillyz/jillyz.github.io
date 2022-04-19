$(() => {
    // 執行BS的tooltip功能
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // go to top
    goTop();
});




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