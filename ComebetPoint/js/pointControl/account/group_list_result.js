var viewGroupList = {
    field: {
        'id': 'a',
        'name': 'b',
        'type': 'c',
        'minScore': 'e',
        'maxScore': 'd',
        'memo': 'f',
        'playMode': 'g',
        'accounts':'h'	
    },
    fieldAccount: {
        'companyId': 'a',
        'accountId': 'b',
        'accountGroupId': 'c',
        'accountName': 'd',
        'cashFlowTypeId': 'e',
        'accountInfo': 'f',
        'status': 'g',
        'amount': 'h',
        'lastEditor': 'i',
        'lastEditDateTime': 'j',
        'creator': 'k',
        'createDateTime': 'l',
        'memo': 'm'
    },
    init: function () {
        viewGroupList.bindEvent();
    },
    bindEvent: function () {

        // 檢視帳戶
        $('#list_box').on('click', '.toggleAccountList-js', function () {
            var $groupDom = $(this).parents('.groupRow'),
                id = $groupDom.attr('data-group'),
                companyId = $('[name="companyId"]').val(),
                accountListNotExit = ($('.accountsRow[data-group="' + id + '"] table').length == 0);

            $groupDom.find('.icon-toggle').toggle();
            $groupDom.toggleClass('detail_open');
            $('[data-accounts="' + id + '"]').toggleClass('hidden');

            if (accountListNotExit) {
                viewGroupList.getAccountsResult(id, companyId);
            }
        });

        //檢視無效帳戶
        $('#list_box').on('click', '.toggleInactiveAccountList-js', function () {

            var $groupDom = $(this).parents('.groupRow'),
                accountListIsClose = ($('.accountsRow[data-group="inactive"]').hasClass('hidden'));

            $groupDom.find('.icon-toggle').toggle();
            $groupDom.toggleClass('detail_open');
            $('[data-accounts="inactive"]').toggleClass('hidden');

            if (accountListIsClose) {
                viewGroupList.getInactiveAccountsResult();
            }

        });

        // 群組編輯
        $('#list_box').on('click', '.editGroupItem-js', function () {
            var groupId = $(this).attr('data-group-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/account/group_edit?id=' + groupId;
            window.open(url, '_blank');
        });

        // 在列表上執行刪除群組 (進行檢查)
        $('#list_box').on('click', '.deleteGroupItem-js', function () {
            var groupId = $(this).attr('data-group-id'),
                grouptName = $(this).attr('data-group-name');
            viewGroupList.checkDeleteGroupOrMoveAccounts(groupId, grouptName); //刪除確認modal
            myModal.showModal('#dialogDelete');           
        });

        // 移動帳戶
        $('.myModalContent').on('click', '.moveAccounts-js', function () {
            var accountId = $(this).attr('data-account-id'),
                groupId = $('[name="move"][data-account-id="' + accountId + '"]').val();
            viewGroupList.moveAccountToOtherGroup(accountId, groupId); //移動帳戶
        });

        // 移動帳戶的對話框完成按鈕（更新列表）
        $('.myModalContent').on('click', '.updateList-js', function () {
            myModal.hideModal(); //關閉modal
            $('#submit').trigger('click');
        });

        $('.myModalContent').on('change', '[name="move"]', function () {
            var accountId = $(this).attr('data-account-id');
            $('#moveControl_' + accountId).html('<div class="btnMoveAccounts moveAccounts-js" data-account-id="' + accountId + '">移動</div>');
        });

        // 群組刪除
        $('.myModalContent').on('click', '.deleteGroup-js', function () {
            var groupId = $('#accoutMove').attr('data-group-id'),
                grouptName = $('#accoutMove').attr('data-group-name');
            viewGroupList.deleteGroupItem(groupId, grouptName); //刪除群組
            myModal.hideModal(); //關閉modal
        });

        // 群組輪播管理
        $('#list_box').on('click', '.editPlayMode-js', function () {
            var groupId = $(this).attr('data-group-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/account/group_play_mode?id=' + groupId;
            window.open(url, '_blank', 'width=550,height=380');
        });

        //-------------
        // 帳戶新增
        $('#list_box').on('click', '.addAccount-js', function () {
            var groupId = $(this).attr('data-group-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/account/account_add?groupId=' + groupId;
            window.open(url, '_blank');
        });

        // 帳戶編輯
        $('#list_box').on('click', '.editAccountItem-js', function () {
            var accountId = $(this).attr('data-account-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/account/account_edit?id=' + accountId;
            window.open(url, '_blank');
        });

        // 帳戶刪除: 顯示對話框及內容
        $('#list_box').on('click', '.deleteAccountItem-js', function () {
            var accountId = $(this).attr('data-account-id'),
                accountName = $(this).attr('data-account-name'),
                groupId = $(this).parents('.accountsRow').attr('data-group');

            viewGroupList.renderDialogDeleteAccountHtml(accountId, accountName, groupId); //刪除確認modal
            myModal.showModal('#dialogDelete');
        });
        // 帳戶刪除: 確定執行
        $('.myModalContent').on('click', '.doDeleteAccount-js', function () {
            var accountId = $(this).parents('.dialogTable').attr('data-account-id'),
                accountName = $(this).parents('.dialogTable').attr('data-account-name'),
                groupId = $(this).parents('.dialogTable').attr('data-group-id');
            viewGroupList.deleteAccountItem(accountId, accountName, groupId);
            myModal.hideModal(); //關閉modal
        });


        //---------------
        // 前往新增群組
        $('.myModalContent').on('click', '.goAddGroup-js', function () {
            location.href = location.protocol + '//' + location.host + '/pointControl/index#/pointControl/account/group_add';
        });
    },
    renderResultHtml: function (data) {
        
        var html = '';
        if (data.length == 0) {
            html = viewGroupList.renderEmptyDataHtml();
        } else {
            for (i = 0; i < data.length; i++) {
                html =
                '<table class="mui-table">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>' + lang.GROUP_LIST_COL_GROUP_NAME + '</th>' +
                            '<th>' + lang.GROUP_LIST_COL_GROUP_TYPE + '</th>' +
                            '<th>' + lang.GROUP_LIST_COL_SCORE + '</th>' +
                            '<th>' + lang.GROUP_LIST_COL_MEMO + '</th>' +
                            '<th>' + lang.GROUP_LIST_COL_PLAY_MODE + '</th>' +
                            //'<th>' + lang.GROUP_LIST_COL_PALY_MODE_MNG + '</th>' +
                            '<th>' + lang.GROUP_LIST_COL_GROUP_ACCOUNTS + '</th>' +
                            '<th>' + lang.GROUP_LIST_COL_MANAGE + '</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                        //有效帳戶群組
                        viewGroupList.renderGroupListHtml(data) +
                        //無效帳戶群組
                        '<tr class="groupRow" data-group="inactive">' +
                            '<td>' +
                                '<a href="#" class="inline toggleInactiveAccountList-js">' +
                                    '<span class="icon icon-angle-right icon-toggle"></span>' +
                                    '<span class="icon icon-angle-down icon-toggle hidden"></span>' +
                                    lang.GROUP_LIST_GROUP_NAME_INACTIVE +
                                '</a>' +
                            '</td>' +
                            '<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>' +
                        '</tr>' +
                        '<tr class="accountsRow hidden" data-accounts="inactive" data-group="inactive"><td colspan="7" class="subWrapper"></td></tr>' +
                    '</tbody>' +
                '</table>';
            }
        }
        $('#list_box').html(html);
    },
    renderGroupListHtml: function (data) {

        var row = '';

        for (i = 0; i < data.length; i++) {
            var d = data[i],
                vf = viewGroupList.field;

            row +=
            '<tr class="groupRow" data-group="' + d[vf.id] + '" data-group-name="' + d[vf.name] + '">' +
                '<td>' +
                    '<a href="#" class="inline toggleAccountList-js" data-id="' + d[vf.id] + '">' +
                        '<span class="icon icon-angle-right icon-toggle"></span>' +
                        '<span class="icon icon-angle-down icon-toggle hidden"></span>' +
                        d[vf.name] +
                    '</a>' +
                '</td>' +
                '<td>' + searchView.searchText(d[vf.type], groupType) + '</td>' +
                '<td>' + d[vf.minScore] + ' - ' + d[vf.maxScore] + '</td>' +
                '<td>' + d[vf.memo] + '</td>' +
                '<td>' +
                    '<span>' + searchView.searchText(d[vf.playMode], playModes) + '</span>' +
                '</td>' +
                '<td>' +
                    '<div class="mui-btn mui-btn--primary mui-btn--flat mui-btn--small toggleAccountList-js">' +
                        '<span class="icon icon-angle-right icon-toggle"></span>' +
                        '<span class="icon icon-angle-down icon-toggle hidden"></span>' +
                        '<span class="account_num">' + d[vf.accounts] + '</span> ' + lang.GROUP_LIST_LABEL_ACCOINTS_NUM +
                    '</div>' +
                    '<div class="mui-btn mui-btn--primary mui-btn--flat mui-btn--small addAccount-js" data-group-id="' + d[vf.id] + '">' +
                        '<span class="icon icon-plus"></span>' +
                        lang.GROUP_LIST_BTN_ADD_ACOUNT +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="mui-btn mui-btn--primary mui-btn--raised mui-btn--small editGroupItem-js" data-group-id="' + d[vf.id] + '">' +
                        '<span class="icon icon-pencil"></span>' +
                    '</div>' +
                    Btns(d[vf.accounts]) +
                '</td>' +
            '</tr>' +
            '<tr class="accountsRow hidden" data-accounts="' + d[vf.id] + '" data-group="' + d[vf.id] + '">' +
                '<td colspan="7" class="subWrapper">' +
                '</td>' +
            '</tr>';

            function Btns(accountsNum) {
                if (accountsNum == 0) {
                    return '<div class="mui-btn mui-btn--raised mui-btn--danger mui-btn--small btnDelete deleteGroupItem-js inline" data-group-id="' + d[vf.id] + '" data-group-name="' + d[vf.name] + '">' +
                        '<span class="icon icon-trash-1"></span>' +
                    '</div>';
                } else {
                    return '<div class="mui-btn mui-btn--raised mui-btn--primary mui-btn--small deleteGroupItem-js inline" data-group-id="' + d[vf.id] + '" data-group-name="' + d[vf.name] + '">' +
                        lang.GROUP_LIST_BTN_MOVE_ACOUNT +
                    '</div>';
                }
            }
        }

        return row;
    },
    renderAccountListHtml: function (dataAccounts, dom, inactive) {

        if (dataAccounts == 0) {
            var html = '<table class="subTable"><tr><td>' + lang.GROUP_LIST_ACCOUNTS_NO_DATA + '</td></tr></table>';
        } else {
            var total = 0;
            var html =
            '<table class="subTable">' +
                '<thead>' +
                '<tr>' +
                    '<th class="status"></th>' +
                    '<th>' + lang.GROUP_LIST_ACCOUNTS_COL_ACCOUNT_NAME + '</th>' +
                    '<th>' + lang.GROUP_LIST_ACCOUNTS_COL_CASH_FLOW_TYPE + '</th>' +
                    '<th>' + lang.GROUP_LIST_ACCOUNTS_COL_ACOUNT_API_KEY + '</th>' +
                    '<th>' + lang.GROUP_LIST_ACCOUNTS_COL_ESTIMATED_AMOUNT + '</th>' +
                    '<th></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                    row() +
                '</tbody>' +
            '</table>';

            function row() {
                var row = '';
                for (var i2 = 0; i2 < dataAccounts.length; i2++) {

                    var d = dataAccounts[i2],
                        vf = viewGroupList.fieldAccount;

                    row +=
                    '<tr data-account-item="' + d[vf.accountId] + '" data-alive="true">' +
                        '<td class="status">' +
                             status(d[vf.status]) +
                        '</td>' +
                        '<td class="getAccountName">' + d[vf.accountName] + '</td>' +
                        '<td>' + searchView.searchText(d[vf.cashFlowTypeId], cashFlowType) + '</td>' +
                        '<td>' +
                            (d[vf.cashFlowTypeId] == accountTypeWechat ?
                                '<img class="qrcode" src="' + d[vf.accountInfo] + '" />'
                                :
                                d[vf.accountInfo]
                            ) +
                        '</td>' +
                        '<td>' + thousandsView.formatNumber(d[vf.amount]) + '</td>' +
                        '<td>' +
                            (
                                //非無效帳戶(=有效帳戶)==>顯示管理按鈕
                                inactive !== true 
                                ? 
                                '<div class="mui-btn mui-btn--flat mui-btn--primary mui-btn--small editAccountItem-js" data-account-id="' + d[vf.accountId] + '">' +
                                    '<span class="icon icon-pencil"></span>' +
                                '</div>' +
                                banBtn(d[vf.status], d[vf.accountId], d[vf.accountName]) 
                                :
                                ''
                            ) +
                        '</td>' +
                    '</tr>';
                    total += parseFloat(d[vf.amount]);
                }
                row += '<tr><td colspan="4" class="textRight subtotal Amount">小計</td><td class="subtotal amount">' + thousandsView.formatNumber(total) + '</td><td></td></tr>'
                return row;
            }

            function status(thisStatus) {
                if (thisStatus == 1) {
                    return '<i class="icon icon-ok-circled green bigger"></i><i class="icon icon-block-1 red bigger hidden"></i>';
                } else {
                    return '<i class="icon icon-ok-circled green bigger hidden"></i><i class="icon icon-block-1 red bigger"></i>';
                }
            }

            function banBtn(thisStatus, accountId, accountName) {
                if (thisStatus == 1) {
                    return '<div class="mui-btn mui-btn--flat mui-btn--small btnDelete deleteAccountItem-js" data-account-id="' + accountId + '" data-account-name="' + accountName + '">' +
                            '<i class="icon-block-1 red"></i>' +
                        '</div>';
                } else {
                    return '';
                }
            }
        }

        $(dom).html(html);
    },
    renderEmptyDataHtml: function () {
        var html =
            '<div class="emptyData">' +
                '<i class="icon-comment-1"></i>' + lang.GROUP_LIST_EMPTY_DATA +
            '</div>';
        return html;
    },
    checkDeleteGroupOrMoveAccounts: function (groupId, groupName) {

        var thisAcoountNum = parseInt($('.groupRow[data-group="' + groupId + '"] .account_num').text()),
            allGroupNum = $('.groupRow').length;

        if (allGroupNum == 1 && thisAcoountNum > 0) {
            // 只剩一個群組, 且群組內仍有帳戶 ==> 不可刪除群組
            viewGroupList.renderDialogCanNotDeleteGroupHtml();

        } else if (thisAcoountNum == 0) {
            // 群組沒有帳戶 ==> 可刪除群組
            viewGroupList.renderDialogDeleteGroupHtml(groupId, groupName);

        } else {
            // 其他情況 ==> 移動帳戶至其他群組,可刪除此群組
            viewGroupList.renderDialogMoveAccountsHtml(groupId, groupName);
        }
    },
    renderDialogCanNotDeleteGroupHtml: function () {
        var html =
                '<div class="textCenter" style="padding: 1em 2em ;color: #F44336;">' +
                    '<i class="icon-attention bigger" style="font-size: 5em;"></i><br/><br/>' +
                    '<strong>' + lang.GROUP_LIST_MNG_TIP_CANT_DELETE_GROUP_1 + '</strong>' +
                    '<hr/><br/>' +
                    '<div class="mui-btn goAddGroup-js">' + lang.GROUP_LIST_MNG_BTN_ADD_GROUP + '</div>' +
                    '<div class="mui-btn modalClose-js">' + lang.GROUP_LIST_MNG_BTN_CLOSE + '</div>' +
                '<div>'
        $('#dialogDelete .myModalContent').html(html);
    },
    renderDialogDeleteGroupHtml: function (groupId, groupName) {

        var html =
            '<table id="accoutMove" class="dialogTable" data-group-id="' + groupId + '" data-group-name="' + groupName + '">' +
                '<tr class="rowTitle">' +
                    '<th><span class="red">' + lang.GROUP_LIST_MNG_LABEL_DELETE_GROUP + '</span></th>' +
                    '<th></th>' +
                    '<th class="red">' + groupName + '</th>' +
                '</tr>' +
                '<tr>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td>' +
                        '<div class="mui-btn mui-btn--danger deleteGroup-js">' + lang.GROUP_LIST_MNG_BTN_DELETE + '</div>' +
                        '<div class="mui-btn mui-btn--default modalClose-js">' + lang.GROUP_LIST_MNG_BTN_CANCEL + '</div>' +
                    '</td>' +
                '</tr>' +
            '</table>';

        $('#dialogDelete .myModalContent').html(html);
    },
    renderDialogMoveAccountsHtml: function (groupId, groupName) {

        // render groupList(下拉選單)
        var groupListOptionHtml = '';
        $('.groupRow').each(function () {
            var getGroupId = $(this).attr('data-group'),
                getGroupName = $(this).attr('data-group-name');
            if (getGroupName !== undefined && getGroupId !== groupId) {
                groupListOptionHtml += '<option value="' + getGroupId + '">' + getGroupName + '</option>';
            }
        });

        // render content
        var html =
        '<div class="myModalBody">' +
            '<table id="accoutMove" class="dialogTable" data-group-id="' + groupId + '" data-group-name="' + groupName + '">' +
                '<thead>' +
                '<tr class="rowTitle">' +
                    '<th>' + lang.GROUP_LIST_MNG_LABEL_ACCOUNT + '</th>' +
                    '<th></th>' +
                    '<th>' + lang.GROUP_LIST_MNG_LABEL_MOVE_ACCOUNT_TO_OTHER_GROUP + '</th>' +
                    '<th></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '</tbody>' +
            '</table>' +
        '</div>' +
        '<hr/>' +
        '<div class="myModalFooter">' +
            '<div class="mui-btn mui-btn--default updateList-js">' + lang.GROUP_LIST_MNG_BTN_UPDATE_LIST + '</div>' +
            '<div class="mui-btn mui-btn--default modalClose-js">' + lang.GROUP_LIST_MNG_BTN_CLOSE + '</div>' +
        '</div>';
        $('#dialogDelete .myModalContent').html(html);

        var form = {
            'action': 'list',
            'companyIds': $('[name="companyId"]').val(),
            'groupId': groupId
        }

        $.post(
            '/pointControl/account/account_list',
            JSON.stringify(form),
            function (res) {

                accounts = JSON.parse(res).d;
                var row = '';
                for (var i = 0; i < accounts.length; i++) {

                    var accStatus = parseInt(accounts[i][viewGroupList.fieldAccount.status]);

                    if (accStatus == 1) { //只顯示有效帳戶
                        row +=
                        '<tr>' +
                            '<td>' + accounts[i][viewGroupList.fieldAccount.accountName] + '</td>' +
                            '<td><i class="icon-right-bold grey"></i></td>' +
                            '<td>' +
                                '<select name="move" data-account-id="' + accounts[i][viewGroupList.fieldAccount.accountId] + '">' +
                                    groupListOptionHtml +
                                '</select>' +
                            '</td>' +
                            '<td id="moveControl_' + accounts[i][viewGroupList.fieldAccount.accountId] + '" class="moveControl">' +
                                '<div class="btnMoveAccounts moveAccounts-js" data-account-id="' + accounts[i][viewGroupList.fieldAccount.accountId] + '">' + lang.GROUP_LIST_MNG_BTN_MOVE_ACCOUNT + '</div>' +
                            '</td>' +
                        '</tr>';
                    }
                }
                $('.myModalContent tbody').html(row);
            }
        )
    },
    renderDialogDeleteAccountHtml: function (accountId, accountName, groupId) {

        var html =
        '<table class="dialogTable" data-account-id="' + accountId + '" data-account-name="' + accountName + '" data-group-id="' + groupId + '">' +
            '<tr class="rowTitle">' +
                '<th><span class="red">' + lang.GROUP_LIST_MNG_LABEL_DISABLE_ACOOUNT + '</span></th>' +
                '<th></th>' +
                '<th class="red">' + accountName + '</th>' +
            '</tr>' +
            '<tr>' +
                '<td></td>' +
                '<td></td>' +
                '<td>' +
                    '<div class="mui-btn mui-btn--danger doDeleteAccount-js">' + lang.GROUP_LIST_MNG_BTN_DISABLE_ACOOUNT + '</div>' +
                    '<div class="mui-btn mui-btn--default modalClose-js">' + lang.GROUP_LIST_MNG_BTN_CANCEL + '</div>' +
                '</td>' +
            '</tr>' +
        '</table>';

        $('#dialogDelete .myModalContent').html(html);
    },
    // 檢視帳戶(有效帳戶)
    getAccountsResult: function (groupId, companyId) {
        var form = {
            'action': 'list',
            'companyIds': companyId,
            'groupId': groupId,
            'status': 1 //1 為有效
        }
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/account/account_list',
            JSON.stringify(form),
            function (res) {
                model_global_global.ajaxLoading(false);
                res = JSON.parse(res);
                viewGroupList.renderAccountListHtml(res.d, '.accountsRow[data-group="' + groupId + '"] td');
            }
        )
    },
    // 檢視無效帳戶
    getInactiveAccountsResult: function () {
        var form = {
            'action': 'list',
            'status': 2 //2 為無效
        }
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/account/account_list',
            JSON.stringify(form),
            function (res) {
                model_global_global.ajaxLoading(false);
                res = JSON.parse(res);
                viewGroupList.renderAccountListHtml(res.d, '.accountsRow[data-group="inactive"] td', true);
            }
        )
    },
    // 執行帳戶移動
    moveAccountToOtherGroup: function (id, groupId) {
        var form = {
            'action': 'edit',
            'id': id,
            'groupId': groupId
        }
        $('#moveControl_' + id).html('<i class="icon-spinner bigger"></i>');
        
        return $.post(
            '/pointControl/account/account_edit',
            JSON.stringify(form),
            function (data) {
                var lang = model_global_global.getLangText(data);
                if (lang['key'] == 'success') {
                    $('#moveControl_' + id).html('<i class="icon icon-ok-circled green bigger"></i>');
                }
            }
        )
    },
    // 刪除群組 ( = 停用 => 狀態無效)
    deleteGroupItem: function (groupId, grouptName) {
        var form = {
            'action': 'delete',            
            'id': groupId
        }
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/account/group_delete',
            JSON.stringify(form),
            function (data) {
                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(data);
                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);
                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                $("#submit").trigger('click'); // 更新列表
                viewGroupList.checkIfEmptyGroupListThenTip();
            }
        )
    },
    // 刪除帳戶 ( = 停用 => 狀態無效)
    deleteAccountItem: function (accountId, accountName, groupId) {
        var form = {
            'action': 'delete',            
            'id': accountId
        }
        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/account/account_delete',
            JSON.stringify(form),
            function (data) {
                model_global_global.ajaxLoading(false);

                // 更新帳戶狀態
                $('[data-account-item="' + accountId + '"] .status .icon').toggleClass('hidden');

                // 訊息
                var lang = model_global_global.getLangText(data);
                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);
                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                //無效帳戶群組,收起
                $('.toggleInactiveAccountList-js').trigger('click');
            }
        )
    },
    checkIfEmptyGroupListThenTip: function () {
        if ($('.groupRow').length == 0) {
            var html = '<tr><td colspan="8" class="textCenter"><br/>' + lang.GROUP_LIST_COL_EMPTY_DATA + '<br/><br/></td></tr>'
            $('#list_box tbody').append(html);
        }
    }
}

$(function () {
    viewGroupList.init();
});