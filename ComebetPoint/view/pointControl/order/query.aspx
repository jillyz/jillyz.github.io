<%@ Page Language="C#" AutoEventWireup="true" CodeFile="query.aspx.cs" Inherits="view_alert_danger_bill" %>

<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.Utils" %>
<%@ Import Namespace="WebModules.Http" %>
<%= Global.google_analytics_script %>

<link href="/css/pointControl/order/query.css?_=<%=Global.clear_cache %>" rel="stylesheet" />

<script>
    var pageTitle = '訂單查詢';

    var lang = {
        'ALL': '全部',

        'ORDER_LIST_TITLE_ORDER_HISTORY': '訂單紀錄',
        'ORDER_LIST_TITLE_ORDER_HISTORY_FOR_REPORT': '儲值及出售紀錄(僅已處理)',

        'ORDER_LIST_COL_OEDER_ID': '訂單編號',
        'ORDER_LIST_COL_ORDER_TYPE': '類型',
        'ORDER_LIST_COL_AGENT': '上層',
        'ORDER_LIST_COL_USERNAME': '會員', // 會員帳號
        'ORDER_LIST_COL_FROM': '來源',
        'ORDER_LIST_COL_TO': '目的',
        'ORDER_LIST_COL_AMOUNT': '金額',
        'ORDER_LIST_COL_AMOUNT_TRANS': '交易金額',
        'ORDER_LIST_COL_AMOUNT_ACTUAL': '實際金額',
        'ORDER_LIST_COL_PAYMEMT_INFO': '繳費管道',
        'ORDER_LIST_COL_DESCRIPTION': '描述',
        'ORDER_LIST_COL_BANKBOOK': '簿子',
        'ORDER_LIST_COL_SATUS': '狀態',
        'ORDER_LIST_COL_CREATE_TIME': '申請時間', //提交時間
        'ORDER_LIST_COL_VIEWER_TIME': '觀看人/觀看時間',
        'ORDER_LIST_COL_LAST_MODIFIER_TIME': '處理人/處理時間',
        'ORDER_LIST_COL_MEMO': '備註',

        'ORDER_LIST_LABEL_IS_MANUAL_TRANS_TRUE': '客服手動轉點',
        'ORDER_LIST_LABEL_IS_MANUAL_TRANS_FALSE': '會員申請',

        'ORDER_LIST_LABEL_TRANS_AMOUNT': '交易金額 ',
        'ORDER_LIST_LABEL_ACTUAL_AMOUNT': '實際金額 ',

        'ORDER_LIST_LABEL_TOTAL': '(總計) ',
        'ORDER_LIST_LABEL_SUBTOTAL': '(本頁小計) ',

        //'ORDER_LIST_CALC_TOTAL_TRANS_AMOUNT': '交易金額 總計',
        //'ORDER_LIST_CALC_TOTAL_ACTUAL_AMOUNT': '實際金額 總計',

        //'ORDER_LIST_CALC_SUBTOTAL_TRANS_AMOUNT': '交易金額 小計',
        //'ORDER_LIST_CALC_SUBTOTAL_ACTUAL_AMOUNT': '實際金額 小計',
    }

    var sFromLang = {
        'ALL': '全部',
    }
    var sToLang = {
        'ALL': '全部',
    }
    var statusLang = {
        'ALL': '全部',
    }
    var transLang = {
        'ALL': '全部',
    }
    var dateLang = {
        'FROM': '從',
        'TO': '到',
        'TODAY': '今天',
        'YESTERDAY': '昨天',
        'THIS_WEEK': '本週',
        'LAST_WEEK': '上週',
        'THIS_MONTH': '本月',
        'LAST_MONTH': '上月',
        'THIS_ONE_MONTH': '近一個月'
    }
    var sortLang = {
        'ORDER_LIST_ORDER_ID': '訂單編號',
        'ORDER_LIST_CREATE_TIME': '提交時間',
        'ORDER_LIST_VIEW_TIME': '觀看時間',
        'ORDER_LIST_LAST_MODIFY_TIME': '處理時間',
        'ORDER_LIST_TRANSACTION_FROM': '來源/目的',
        'ORDER_LIST_STATUS': '狀態',
        'ORDER_LIST_USERNAME': '會員帳號',
        'ORDER_LIST_VIEWER': '觀看人',
        'ORDER_LIST_LAST_MODIFIER': '處理人',
        'ASC': '升',
        'DESC': '降'
    }

    var sort = [
        { "id": "id", "langKey": "ORDER_LIST_ORDER_ID" },
        { "id": "createDateTime", "langKey": "ORDER_LIST_CREATE_TIME" },
        { "id": "viewDateTime", "langKey": "ORDER_LIST_VIEW_TIME" },
        { "id": "lastModifyDateTime", "langKey": "ORDER_LIST_LAST_MODIFY_TIME" },
        { "id": "sFrom", "langKey": "ORDER_LIST_TRANSACTION_FROM" },
        { "id": "status", "langKey": "ORDER_LIST_STATUS" },
        { "id": "createrId", "langKey": "ORDER_LIST_USERNAME" },
        { "id": "viewerId", "langKey": "ORDER_LIST_VIEWER" },
        { "id": "lastModifierId", "langKey": "ORDER_LIST_LAST_MODIFIER" }
    ]

    var type = <%=filter.GetTransTypes()%>;

    var typeId = {
        'deposit': '<%=PointControl.Wallet.Define.TransTypes.Deposit%>',
        'withdraw': '<%=PointControl.Wallet.Define.TransTypes.Withdrow%>',
        'switch': '<%=PointControl.Wallet.Define.TransTypes.Switch%>'
    }

    var pePayProdIds = <%=filter.GetPePayProdIds()%>;
    var ezPayProdIds = <%=filter.GetEzPayProdIds()%>;

    var cashFlowTypes = <%=filter.GetAccountTypes()%>;
    var cashFlowDetailType = <%=filter.GetCashFlowDetailTypes()%>;

    var cashFlowSuppliers = <%=filter.GetCashFlowSuppliers()%>;
    var cashFlowSupplierSystem = '<%=PointControl.Wallet.Define.CashFlowSuppliers.System%>';
    var cashFlowSupplierPePay = '<%=PointControl.Wallet.Define.CashFlowSuppliers.PePay%>';
    var cashFlowSupplierEzPay = '<%=PointControl.Wallet.Define.CashFlowSuppliers.EzPay%>';

    var walletTypes = <%=filter.GetWalletTypes()%>;

    var transStatus = <%=filter.GetTransStatus()%>;
    var transStatusId = {
        'handled': '<%=PointControl.Wallet.Define.TransStatus.Handled%>',
        'invalid': '<%=PointControl.Wallet.Define.TransStatus.Invalid%>',
        'valid': '<%=PointControl.Wallet.Define.TransStatus.Valid%>'
    }


    var walletTypes = <%=filter.GetWalletTypes()%>;

</script>

<script src="/js/pointControl/order/query_result.js?_=<%=Global.clear_cache %>"></script>

<div id="userInfo_box" class="mui-panel hidden">
</div>

<div id="query_box">

    <div class="mui-panel">
        <table class="fillForm queryBox">
            <tr id="fieldType">
                <th>類型</th>
                <td>
                    <div id="transTypes" class="mui-textfield inline input">
                    </div>
                    <div class="inline">
                        &nbsp;
                        <a href="#" id="toggle-advance" class="inline">進階搜尋
                            <span class="icon icon-down-open"></span>
                            <span class="hidden icon icon-up-open"></span>
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <th>提交時間</th>
                <td id="createDateTime" class="input"></td>
            </tr>
            <tr id="fieldAgent" class="">
                <th>上層帳號</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="upperUsername" class="filterForm inline" placeholder="">
                    </div>
                </td>
            </tr>
            <tr id="fieldUsername" class="">
                <th>會員帳號</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="creater" class="filterForm inline" placeholder="">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>訂單編號</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="orderId" class="filterForm inline" placeholder="">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>來源 <i class="icon-right"></i>目的</th>
                <td>
                    <div id="sFrom" class="mui-textfield inline input">
                    </div>
                    <i class="icon-right"></i>
                    <div id="sTo" class="mui-textfield inline input ">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>觀看人員</th>
                <td>
                    <div class="mui-textfield inline">
                        <input type="text" name="viewer" class="filterForm inline input" placeholder="">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>觀看時間</th>
                <td id="viewDateTime" class="input"></td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>處理人員</th>
                <td>
                    <div class="mui-textfield inline">
                        <input type="text" name="lastModifier" class="filterForm inline input" placeholder="">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>處理時間</th>
                <td id="lastModifyDateTime" class="input"></td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>狀態</th>
                <td id="" class="noSelect">
                    <div id="status" class="mui-textfield inline input">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>排序方式</th>
                <td id="sort" class="input"></td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <div id="submit" class="mui-btn mui-btn--primary submitBtn" data-disabled="false"><i class="icon-spinner"></i>查詢</div>
                </td>
            </tr>
        </table>
    </div>

</div>


<div id="list_wrapper" class="hidden">

        <div id="emptyData" class="mui-panel">無符合的訂單紀錄</div>

        <div id="list_box" class="mui-panel">
            <div id="topTotal"></div>
            <div id="bottomTotal">
            </div>
            <div id="listTable"></div>
            
        </div>
        <!-- mui-panel -->

        <div class="fixedBottom list text-center" style="position: fixed;">

            <%--分頁--%>
            <div class="mui-container">
                <div class="pageGroup">
                </div>
            </div>
            <%--分頁--%>
        </div><!-- fixedBottom -->

   

</div>
<!-- #list_wrapper -->

