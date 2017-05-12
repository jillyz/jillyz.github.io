var view = {
    modeForReport: false,
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        // 單選清單 *fieldName, *data, defaultVal, *hasAll, viewLang
        var transTypeHtml = checkboxListView.renderHtml('transTypes', type, '', true, transLang);
        $('#transTypes').html(transTypeHtml);

        // 下拉選單
        var ddlTransFromHtml = dropDownListView.renderHtml('sFrom', walletTypes, '', true, '', sFromLang);
        $('#sFrom').html(ddlTransFromHtml);
        var ddlTransToHtml = dropDownListView.renderHtml('sTo', walletTypes, '', true, '', sToLang);
        $('#sTo').html(ddlTransToHtml);
        var ddlStatusHtml = dropDownListView.renderHtml('status', transStatus, '', true, '', statusLang);
        $('#status').html(ddlStatusHtml);

        // 快速日期選項 *beginName, *endName, *domId, *dateLang, hasTime, beginVal, endVal
        dateView.renderDatePickerQuickSetHtml('createBeginDateTime', 'createEndDateTime', 'createDateTime', dateLang, true);
        dateView.renderDatePickerQuickSetHtml('viewBeginDateTime', 'viewEndDateTime', 'viewDateTime', dateLang, true);
        dateView.renderDatePickerQuickSetHtml('lastModifyBeginDateTime', 'lastModifyEndDateTime', 'lastModifyDateTime', dateLang, true);

        // 排序選項
        var sortHtml = sortView.renderSortByListHtml('sortColumn', 'sortDirection', sort, sortLang, 'id', -1);
        $('#sort').html(sortHtml);

        // 檢查網址是否有帶id (當是在檢視某會員的歷史紀錄)
        view.checkIfInUserViewMode();

        view.bindEvent();
    },

    bindEvent: function () {

        // 進階搜尋
        $('#query_box').on('click', '#toggle-advance', function () {
            $('.advanceQuery, #toggle-advance .icon-up-open, #toggle-advance .icon-down-open').toggle();
        });
        // 查詢按鈕
        $('#query_box').on('click', '#submit', function () {
            view.getQueryResult();
        });
    },
    // 當是在檢視某會員的歷史紀錄 (網址有帶userId和username，以及mode)
    checkIfInUserViewMode: function () {

        var urlObj = getUrl.parseParamValue(),
            isOnUserMode = urlObj.userId !== undefined;

        var mode = parseInt(urlObj.mode);

        if (isOnUserMode == true) {

            switch (mode) {

                //mode 0 從訂單自己
                //ex: /pointControl/order/query?userId=97496&username=test03&mode=0
                case 0:
                    $('[name="creater"]').val(urlObj.userId);
                    $('#userInfo_box').html('<span>' + urlObj.username + ' - ' + lang.ORDER_LIST_TITLE_ORDER_HISTORY + '</span>');
                    break;

                    //mode 1 從數字報表的會員
                    //ex: /pointControl/order/query?userId=97505&username=user2&mode=1&createBeginDateTime=2016/08/21 00:00:00&createEndDateTime=2016/08/27 23:59:59
                case 1:
                    $('[name="creater"]').val(urlObj.userId);
                    $('[name="createBeginDateTime"]').val(urlObj.createBeginDateTime);
                    $('[name="createEndDateTime"]').val(urlObj.createEndDateTime);
                    view.modeForReport = true;
                    $('#fieldType').hide();
                    $('#userInfo_box').html('<span>' + urlObj.username + ' - ' + lang.ORDER_LIST_TITLE_ORDER_HISTORY_FOR_REPORT + '</span>');
                    break;

                    //mode 2 從會員列表的交易歷程，從今天起往前一個月
                    //ex: /pointControl/order/query?userId=97496&username=test03&mode=2
                case 2:
                    $('[name="creater"]').val(urlObj.userId);
                    $('#createDateTime .quickOneMonthItem').trigger('click');
                    $('#userInfo_box').html('<span>' + urlObj.username + ' - ' + lang.ORDER_LIST_TITLE_ORDER_HISTORY + '</span>');
                    break;
            }

            view.getQueryResult('');
            $('#fieldUsername, #fieldAgent').addClass('hidden');
            $('.fixedBottom').css({ 'left': 0 });
            $('#userInfo_box').show();
        }
    },
    search: function () {
        var form = {};
        form['action'] = 'list';
        $('.filterForm').each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            form[name] = val;
        });

        //modeForReport (從報表連過來的) => 查詢...類別:儲值+出售 & 狀態:已處理
        if (view.modeForReport == true) {
            form['transTypes'] = typeId.deposit + ',' + typeId.withdraw;
            form['status'] = transStatusId.handled;
        } else {
            var arr = [];
            $('[name="transTypes"]:checked').each(function () {
                arr.push($(this).val());
            });

            form['transTypes'] = arr.join(',');
        }

        form['sortDirection'] = $('[name="sortDirection"]:checked').val();

        return form;
    },
    getQueryResult: function (currentPage) {

        var form = view.search();
        if (currentPage !== undefined) {
            form['page'] = currentPage;
            model_global_global.ajaxLoading(true);
        } else {
            $('#submit').attr('data-disabled', true);
            $('#list_wrapper').hide();
        }

        //console.log(form);

        $.post(
            '/pointControl/order/query',
            JSON.stringify(form),
            function (res) {

                if (currentPage !== undefined) {
                    model_global_global.ajaxLoading(false);
                } else {
                    $('#submit').attr('data-disabled', false);
                }

                if (currentPage !== undefined) {
                    model_global_global.ajaxLoading(false);
                } else {
                    $('#submit').attr('data-disabled', false);
                }

                model_global_global.ajaxLoading(false);
                var lang = model_global_global.getLangText(res);

                if (lang['key'] !== undefined) {

                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                } else {
                    $('.input.error').removeClass('error');
                    $('.message').hide();
                }

                res = JSON.parse(res);

                //若有資料
                if (res.d.length > 0) {

                    // 如果網址   有帶參數 userId => isOnUserMode 為 true
                    // 如果網址 沒有帶參數 userId => isOnUserMode 為 false
                    var urlObj = getUrl.parseParamValue(),
                        isOnUserMode = urlObj.userId !== undefined;

                    viewOrderHtml.renderResultListHtml(res, '#listTable', isOnUserMode);

                    viewOrderHtml.renderTopTotalHtml(res, '#topTotal'); // 上方總計
                    viewOrderHtml.renderBottomTotalHtml(res, '#bottomTotal'); //下方總計,本頁小計

                    // 顯示分頁
                    if (!currentPage) {
                        var pagerHtml = pagerViewOne.renderPaginationHtml(res.p, res.d.length);
                        $('.pageGroup').html(pagerHtml);
                    }

                    $('#emptyData').hide();
                    $('#list_wrapper, #list_box, #bottomTotal').show();

                }
                    //若無資料
                else {
                    $('#list_wrapper, #emptyData').show();
                    $('#list_box, #bottomTotal').hide();
                    pagerViewOne.renderPaginationHtml(res.p, res.d.length, '.pageGroup');
                }
            }
        )
    }

};

$(function () {
    view.init();
});