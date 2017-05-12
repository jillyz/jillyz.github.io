var viewOrderHtml = {
    field: {
        "orderId": "a",
        "type": "b",
        "userId": "c",
        "username": "d",
        "nickname": "e",
        "agent": "f",
        "orderFrom": "g",
        "orderTo": "h",
        "transAmount": "i", //交易金額
        "status": "j",
        "createTime": "k",
        "lastModifyTime": "l",
        "lastModifier": "m",
        "memo": "n",
        "description": "o",
        "viewer": "q",
        "viewTime": "p",
        "csBarCode": "r",
        "cashFlowDetailType": "s",
        "cashFlowType": "t", //超商,ATM等
        "cashFlowSupplier": "u", //金流公司
        "cashFlowOrderId": "v", //金流訂單編號
        "bankbookName": "w", //簿子
        "isManualTrans": "x", //是否由後台手動操作
        "isNotify": "y", //會員是否通知已繳款
        "actualAmount": "z", //實際金額
        "prodId": "A",
    },
    fieldTotal: {
        "transAmount": "x",
        "actualAmount": "y"
    },
    init: function () {
        viewOrderHtml.bindEvent();
        pagerViewOne.bindEvent(view['getQueryResult']);
    },
    bindEvent: function () {

        $('#list_box').on('click', '.viewHistory-js', function () {
            var userId = $(this).attr('data-user-id'),
                username = $(this).text();
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/order/query?userId=' + userId + '&username=' + username + '&mode=0';
            window.open(url, '_blank');
        });
    },
    renderResultListHtml: function (data, dom, isOnUserMode) {

        var html = '';
        html +=
            '<table id="listTable" class="tableView mui-table">' +
                '<thead>' +
                    '<tr>' +
                        '<th class="colOrderId">' + lang.ORDER_LIST_COL_OEDER_ID + '</th>' +
                        //((isOnUserMode == true) ? '' : '<th>' + lang.ORDER_LIST_COL_AGENT + '</th>') +
                        (isOnUserMode ? '' : '<th class="colUsername">' + lang.ORDER_LIST_COL_USERNAME + '(' + lang.ORDER_LIST_COL_AGENT + ') /' + lang.ORDER_LIST_COL_CREATE_TIME + '</th>') +
                        //((isOnUserMode == true) ? '' : '<th>' + lang.ORDER_LIST_COL_AGENT + '</th>') +
                        '<th class="colType mui--text-center">' + lang.ORDER_LIST_COL_ORDER_TYPE + '</th>' +
                        '<th class="colFromTo">' + lang.ORDER_LIST_COL_FROM + ' <i class="icon-right"></i> ' + lang.ORDER_LIST_COL_TO + '</th>' +
                        //'<th>' + lang.ORDER_LIST_COL_AMOUNT + '</th>' +
                        '<th class="colAmount mui--text-right">' + lang.ORDER_LIST_COL_AMOUNT_TRANS + '</th>' +
                        '<th class="colAmount mui--text-right">' + lang.ORDER_LIST_COL_AMOUNT_ACTUAL + '</th>' +
                        '<th class="colPayWay">' + lang.ORDER_LIST_COL_PAYMEMT_INFO + '</th>' +
                        '<th class="colAccount">' + lang.ORDER_LIST_COL_BANKBOOK + '/' + lang.ORDER_LIST_COL_DESCRIPTION + '</th>' +
                        '<th class="colStatus mui--text-center">' + lang.ORDER_LIST_COL_SATUS + '</th>' +
                        '<th class="colTime">' + lang.ORDER_LIST_COL_VIEWER_TIME + '</th>' +
                        '<th class="colTime">' + lang.ORDER_LIST_COL_LAST_MODIFIER_TIME + '</th>' +
                        '<th>' + lang.ORDER_LIST_COL_MEMO + '</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    viewOrderHtml.rowHtml(data.d, isOnUserMode) +
                '</tbody>' +
            '</table>';

        $(dom).html(html);
    },
    rowHtml: function (data, isOnUserMode) {
        var html = '';
        for (var i = 0; i < data.length; i++) {

            var d = data[i],
                vf = viewOrderHtml.field,
                _amount = thousandsView.formatNumber(d[vf.transAmount]);

            html +=
                '<tr>' +
                    '<td>' + d[vf.orderId] + '</td>' +
                    (
                        (isOnUserMode == true) ?
                        ''
                        :
                        '<td>' +
                            '<a href="#" class="username viewHistory-js" data-user-id="' + d[vf.userId] + '">' + d[vf.username] + '</a>' +
                            ( d[vf.agent] ? '<span class="gray"> ( ' + d[vf.agent] + ' ) </span>' : '') +
                            '<br/>' + d[vf.createTime] +
                        '</td>'
                    ) +
                    '<td class="mui--text-center">' + searchView.searchText(d[vf.type], type) + '</td>' +
                    '<td>' +
                        searchView.searchText(d[vf.orderFrom], walletTypes) + ' <i class="icon-right"></i> ' + searchView.searchText(d[vf.orderTo], walletTypes) +
                        '<br/>(' + (d[vf.isManualTrans] == true ? lang.ORDER_LIST_LABEL_IS_MANUAL_TRANS_TRUE : lang.ORDER_LIST_LABEL_IS_MANUAL_TRANS_FALSE) + ')' +
                    '</td>' +
                    '<td class="colAmount mui--text-right transBlue bold">' + thousandsView.formatNumber(d[vf.transAmount]) + '</td>' +
                    '<td class="colAmount mui--text-right">' + dataHandler.amountPosNeg(d[vf.actualAmount]) + '</td>' +
                    '<td class="colPayWay">' +
                        payWay(d[vf.bankbookName], d[vf.type]) +
                    '</td>' +
                    '<td>' +
                        bankbookName(d[vf.type], d[vf.bankbookName]) +
                        (d[vf.description] !== '' ? '<br/>' + lang.ORDER_LIST_COL_DESCRIPTION + ':' + d[vf.description] : '') +
                    '</td>' +
                    '<td class="mui--text-center">' +
                        statusColor(d[vf.status]) +
                    '</td>' +
                    '<td>' +
                        ( d[vf.viewTime] ? d[vf.viewer] + '<br/>' + d[vf.viewTime]  : '--' ) +
                    '</td>' +
                    '<td>' +
                        (d[vf.lastModifier] ? d[vf.lastModifier] + '<br/>' + d[vf.lastModifyTime] : '--') +
                    '</td>' +
                    '<td>' +
                        (d[vf.memo] ? d[vf.memo] : '') +
                    '</td>' +
                '</tr>';

            function bankbookName(type, bankbookName, cashFlowSupplier) {
                switch (type) {
                    case typeId.deposit:
                        if (bankbookName == '' || bankbookName == undefined) {
                            return '--';
                        } else {
                            return lang.ORDER_LIST_COL_BANKBOOK + ': ' + bankbookName + '<br/>';
                        }
                        break;

                    default:
                        return '--';
                        break;
                }
            }

            function payWay(bankbookName, type) {
                switch (type) {
                    case typeId.deposit:
                        if (bankbookName == '' || bankbookName == undefined ) {
                            var content = '';

                            //PePay
                            if (d[vf.cashFlowSupplier] == cashFlowSupplierPePay) {
                                content += searchView.searchText(d[vf.prodId], pePayProdIds) + '<br/>';
                            }

                            //EzPay
                            if (d[vf.cashFlowSupplier] == cashFlowSupplierEzPay) {
                                content += searchView.searchText(d[vf.prodId], ezPayProdIds) + ': ';
                                content += data[i][vf.csBarCode] + '<br/>';
                            }

                            content += searchView.searchText(d[vf.cashFlowSupplier], cashFlowSuppliers) + ': ';
                            content += d[vf.cashFlowOrderId];

                            return content;

                        } else {
                            return '--';
                        }
                        break;

                    case typeId.withdraw:
                        return data[i][vf.csBarCode];
                        break;

                    case typeId.switch:
                        return '--';
                        break;
                    default:
                        return '--';
                        break;
                }
            }

            function statusColor(status_id) {
                switch (status_id) {
                    //送出-有效=待處理
                    case transStatusId.valid:
                        return '<sapn class="bgLabel bgOrange">' + searchView.searchText(status_id, transStatus) + '</span>';
                        break;
                        //處理完畢-已處理=通過
                    case transStatusId.handled:
                        return '<sapn class="bgLabel bgGreen">' + searchView.searchText(status_id, transStatus) + '</span>';
                        break;
                        //處理完畢-無效=退回
                    case transStatusId.invalid:
                        return '<sapn class="bgLabel bgRed">' + searchView.searchText(status_id, transStatus) + '</span>';
                        break;
                    default:
                        break;
                }
            }
        }

        return html;
    },
    renderTopTotalHtml: function (dataTotal, dom) {
        var d = dataTotal,
            vf = viewOrderHtml.fieldTotal;
        var html =
        '<div class="totalDiv">' +
            lang.ORDER_LIST_LABEL_TOTAL + lang.ORDER_LIST_LABEL_TRANS_AMOUNT + '<span class="total transBlue">' + thousandsView.formatNumber(dataTotal[viewOrderHtml.fieldTotal.transAmount]) + '</span>' +
            lang.ORDER_LIST_LABEL_TOTAL + lang.ORDER_LIST_LABEL_ACTUAL_AMOUNT + '<span class="total">' + dataHandler.amountPosNeg(d[vf.actualAmount]) + '</span>' +
        '</div>';
        $(dom).html(html);
    },
    renderBottomTotalHtml: function (dataTotal, dom) {

        var transSubtotal = 0,
            actualSubtotal = 0;
        for (var i = 0 ; i < dataTotal.d.length; i++) {
            transSubtotal = transSubtotal + dataTotal.d[i][viewOrderHtml.field.transAmount];
            actualSubtotal = actualSubtotal + dataTotal.d[i][viewOrderHtml.field.actualAmount];
        }

        var html =
        '<div class="mui-panel mui--pull-left totalBox totalBg">' +
            lang.ORDER_LIST_LABEL_SUBTOTAL + lang.ORDER_LIST_LABEL_TRANS_AMOUNT + ' <span class="subtotal transBlue">' + thousandsView.formatNumber(transSubtotal) + '</span>' +
        '</div>' +
        '<div class="mui-panel mui--pull-left totalBox">' +
            lang.ORDER_LIST_LABEL_SUBTOTAL + lang.ORDER_LIST_LABEL_ACTUAL_AMOUNT + ' <span class="subtotal">' + dataHandler.amountPosNeg(actualSubtotal) + '</span>' +
        '</div>';
        $(dom).html(html);
    },
}

$(function () {
    viewOrderHtml.init();
});
