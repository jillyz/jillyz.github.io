$(() => {
    // 執行BS的tooltip功能
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // go to top
    goTop();

    // for DELETE
    checkForAllDelete();
    checkForDelete();

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

// check all checkbox for DELETE
const checkForAllDelete = () => {
    $('#chk_delete_all').change(function(){
        const isChecked = this.checked;
        if(isChecked){
            $('.chk-del').prop( "checked", true );
            $('.chk-del').parent().parent('tr').addClass('delete-highlight');
        }
        else{
            $('.chk-del').prop( "checked", false );
            $('.chk-del').parent().parent('tr').removeClass('delete-highlight');
        }
        showDeleteFunc();
    })
}

// check single checkbox for DELETE
const checkForDelete = () => {
    $('.chk-del').change(function(){
        // highlight tr
        const isChecked = this.checked;
        if(isChecked){
            $(this).parent().parent('tr').addClass('delete-highlight');
        }
        else{
            $(this).parent().parent('tr').removeClass('delete-highlight');
        }

        const countInputAll = $('.chk-del').length;
        const countInputIsChecked = $('.chk-del:checked').length;
        if(countInputIsChecked == countInputAll) {
            $('#chk_delete_all').prop( "checked", true );
        }
        else{
            $('#chk_delete_all').prop( "checked", false );
        }

        showDeleteFunc();
    })
};

// show DELETE fun panel
const showDeleteFunc = () => {
    const countChecked =$('td.delete input[type=checkbox]:checked').length;
    if(countChecked > 0) {
        $('.delete-wrap').addClass('show');
    }
    else{
        $('.delete-wrap').removeClass('show');
    }
}

$('#cancel_del').click(function(){
    $('.delete-wrap').removeClass('show');
    $('.chk-del').prop( "checked", false );
    $('#chk_delete_all').prop( "checked", false );
})