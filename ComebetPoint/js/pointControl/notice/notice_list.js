var view = {
    sec: 0,
    isGettingData: false,
    isFirstTime: true,
    multiCheckIDs: [],
    oldTemp: {},
    field: {
        "id": "a",
        "username": "b",
        "submitTime": "c",
        "type": "d",
        "content": "e",
        "viewer": "f",
        "viewDateTime": "g",
        "amount": "h",
        "sFrom": "i",
        "sTo": "j",
        "accountId": "k",
        "walletIsLock": "l",
        "userId": "m",
        "upperUsername": "n",
        "isPaid": "o"
    },
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        view.paneHeight();

        var newType = dataHandler.excludeData_newData(type, typeExclude);
        view.renderTabAndPanelHtml(newType, '#list_box', typeDepositId);

        view.sec = countdownSec;
        $('.getData-js').html(view.sec);
        view.getQueryResult();

        view.showPaidOrUnpaid();

        view.bindEvent();
    },
    bindEvent: function () {

        document.onkeydown = view.multiSelect;
        document.onkeyup = view.multiSelect;

        // 更新
        $('.counterBlock').on('click', '.getData-js[data-allowGet="true"]', function () {
            view.allowGet(this);
            view.continuePlayNoticeSound();
            view.getQueryResult();
        });

        // 切換檢視選項, 顯示列表Pane
        $('#pnlControl').on('change', '.chkTabPane', function () {
            //for儲值
            view.showPaidOrUnpaid();

            //切換pane
            var viewPaneOrder = $(this).attr('data-tab');
            $('.chkTabPane:not([data-tab="' + viewPaneOrder + '"])').prop('checked', false);
            $('.mui-tabs__pane').hide();
            $('#pane_' + viewPaneOrder).show();

            if ($('.chkTabPane:checked').size() == 0) {
                $('#isPaid_true').prop('checked', true);
                $('.mui-tabs__pane').hide();
                $('#pane_1').show();
                view.showPaidOrUnpaid();
            }

            //顯示清理未繳單按鈕
            if ($('#isPaid_false').prop('checked') == true) {
                $('#btnClearUnpaid').removeClass('hidden');
            } else {
                $('#btnClearUnpaid').addClass('hidden');
            }

        });

        // 執行清理未繳單
        $('#pnlControl').on('click', '#btnClearUnpaid', function () {
            view.clearUnpaid();
        });

        // 處理
        $('#list_box').on('click', '.confirm-js', function () {
            var id = $(this).attr('data-id'),
                walletIsLock = $(this).attr('data-walletislock'),
                userId = $(this).attr('data-userid');
            view.renderConfirmHtml(id, walletIsLock, userId);
            myModal.showModal('#dialog');
        });

        // 可再次通知
        $('#list_box').on('click', '.unlockNotify-js', function () {
            var id = $(this).attr('data-id');
            view.unlockNotify(id);
        });

        //處理視窗的確定按鈕
        $('#dialog').on('click', '.doUpdate-js', function () {
            var id = $(this).attr('data-id');
            view.update(id);
            myModal.hideModal();
        });

        // 錢包狀態：切換 鎖定/解鎖 時，要更新錢包狀態
        $('.myModal').on('change', '[name="walletIsLock"]', function () {
            view.updateWalletLockStatus();
        });

    },
    allowGet: function (dom) {
        $(dom).attr('data-allowGet', false);
        setTimeout(function () {
            $(dom).attr('data-allowGet', true);
        }, 1000);
    },
    paneHeight: function () {
        $('#paneWrap').height($(window).height() - 250);
    },
    multiSelect: function (event) {

        var selectIds = [];

        if (event.shiftKey) {


            $('.clearChk-js').change(function () {

                var id = $(this).attr('data-id'),
                    isChecked = ($(this).prop('checked') == true);

                if (isChecked) {
                    if (selectIds.length < 2) {
                        selectIds.push(id);
                    }

                    if (selectIds.length >= 2) {
                        selectIds = selectIds.sort();

                        var id1 = parseInt(selectIds[0]);
                        var id2 = parseInt(selectIds[1]);

                        $('.clearChk-js').each(function () {
                            var _id = parseInt($(this).attr('data-id'));

                            if (_id >= id1 && _id <= id2) {
                                $('#chk_' + _id).prop('checked', true);
                            }

                        });

                        id1 = null;
                        id2 = null;
                        selectIds.length = 0;

                    }
                }
            });
        } else {
            selectIds.length = 0;
        }

        selectIds.length = 0;

    },
    renderTabAndPanelHtml: function (type, dom, typeDepositId) {

        var tab = type;

        var html = '';

        // CONTENT -------
        for (var i = 0; i < tab.length; i++) {
            html +=
                '<div class="mui-tabs__pane' + ((i == 0) ? ' mui--is-active' : '') + ' editorWrapper" id="pane_' + tab[i].id + '">' +
                    '<table class="mui-table">' +
                        '<thead>' +
                            '<tr>' +
                                '<th>' + lang.NOTICE_LIST_COL_UPPER_USERNAME + '</th>' +
                                '<th>' + lang.NOTICE_LIST_COL_USERNAME + '</th>' +
                                '<th>' + lang.NOTICE_LIST_COL_CREATE_TIME + '</th>' +
                                '<th>' + lang.NOTICE_LIST_COL_ORDER_ID + '</th>' +
                                '<th class="mui--text-right type">' + lang.NOTICE_LIST_COL_TYPE + '</th> ' +
                                '<th class="mui--text-right amount">' + lang.NOTICE_LIST_COL_AMOUNT + '</th> ' +
                                '<th class="isPaid mui--text-center">' + lang.NOTICE_LIST_COL_IS_PAID + '</th> ' +
                                '<th>' + lang.NOTICE_LIST_COL_FROM + ' <i class="icon-right"></i> ' + lang.NOTICE_LIST_COL_TO + '</th> ' +
                                '<th>' + lang.NOTICE_LIST_COL_ACCOUNT + '</th> ' +
                                '<th>' + lang.NOTICE_LIST_COL_DESCRIPTION + '</th>' +
                                '<th>' + lang.NOTICE_LIST_COL_VIEWER_TIME + '</th>' +
                                '<th>' + lang.NOTICE_LIST_COL_MANAGE + '</th>' +
                                '<th class="chk">-</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '</tbody>' +
                    '</table>' +
                '</div>';
        }

        $(dom).html(html);
    },
    rowHtml: function (data, id, onlyTd) {
        var d = data,
            vf = view.field;

        var typeId = d[vf.type];

        var html = '';

        //if (onlyTd == undefined || onlyTd == false) {
        //    html += '<tr data-id="' + d[vf.id] + '" data-type="' + typeId + '"' + (typeId == typeDepositId ? ' data-is-paid="' + d[vf.isPaid] + '"' : '') + ' >';
        //}
        if (!onlyTd ) {
            html += '<tr data-id="' + d[vf.id] + '" data-type="' + typeId + '"' + (typeId == typeDepositId ? ' data-is-paid="' + d[vf.isPaid] + '"' : '') + ' >';
        }

        html +=
                '<td class="upperUsername">' + d[vf.upperUsername] + '</td>' +
                '<td class="username">' + d[vf.username] + '</td>' +
                '<td class="time">' + d[vf.submitTime] + '</td>' +
                '<td class="time">' + d[vf.id] + '</td>' +
                '<td class="mui--text-right type">' + searchView.searchText(typeId, type) + '</td>' +
                '<td class="mui--text-right amount">' + thousandsView.formatNumber(d[vf.amount]) + '</td>' +
                '<td class="isPaid mui--text-center">' +
                view.renderIsPaidStatusHtml(d[vf.isPaid]) +
                '</td>' +
                '<td class="flow">' + searchView.searchText(d[vf.sFrom], walletTypes) + '<i class="icon-right"></i>' + searchView.searchText(d[vf.sTo], walletTypes) + '</td>' +
                '<td class="account">' + d[vf.accountId] + '</td>' +
                '<td class="content">' + d[vf.content] + '</td>' +
                '<td class="blue">' + d[vf.viewer] + '<br/>' + d[vf.viewDateTime] + '</td>' +
                '<td>' +
                    '<div>' +
                        '<div id="submit" data-id="' + d[vf.id] + '" data-userId="' + d[vf.userId] + '" data-walletislock="' + d[vf.walletIsLock] + '" class="mui-btn mui-btn--primary mui-btn--small confirm-js inline" data-disabled="false">' + lang.NOTICE_LIST_COL_MANAGE + '</div>' +
                    '</div>' +
                '</td>' +
                '<td class="chk">' +
                    view.renderInputTypeHtml(typeId, d[vf.isPaid], d[vf.id]) +
                '</td>';

        //if (onlyTd == undefined || onlyTd == false) {
        //    html += '</tr>';;
        //}

        if (!onlyTd) {
            html += '</tr>';

            console.log(id, data);
        }

        //$('#pane_' + typeId + ' tbody').append(html);
        //view.showPaidOrUnpaid();

        return html;

    },
    renderInputTypeHtml: function (typeId, isPaid, id) {
        if (typeId == typeDepositId) {
            if (isPaid == true) {
                return '<button class="mui-btn mui-btn--primary mui-btn--small unlockNotify-js" data-id="' + id + '">' + lang.NOTICE_LIST_MNG_BTN_RENOTICE + '</button>'
            }
            if (isPaid == false) {
                return '<input type="checkbox" id="chk_' + id + '" data-id="' + id + '" class="clearChk clearChk-js">';
            }
        }
        else {
            return '';
        }
    },
    renderIsPaidStatusHtml: function (isPaid) {
        if (isPaid == true) {
            return '<i class="icon-ok-circled"></i>';
        }
        if (isPaid == false) {
            return '--';
        }
    },
    setOldReference: function (data) {
        var oldTemp = {};

        for (key in data) {
            var guid = data[key][view.field.id];
            oldTemp[guid] = data[key];
        }

        view.oldTemp = oldTemp;
    },
    getOldReference: function () {
        //var oldTemp = {};
        //$('#list_box tr[data-id]').each(function () {
        //    var guid = $(this).attr('data-id');
        //    oldTemp[guid] = $(this);
        //});

        //console.log('oldTemp', view.oldTemp);
        return view.oldTemp;
    },
    getNewReference: function (data) {
        var newTemp = {};
        for (var i = 0; i < data.length; i++) {
            var guid = data[i][view.field.id];
            newTemp[guid] = data[i];
        }
        return newTemp;
    },
    compareDataHandler: function (newTemp, oldTemp) {

        // 有新資料 => 加上
        for (var key in newTemp) {
            if (oldTemp[key] === undefined) {
                var appendHtml = view.rowHtml(newTemp[key], key);
                $('#pane_' + newTemp[key][view.field.type] + ' tbody').append(appendHtml);

                view.playSoundNewNotice(newTemp[key]);
            }
        }

        // 已存在資料，儲值有通知繳費 (通知已繳費狀態變更) => data-is-paid="true"
        for (var key in oldTemp) {
            if (newTemp[key] !== undefined && newTemp[key][view.field.isPaid] !== oldTemp[key][view.field.isPaid]) {
                var updateHtml = view.rowHtml(newTemp[key], key, true);
                $('tr[data-id="' + key + '"]').attr('data-is-paid', newTemp[key][view.field.isPaid]).html(updateHtml);

                view.playSoundNewNotice(newTemp[key]);
            }
        }

        //有舊資料 => 移除
        for (var key in oldTemp) {
            if (newTemp[key] === undefined) {
                delete oldTemp[key];
                $('tr[data-id="' + key + '"]').remove();
            }
        }
    },
    // 計算筆數(儲值或出售)，筆數若為空則提示無資料，若不為空則顯示清單
    getNoticeTotal: function (type) {

        var numPaid = $('#pane_1 tbody tr[data-is-paid="true"]').size();
        if (numPaid > 0) {
            $('#num_deposit_paid').text(numPaid);
        }
        else {
            $('#num_deposit_paid').text('');
        }

        var numUnpaid = $('#pane_1 tbody tr[data-is-paid="false"]').size();
        if (numUnpaid > 0) {
            $('#num_deposit_unpaid').text(numUnpaid);
        }
        else {
            $('#num_deposit_unpaid').text('');
        }

        var numWithdraw = $('#pane_2 tbody tr').size();
        if (numWithdraw > 0) {
            $('#num_withdraw').text(numWithdraw);
        }
        else {
            $('#num_withdraw').text('');
        }

    },
    //查看:已通知繳費or未通知繳費
    showPaidOrUnpaid: function () {
        var viewPaid = ($('#isPaid_true').prop('checked') == true);
        var viewUnpaid = ($('#isPaid_false').prop('checked') == true);

        if (viewPaid == true) {
            $('#pane_1 tr[data-is-paid="true"]').removeClass('hidden').addClass('show');
        } else {
            $('#pane_1 tr[data-is-paid="true"]').addClass('hidden').removeClass('show');

        }

        if (viewUnpaid == true) {
            $('#pane_1 tr[data-is-paid="false"]').removeClass('hidden').addClass('show');
        } else {
            $('#pane_1 tr[data-is-paid="false"]').addClass('hidden').removeClass('show');
        }
    },
    countdownThenUpdate: function () {

        var timerStep = function () {
            view.sec--;
            if (view.sec > 0) {
                $('.getData-js').html(view.sec);
            }

            if (view.sec == 0) {
                if (view.isGettingData == false) {
                    view.getQueryResult();
                }
                view.continuePlayNoticeSound();
            }
            roulte.timer.push(window.setTimeout(timerStep, 1000));
        }

        if (!view.isGettingData) {
            timerStep();
        }
    },
    continuePlayNoticeSound: function () {
        var isTipDepositIsPaid = $('#chk_loopTipDeposit').prop('checked') == true;
        var isTipWithdraw = $('#chk_loopTipWithdraw').prop('checked') == true;
        var hasIsPaid = $('[data-type="1"][data-is-paid="true"]').size() > 0;
        var hasWithdraw = $('[data-type="2"]').size() > 0;

        if (isTipDepositIsPaid && hasIsPaid) {
            var sound1 = document.getElementById('soundDeposit');
            sound1.play();
        }
        if (isTipWithdraw && hasWithdraw) {
            var sound2 = document.getElementById('soundWithdraw');
            sound2.play();
        }
    },
    playSoundNewNotice: function (data) {

        var sound1 = document.getElementById('soundDeposit');
        var sound2 = document.getElementById('soundWithdraw');

        var isTipDeposit = ($('#chk_noticeSoundDeposit').prop('checked') == true);
        var isTipWithdraw = ($('#chk_noticeSoundWithdraw').prop('checked') == true);

        //若有儲值單 + 開啟儲值音效
        if (data[view.field.type] == typeDepositId && isTipDeposit == true) {
            console.log(data[view.field.type], typeDepositId, isTipDeposit)
            sound1.play();
        }
        //若有出售單 + 開啟出售音效
        if (data[view.field.type] == typeWithdrawId && isTipWithdraw == true) {

            console.log(data[view.field.type], typeWithdrawId, isTipWithdraw)
            sound2.play();
        }

    },
    renderConfirmHtml: function (id, walletIsLock, userId) {

        var $this = $('tr[data-id="' + id + '"]'),
            _username = $this.find('.username').text(),
            _submitTime = $this.find('.time').text(),
            _type = $this.find('.type').text(),
            _flow = $this.find('.flow').html(),
            _amount = $this.find('.amount').text(),
            _isPaid = $this.find('.isPaid').html(),
            _account = $this.find('.account').text(),
            _content = $this.find('.content').html(),
            _memo = $this.find('.memo').val();

        var html =
        '<table class="dialogTable fillForm" data-id="' + id + '" data-userid="' + userId + '">' +
            '<tbody>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_USERNAME + '</th>' +
                '<th>' + _username + '</th>' +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_CREATE_TIME + '</th>' +
                '<th>' + _submitTime + '</th>' +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_TYPE + '</th>' +
                '<th>' + _type +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_FROM + '<i class="icon-right"></i>' + lang.NOTICE_LIST_COL_TO + '</th>' +
                '<th>' + _flow +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_AMOUNT + '</th>' +
                '<th>' + _amount +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_IS_PAID + '</th>' +
                '<th class="isPaid">' + _isPaid +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_ACCOUNT + '</th>' +
                '<th>' + _account +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.NOTICE_LIST_COL_DESCRIPTION + '</th>' +
                '<th>' + _content + '</th>' +
            '</tr>' +
            '<tr class="rowTitle">' +
                '<th>' + lang.WALLET_STATUS_MNG_TITLE + '</th>' +
                '<td>' +
                    '<div id="walletIsLock" class="inline noSelect">' +
                        // 鎖定
                        '<input type="radio" name="walletIsLock" id="walletIsLock_true" value="true" class="filterForm" ' + ((walletIsLock == 'true') ? 'checked' : '') + '>' +
                        '<label for="walletIsLock_true" class="quickDateItem"><i class="icon-lock-1"></i> ' + lang.WALLET_STATUS_MNG_LOCK_TO_MANAGE + '</label>' +
                        // 解除
                        '<input type="radio" name="walletIsLock" id="walletIsLock_false" value="false" class="filterForm"   ' + ((walletIsLock == 'false') ? 'checked' : '') + '>' +
                        '<label for="walletIsLock_false" class="quickDateItem"><i class="icon-lock-open-1"></i> ' + lang.WALLET_STATUS_MNG_UNLOCK + '</label>' +
                    '</div>' +
                '</td>' +
            '</tr>' +
            '</tbody>' +
            '<tbody id="closeBlock">' +
                '<tr>' +
                    '<td></td>' +
                    '<td class="textRight">' +
                        '<div class="mui-btn mui-btn--default mui-btn--small modalClose-js">' + lang.NOTICE_LIST_MNG_CLOSE + '</div>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
            '<tbody id="checkManage">' +

            '</tbody>' +
        '</table>';
        $('#dialog .myModalContent').html(html);

        view.checkWalletLockStatus(walletIsLock, id);

    },
    // 更新錢包狀態-鎖定/解除
    updateWalletLockStatus: function () {

        var id = $('.myModal .fillForm').attr('data-id'),
            userId = $('.myModal .fillForm').attr('data-userid'),
            walletIsLock = $('.myModal [name="walletIsLock"]:checked').val();
        var form = {
            'action': 'walletLock',
            'id': userId,
            'walletIsLock': walletIsLock
        }

        model_global_global.ajaxLoading(true);
        $.post(
            '/pointControl/notice/notice_edit',
            JSON.stringify(form),
            function (res) {
                model_global_global.ajaxLoading(false);
                view.checkWalletLockStatus(walletIsLock, id);
                //更新列表(錢包鎖定狀態)
                $('.confirm-js[data-userid="' + userId + '"]').attr('data-walletislock', walletIsLock);
            }
        )
    },
    // 判斷當錢包鎖定時，才出現處理操作 UI
    checkWalletLockStatus: function (walletIsLock, id) {

        // 若錢包鎖定
        if (walletIsLock == 'true') {
            var html =
            '<tr>' +
                '<th><span class="blue">' + lang.NOTICE_LIST_MNG_LABEL_MEMO + '</span></th>' +
                '<th class="blue">' +
                    '<input type="text" name="memo" class="memo inline" placeholder="' + lang.NOTICE_LIST_MNG_PLACEHOLDER_MEMO + '">' +
                '</th>' +
            '</tr>' +
            '<tr>' +
                '<th><span class="blue">' + lang.NOTICE_LIST_MNG_LABEL_STATUS + '</span></th>' +
                '<th id="transStatus">' +
                '</th>' +
            '</tr>' +
            '<tr>' +
                '<td></td>' +
                '<td>' +
                    '<div class="mui-btn mui-btn--primary doUpdate-js" data-id="' + id + '">' + lang.NOTICE_LIST_MNG_SUBMIT + '</div>' +
                    '<div class="mui-btn mui-btn--default modalClose-js mui--pull-right">' + lang.NOTICE_LIST_MNG_CLOSE + '</div>' +
                '</td>' +
            '</tr>';
            $('#closeBlock').hide();
            $('#checkManage').html(html).show();

            var newStatus = dataHandler.excludeData_newData(transStatus, transStatusExclude);

            var transTypeHtml = radioBtnListView.renderHtml('transStatus', newStatus, 2, false);
            $('#transStatus').html(transTypeHtml);
        }
            // 若錢包解除鎖定
        else {
            $('#closeBlock').show();
            $('#checkManage').html('').hide();
        }
    },
    getQueryResult: function (sec) {

        var form = {
            'action': 'list'
        }
        view.isGettingData = true;
        $('.getData-js').html('<div class="icon icon-arrows-ccw spinner bigger"></div>');
        $.post(
            '/pointControl/notice/notice_list',
            JSON.stringify(form),
            function (res) {
                view.sec = countdownSec + 1;

                view.isGettingData = false;

                if (view.isFirstTime) {
                    view.isFirstTime = false;
                    console.log('countdownThenUpdate');
                    view.countdownThenUpdate();
                }

                res = JSON.parse(res);

                var oldTemp = view.getOldReference();
                var newTemp = view.getNewReference(res.d);

                view.compareDataHandler(newTemp, oldTemp);

                view.showPaidOrUnpaid();
                view.getNoticeTotal(type);

                view.setOldReference(res.d);

            }
        )
    },
    //處理
    update: function (id) {
        var form = {
            'action': 'edit',
            'id': id,
            'memo': $('[name="memo"]').val(),
            'status': $('[name="transStatus"]:checked').val()
        }
        //console.log(form)
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/notice/notice_edit',
            JSON.stringify(form),
            function (res) {

                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(res);
                if (lang['key'] !== undefined) {

                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }
                if (lang['key'] == 'success') { $('tr[data-id="' + id + '"]').remove(); }

                view.getNoticeTotal();
            }
        )
    },
    //清理未繳單
    clearUnpaid: function () {

        var ids = [];
        $('.clearChk:checked').each(function () {
            var thisId = $(this).attr('data-id');
            ids.push(thisId);
        })

        var form = {
            'action': 'clearUnpaid',
            'ids': ids.join()
        }
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/notice/notice_edit',
            JSON.stringify(form),
            function (res) {

                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(res);
                model_global_global.showNotice(lang['value']);

                view.getQueryResult();
            }
        )
    },
    //可再次通知
    unlockNotify: function (id) {
        var form = {
            'action': 'unlockNotify',
            'id': id
        }
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/notice/notice_edit',
            JSON.stringify(form),
            function (res) {

                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(res);
                model_global_global.showNotice(lang['value']);

                // 更新該筆
                $('#list_box tr[data-id="' + id + '"]').attr('data-is-paid', 'false');
                var inputHtml = view.renderInputTypeHtml(typeDepositId, false, id);
                $('#list_box tr[data-id="' + id + '"] .chk').html(inputHtml);
                var ispaidStatusHtml = view.renderIsPaidStatusHtml(false);
                $('#list_box tr[data-id="' + id + '"] .isPaid').html(ispaidStatusHtml);

                //更新 tab & pane list , 重算 total
                view.showPaidOrUnpaid();
                view.getNoticeTotal();
            }
        )
    }

};

$(function () {
    view.init();
});
