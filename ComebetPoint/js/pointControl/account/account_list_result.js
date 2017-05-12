var viewAccountList = {
    field: {
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
        viewAccountList.bindEvent();
    },
    bindEvent: function () {

        // 分站標題展收
        $('#list_box').on('click', '.itemTitle-js', function () {
            $(this).parents('.item').toggleClass('isOpen');
        });

        // 帳戶編輯
        $('#list_box').on('click', '.editItem-js', function () {
            var id = $(this).attr('data-accountid');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/account/account_edit?id=' + id;
            window.open(url, '_blank');
        });

        // 帳戶刪除: 顯示對話框及內容
        $('#list_box').on('click', '.deleteItem-js', function () {
            var accountId = $(this).attr('data-accountId'),
                companyId = $(this).attr('data-companyId'),
                accountName = $(this).parents('tr').find('.acoountName').text(),
                minusVal = $(this).attr('data-amount');

            viewAccountList.renderDeleteAccountConfirmHtml(accountId, accountName, companyId, minusVal);
            myModal.showModal('#dialogDelete');

        });
        // 帳戶刪除: 確定執行
        $('.myModalContent').on('click', '.doDeleteAccount-js', function () {

            var accountId = $(this).parents('.dialogTable').attr('data-account-id'),
                companyId = $(this).parents('.dialogTable').attr('data-company-id'),
                accountName = $(this).parents('.dialogTable').attr('data-account-name'),
                minusVal = $(this).parents('.dialogTable').attr('data-minus-val');

            viewAccountList.deleteAccountItem(accountId, companyId, accountName);
            viewAccountList.computeSubtotalAndTotalAfterDelete(minusVal, companyId);
            myModal.hideModal(); //關閉modal
        });
    },
    renderResultHtml: function ( originalData, data, dom) {

        var total = 0;
        for (key in originalData) {
            total = total + parseInt(originalData[key][viewAccountList.field.amount])
        }
        
        var html = '';

        if (data.length == 0) {
            html = viewAccountList.renderEmptyDataHtml();

        } else {

            html +=
            '<div class="totalDiv">' +
                lang.ACCOUNT_LIST_CALC_ESTIMATED_AMOUNT_TOTAL + '<span id="total" class="total" data-total="' + total + '">' + thousandsView.formatNumber(total) + '</span>' +
            '</div>';

            for (i = 0; i < data.length; i++) {
                for (key in data[i]) {
                    var d = data[i][key][0],
                        vf = viewAccountList.field;

                    var thisCompanyId = d[vf.companyId];

                    var subTotal = viewAccountList.computeSubtotalValue(data[i][key]);

                    html +=

                        '<div class="item ' +   + '" id="group_' + thisCompanyId + '">' +

                            '<div class="itemTitle itemTitle-js">' +
                                '<i class="icon-down-open ic-down"></i>' +
                                '<i class="icon-up-open ic-up"></i>' +
                                searchView.searchCompanyName(d[vf.companyId], companys) +
                            '</div>' +

                            '<table class="tableView mui-table">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_ACCOUNT_GROUP + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_ACCOUNT_NAME + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_ACCOUNT_TYPE + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_ACCOUNT_INFO + '</th>' +
                                        '<th class="textCenter">' + lang.ACCOUNT_LIST_COL_SATUS + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_ESTIMATED_AMOUNT + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_MEMO + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_CREATE_TIME + '</th>' +
                                        '<th class="textCenter">' + lang.ACCOUNT_LIST_COL_MANAGE + '</th>' +
                                        '<th>' + lang.ACCOUNT_LIST_COL_MODIFT_TIME + '</th>' +
                                        '<th></th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    viewAccountList.renderAccountListHtml(data[i], key) +
                                '</tbody>' +
                                '<tfoot>' +
                                    '<tr class="subtotal inherit">' +
                                        '<td>' + lang.ACCOUNT_LIST_CALC_COMPANY_AMOUNT_SUBTOTAL + '</td>' +
                                        '<td colspan="4"></td>' +
                                        '<td id="subtotal_' + thisCompanyId + '" data-subtotal="' + subTotal + '">' + thousandsView.formatNumber(subTotal) + '</td>' +
                                        '<td colspan="5"></td>' +
                                    '</tr>' +
                                '</tfoot>' +
                            '</table>' +

                        '</div>';
                }
            }
        }

        $(dom).html(html);
    },
    renderAccountListHtml: function (data2, key) {

        var row = '';
        for (i2 = 0; i2 < data2[key].length; i2++) {
            var d = data2[key][i2],
                vf = viewAccountList.field;

            row +=
                '<tr id="item_' + d[vf.accountId] + '" data-alive="true" data-amount="' + d[vf.amount] + '">' +
                    '<td class="th">' + d[vf.accountGroupId] + '</td>' +
                    '<td class="acoountName lightBlue bold">' + d[vf.accountName] + '</td>' +
                    '<td>' + searchView.searchText(d[vf.cashFlowTypeId], cashFlowType) + '</td>' +
                    '<td>' +
                        (d[vf.cashFlowTypeId] == accountTypeWechat ?
                            '<img class="qrcode" src="' + d[vf.accountInfo] +'" />'
                            :
                            d[vf.accountInfo] + d[vf.cashFlowTypeId]
                        ) +
                    '</td>' +
                    '<td class="textCenter">' +
                        status() +
                    '</td>' +
                    '<td data-amount="' + d[vf.amount] + '">' + thousandsView.formatNumber(d[vf.amount]) + '</td>' +
                    '<td>' + d[vf.memo] + '</td>' +
                    '<td>' +
                        d[vf.creator] +
                        '<br />' +
                        '<small>' + d[vf.createDateTime] + '</small>' +
                    '</td>' +
                    '<td class="textCenter">' +
                        '<div class="mui-btn mui-btn--raised mui-btn--primary mui-btn--small editItem-js"  data-accountId="' + d[vf.accountId] + '">' +
                            '<span class="icon icon-pencil"></span>' +
                        '</div>' +
                    '</td>' +
                    '<td>' +
                        d[vf.lastEditor] +
                        '<br />' +
                        '<small>' + d[vf.lastEditDateTime] + '</small>' +
                    '</td>' +
                    '<td>' +
                        banBtn() +
                    '</td>' +
                '</tr>';

            function status() {
                if (data2[key][i2][viewAccountList.field.status] == 1) {
                    return '<i class="icon-ok-circled green bigger"></i>';
                } else {
                    return '<i class="icon-block-1 red bigger"></i>';
                }
            }

            function banBtn() {
                if (data2[key][i2][viewAccountList.field.status] == 1) {
                    return '<div class="mui-btn mui-btn--raised mui-btn--danger mui-btn--small btnDelete deleteItem-js inline" data-accountId="' + data2[key][i2][viewAccountList.field.accountId] + '" data-companyId="' + data2[key][i2][viewAccountList.field.companyId] + '" data-amount="' + data2[key][i2][viewAccountList.field.amount] + '">' +
                            '<i class="icon-block-1"></i>' +
                        '</div>';
                } else {
                    return  '' ;
                }
            }
        }
        return row;
    },
    renderDeleteAccountConfirmHtml: function (accountId, accountName, companyId, minusVal) {

        var html =
        '<table class="dialogTable" data-account-id="' + accountId + '" data-account-name="' + accountName + '" data-company-id="' + companyId + '" data-minus-val="' + minusVal + '">' +
            '<tr class="rowTitle">' +
                '<th><span class="red">' + lang.ACCOUNT_LIST_STATUS_MNG_LABEL + '</span></th>' +
                '<th></th>' +
                '<th class="red">' + accountName + '</th>' +
            '</tr>' +
            '<tr>' +
                '<td></td>' +
                '<td></td>' +
                '<td>' +
                    '<div class="mui-btn mui-btn--danger doDeleteAccount-js">' + lang.ACCOUNT_LIST_STATUS_MNG_BTN_DISABLE + '</div>' +
                    '<div class="mui-btn mui-btn--default modalClose-js">' + lang.ACCOUNT_LIST_STATUS_MNG_BTN_CANCEL + '</div>' +
                '</td>' +
            '</tr>' +
        '</table>';

        $('#dialogDelete .myModalContent').html(html);
    },
    computeSubtotalValue: function (data3) {
        var num = 0;
        for (key3 in data3) {
            num += parseFloat(data3[key3][viewAccountList.field.amount]);
        }
        return num;
    },
    computeSubtotalAndTotalAfterDelete: function (minusVal,companyId) {
        var _total = parseFloat($('#total').attr('data-total')) - minusVal,
            _subtotal = parseFloat($('#subtotal_' + companyId).attr('data-subtotal')) - minusVal;

        $('#total').text(thousandsView.formatNumber(_total)).attr('data-total', _total);
        $('#subtotal_' + companyId).text(thousandsView.formatNumber(_subtotal)).attr('data-subtotal', _subtotal);

        console.log(minusVal);
    },
    renderEmptyDataHtml: function () {
        var html =
            '<div class="emptyData">' +
                '<i class="icon-comment-1"></i>' + lang.ACCOUNT_LIST_EMPTY_DATA +
            '</div>';
        return html;
    },
    deleteAccountItem: function (accountId, companyId, accountName) {
        var form = {
            'action': 'delete',
            'id': accountId
        }
        $.post(
            '/pointControl/account/account_delete',
            JSON.stringify(form),
            function (data) {

                var lang = model_global_global.getLangText(data);
                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                $('#submit').trigger('click');
            }
        )
    }
}

$(function () {
    viewAccountList.init();
});