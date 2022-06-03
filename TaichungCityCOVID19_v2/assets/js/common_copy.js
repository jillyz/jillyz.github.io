var tempOperationType;

$(() => {
    // 執行BS的tooltip功能
    $('[data-bs-toggle="tooltip"]').tooltip();

    // 執行BS的ScrollSpy功能
    const dataSpyList = document.querySelectorAll('[data-bs-spy="scroll"]')
    dataSpyList.forEach(dataSpyEl => {
    bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh()
    })
    
    // go to top
    goTop();

    // for Operation

    batchOperation('delete');
    batchOperation('withdraw');
    batchOperation('assign');
    batchOperation('unassign');
    // checkAndReasonOperation('unassign')
    
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

//=============================================
// 批次操作（刪除,退案）
//=============================================

function batchOperation(type) {

    checkForAllOperation(type)
    checkForOperation(type)

    // check all checkbox for Operation
    function checkForAllOperation() {
        $('#chk_' + type + '_all').change(function(){
            const isChecked = this.checked;

            checkDifferentOperationType($(this));

            if(isChecked){
                
                $('.chk-' + type).prop( "checked", true );
                $('.chk-' + type).parent().parent('tr').addClass('func-check-highlight');
            }
            else{
                hideFuncPane();
                $('.chk-' + type).prop( "checked", false );
                $('.chk-' + type).parent().parent('tr').removeClass('func-check-highlight');
            }
            showFuncPane();
        })
    }

    // check single checkbox for Operation
    function checkForOperation() {

        // alert(type)

        $('.chk-'+ type).change(function(){

            checkDifferentOperationType($(this));

            // highlight tr
            const isChecked = this.checked;
            if(isChecked){
                $(this).parent().parent('tr').addClass('func-check-highlight');
            }
            else{
                $(this).parent().parent('tr').removeClass('func-check-highlight');
            }

            const countInputIsChecked = $('.chk-' + type + ':checked').length;
            const countInputAll = $('.chk-' + type).length;

            if(countInputIsChecked == countInputAll) {
                $('#chk_' + type + '_all').prop( "checked", true );
            }
            else{
                $('#chk_' + type + '_all').prop( "checked", false );
            }

            showFuncPane();
        })
    };

    function checkDifferentOperationType (_this){
        if(type !== tempOperationType) {
            hideFuncPane(tempOperationType);
            _this.prop( "checked", true );
            tempOperationType = type;
        }
    }

    var $thisPane = $('.func-pane-wrap[data-func="' + type + '"]');
    var $allPane = $('.func-pane-wrap');

    // show Operation func panel
    function showFuncPane () {

        const count = $('.chk-' + type + ':checked').length;
        $thisPane.find('.count').text(count);

        // const countChecked =$('td.' + type + ' input.chk-' + type + '[type=checkbox]:checked').length;
        const countChecked =$('input.chk-' + type + '[type=checkbox]:checked').length;
        if(countChecked > 0) {
            $allPane.removeClass('show');
            $thisPane.addClass('show');
        }
        else{
            $thisPane.removeClass('show');
        }
    }

    // hide Operation func panel
    function hideFuncPane (type) {
        $thisPane.removeClass('show');
        $('#chk_' + type + '_all').prop( "checked", false );
        // $('.chk-' + type).prop( "checked", false );
        $('.chk-' + type + ':checked').click();
        $('.func-check-highlight').removeClass('func-check-highlight');
    }

    // cancel Operation check & func panel
    $('#cancel_' + type).click(function(){
        hideFuncPane(type);
    })

    // 切換篩選列表時，底部操作面板若有打開則須隱藏
    $('[data-func="filter"] input[type=radio]').change(function(){
        hideFuncPane();
    })

}


//=============================================
// 單筆操作 + 後面輸入原因及送出（取消派案）
//=============================================

// function checkAndReasonOperation(type){

//     // inital
//     // $('.col-' + type + '-note').hide();
//     $('.func-' + type).hide();

//     // 出現輸入框及送出按鈕
//     $('.chk-' + type).change(function(){
//         // highlight tr
//         const isChecked = this.checked;
//         const $thisNoteBtn= $(this).parent().next().find('.func-' + type);
//         if(isChecked){
//             $thisNoteBtn.show();
//         }
//         else{
//             $thisNoteBtn.hide();
//         }
//         batchOperation(type);
//     })

//     $('.func-' + type + ':not(:checked)').parents('tr').on('mouseenter', function(){
//         $(this).find($('.func-' + type)).show();
//     })
//     $('.func-' + type + ':not(:checked)').parents('tr').on('mouseleave', function(){
//         $(this).find($('.func-' + type)).hide();
//     })

//     checkForAllOperation(type)
//     function checkForAllOperation(type) {
//         $('#chk_' + type + '_all').change(function(){
//             const isChecked = this.checked;
//             if(isChecked){
//                 showAllNoteBtn();
//             }
//             else{
//                 hideAllNoteBtn();
//             }
//         })
//     }

//     function hideAllNoteBtn(){
//         $('.chk-' + type + ':checked').click();
//         $('.chk-' + type).parent().parent('tr').removeClass('func-check-highlight');
//     }
//     function showAllNoteBtn(){
//         $('.chk-' + type + ':not(:checked)').click();
//         $('.chk-' + type).parent().parent('tr').addClass('func-check-highlight');
//     }

//     // 切換篩選列表時，底部操作面板若有打開則須隱藏
//     $('[data-func="filter"] input[type=radio]').change(function(){
        
//     })

// }



//=============================================
// BTN
//=============================================

// 執行取消派案
$('.js-btn-unassign').click(function(){
    toastWithdrawSuccess();
})

// 執行退案
$('.js-btn-withdraw').click(function(){
    toastWithdrawSuccess();
    // toastFailed();
})

$('#btn_case_note').click(function(){
    var val = $('#case_note').val();
    if(val > 0) {
        $('.js-no-fill-for-note').hide();
    }
    else {
        $('.js-no-fill-for-note').show();
    }
    
})


//=============================================
// TOAST 操作回饋訊息
//=============================================

const toastFailed = () => {
    SnackBar({
        status: 'danger',
        message: '操作失敗！請重試',
        timeout: 2000,
        fixed: true,
    })
}

const toastWithdrawSuccess = () => {
    SnackBar({
        status: 'success',
        message: '<i class="fa-solid fa-check"></i> 取消派案成功！　',
        timeout: 4000,
        fixed: true,
        actions: [
            {
                text: '[ 復原 ]',
                dismiss: true,
                function: () => {
                    alert('復原成功');
                }
            }
        ]
    })
}

// const toastCancelWithdrawSuccess = () => {
//     SnackBar({
//         status: 'success',
//         message: '<i class="fa-solid fa-check"></i> 已取消退案！　',
//         timeout: 2000,
//         fixed: true,
//     })
// }
