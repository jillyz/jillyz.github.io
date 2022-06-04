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
                $('.chk-' + type).parents('tr').addClass('func-check-highlight');
            }
            else{
                hideFuncPane();
                $('.chk-' + type).prop( "checked", false );
                $('.chk-' + type).parents('tr').removeClass('func-check-highlight');
            }
            showFuncPane();
        })
    }

    // check single checkbox for Operation
    function checkForOperation() {

        $('.chk-'+ type).change(function(){

            checkDifferentOperationType($(this));

            // highlight tr
            const isChecked = this.checked;
            if(isChecked){
                $(this).parents('tr').addClass('func-check-highlight');
            }
            else{
                $(this).parents('tr').removeClass('func-check-highlight');
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

    // cancel Operation check & func panel
    $('#cancel_' + type).click(function(){
        hideFuncPane(type);
    })

    // 切換篩選列表時，底部操作面板若有打開則須隱藏
    $('[data-func="filter"] input[type=radio]').change(function(){
        hideFuncPane();
    })

}

// hide Operation func panel
function hideFuncPane (type) {
    var $thisPane = $('.func-pane-wrap[data-func="' + type + '"]');
    $thisPane.removeClass('show');
    $('#chk_' + type + '_all').prop( "checked", false );
    // $('.chk-' + type).prop( "checked", false );
    $('.chk-' + type + ':checked').click();
    $('.func-check-highlight').removeClass('func-check-highlight');
}


//=============================================
// BTN
//=============================================

// 執行派案
$('.js-btn-assign').click(function(){
    toastSuccess('派案成功！');
    hideFuncPane('assign');
})

// 執行取消派案
$('.js-btn-unassign').click(function(){
    toastSuccess_UndoAction(
        '取消派案成功！', 
        function(){
            alert('已復原取消派案！');
        }
    );
    hideFuncPane('unassign');
})

// 批次執行取消派案
$('.js-btn-batch-unassign').click(function(){
    toastSuccess_UndoAction(
        '取消派案成功！<br>王某某, 張某', 
        function(){
            alert('已復原取消派案！');
        }
    );
    hideFuncPane('unassign');
})

// 執行退案
$('.js-btn-withdraw').click(function(){
    toastSuccess_UndoAction(
        '退案成功！', 
        function(){
            alert('已復原退案！');
        }
    );
    hideFuncPane('withdraw');
})

// 執行刪除
$('.js-btn-delete').click(function(){
    toastSuccess_UndoAction(
        '刪除成功！', 
        function(){
            alert('已復原刪除！');
        }
    );
    hideFuncPane('delete');
})

// 健康評估-註記後隱藏欄位
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

// toast 操作失敗
const toastFailed = (msg) => {
    SnackBar({
        status: 'danger',
        message: msg ? msg : '操作失敗！請重試',
        timeout: 2000,
        fixed: true,
    })
}

// toast 操作成功
const toastSuccess = (msg) => {
    SnackBar({
        status: 'success',
        message: '<i class="fa-solid fa-check"></i> ' + msg,
        timeout: 2000,
        fixed: true
    })
}

// toast 成功 + 復原
const toastSuccess_UndoAction = (msg, function_Undo) => {
    SnackBar({
        status: 'success',
        message: '<i class="fa-solid fa-check"></i> ' + msg,
        timeout: 5000,
        fixed: true,
        actions: [
            {
                text: '[ 復原 ]',
                dismiss: true,
                function: () => {
                    function_Undo();
                }
            }
        ]
    })
}
