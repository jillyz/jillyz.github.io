<%@ Page Language="C#" AutoEventWireup="true" CodeFile="member_query.aspx.cs" Inherits="view_alert_danger_bill" %>

<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.Utils" %>
<%@ Import Namespace="WebModules.Http" %>
<%= Global.google_analytics_script %>
<link href="/css/pointControl/overlay.css?_=<%=Global.clear_cache %>" rel="stylesheet" />
<style>
    .rowTip {
        background-color: #fff;
    }
    #userInfo_box span {
        font-size: 2em;
        color: #2196F3;
    }
    .input {
        padding-left: 0;
    }
    #list_wrapper {
        margin-bottom: 100px;
    }
    .btnBalance {
        width: 100%;
        height: 20px;
        padding: 0 1em;
        line-height: 20px;
        text-align: left;
        background-color: #808080;
        color: #fff;
        -moz-transition: none;
        -o-transition: none;
        -webkit-transition: none;
        transition: none;
    }
    .btnBalance:hover {
        background-color: #333;
        color: #fff;
    }
    .viewLevel {
        color: inherit;
        cursor: pointer;
    }
    .username {
        color: #2196F3;
        font-weight: bold;
    }
    .nickname {
        color: #999;
    }
    .nicknameMargin {
        margin-top: .5em;
        margin-left: 2.75em;
    }
    .nicknameMarginAgent {
        margin-left: 1.5em;
    }
    .amount {
        text-align: right;
        color: #F44336;
        font-weight: bold;
    }
    .myModal .amount { text-align: left; }
    .myModal .fillForm label:not(.chkType){
        padding: 1em 1.5em;
    }
    .transType :checked + label {
        background-color: #2196F3;
    }
    .myModal [name="amount"] {
        color: #2196F3;
        font-size: 1.5em;
        font-weight: bold;
    }
    .myModal .username,
    .myModal .amount,
    .myModal #usedCreditAmount {
        padding: 1rem !important;
        font-size: 2em;
    }
    .colUsername { width: 12em; }
    .colAmount {
        width: 14em;
    }
    .colBtn { 
        width: 5em; 
    }
    .colPhone {
        width: 10em;
    }
    .colTime {
        width: 10em;
    }
    .colGame {
        width: 10em;
    }
    .colMng {
        width: 13em;
    }
    .colMemo {
        width: 5%;
    }
    .btnPointHistory {
        margin-left: 2em;
    }
    #list_box th, 
    #list_box td {
        white-space: nowrap;
    }
</style>
<script>

    var pageTitle = '會員查詢';

    var lang = {
        'ALL': '全部',
        'NO_SUB_COMPANY_DATA': '尚未創建子分站，無法繼續查詢',
        'MEMBER_QUERY_TITLE_MEMBER_LIST': '的會員查詢',
        'NONE': '無',
        'MEMBER_QUERY_EMPTY_DATA': '目前尚無符合的資料',
        'MEMBER_QUERY_POINT_DEPOSIT':'儲值總額',
        'MEMBER_QUERY_POINT_SELL':'出售總額',
        'MEMBER_QUERY_POINT_WALLET':'錢包餘額',
        'MEMBER_QUERY_POINT_TRANSFER':'下放點數',
        'MEMBER_QUERY_POINT_WITHDRAW':'提出點數',
        'MEMBER_QUERY_POINT_CONVERT':'轉移點數',
        'MEMBER_QUERY_POINT_CONVERT_PURPOSE':'轉移目的',
        'MEMBER_QUERY_GAME_ORIGINAL_USERNAME' : '原帳號',
        'MEMBER_QUERY_COLUMN_AGENT': '上層帳號',
        'MEMBER_QUERY_COLUMN_USERNAME': '會員帳號',
        'MEMBER_QUERY_COLUMN_NICKNAME': '暱稱',
        'MEMBER_QUERY_COLUMN_GAME_USERNAME': '遊戲帳號/餘額',
        'MEMBER_QUERY_COLUMN_WALLET_BALANCE': '錢包餘額',
        'MEMBER_QUERY_COLUMN_USER_CREDIT_AMOUNT': '我的剩餘可轉點額度',
        'MEMBER_QUERY_COLUMN_PHONE': '電話',
        'MEMBER_QUERY_COLUMN_ACCOUNT_GROUP': '帳戶群組',
        'MEMBER_QUERY_COLUMN_SCORE': '會員分數',
        'MEMBER_QUERY_COLUMN_NOTE': '備註',
        'MEMBER_QUERY_COLUMN_TRANSACTION_HISTORY': '交易歷程',
        'MEMBER_QUERY_COLUMN_CREATE_TIME': '建立時間',
        'MEMBER_QUERY_COLUMN_LAST_LOGIN_TIME': '最後登入時間',
        'MEMBER_QUERY_COLUMN_MANAGEMANT': '編輯資料 / 站內信 / 賽事設定',
        'MEMBER_QUERY_COLUMN_LAST_EDITOR': '最後編輯',
        'NOT_LOGIN_YET': '<%=dic_page_id_lang_map["NOT_LOGIN_YET"]%>',
        'MEMBER_QUERY_BTN_POINT_TRANSFER': '轉點',
        'MEMBER_QUERY_BTN_GET_WALLET_BALANCE': '取得餘額',
        'MEMBER_QUERY_WALLET_USERNAME': '帳號',
        'MEMBER_QUERY_WALLET_BALANCE': '餘額',
        'WALLET_STATUS_MNG_TITLE': '錢包鎖定',
        'WALLET_STATUS_MNG_LOCK_TO_MANAGE': '鎖定以繼續處理',
        'WALLET_STATUS_MNG_UNLOCK': '解除',
        'MEMBER_QUERY_POINT_MNG_TIP_IS_LOCKED': '錢包鎖定',
        'MEMBER_QUERY_POINT_MNG_LABEL_TYPE': '轉點類型',
        'MEMBER_QUERY_POINT_MNG_LABEL_AMOUNT': '金額',
        'MEMBER_QUERY_POINT_MNG_PLACEHOLDER_AMOUNT': '請輸入金額',
        'MEMBER_QUERY_POINT_MNG_LABEL_MEMO': '備註',
        'MEMBER_QUERY_POINT_MNG_PLACEHOLDER_MEMO': '請輸入備註',
        'MEMBER_QUERY_POINT_MNG_BTN_SUBMIT': '確定轉點',
        'MEMBER_QUERY_POINT_MNG_BTN_CLOSE': '關閉', 
        'MEMBER_QUERY_MEMBER_TOTAL': '會員總數', 
    }

    var dateLang = {
        'FROM':'從',
        'TO':'到',
        'TODAY':'今天',
        'YESTERDAY':'昨天',
        'THIS_WEEK':'本週',
        'LAST_WEEK':'上週',
        'THIS_MONTH':'本月',
        'LAST_MONTH':'上月',
        'THIS_ONE_MONTH': '近一個月'
    }
    var sortLang = {
        'USERNAME':'會員帳號', 
        'CREATE_TIME':'建立時間',
        'LAST_LOGIN_TIME':'最後登入時間',
        'IP':'IP',
        'LAST_EDITOR':'最後編輯人員',
        'ASC':'升',
        'DESC':'降',
        'AMOUNT':'錢包餘額',
        'AGENT':'代理帳號'
    }

    <%--var companys = <%=filter.GetAllCompany() %>;--%>

    var walletTypes = <%=filter.GetWalletTypes() %>;

    var walletTypeExclude = {
        '<%=PointControl.Wallet.Define.WalletTypes.System %>':'',
        '<%=PointControl.Wallet.Define.WalletTypes.MainWallet %>':''
    };

    var transType = <%=filter.GetTransTypes() %>;
    var transTypeWithdraw = '<%=PointControl.Wallet.Define.TransTypes.Withdrow %>';

    var transTypeExclude = {
        '<%=PointControl.Wallet.Define.TransTypes.Deposit %>':'',
        '<%=PointControl.Wallet.Define.TransTypes.Withdrow %>':'',
        '<%=PointControl.Wallet.Define.TransTypes.Switch %>':''
    };

    var sort = [
        { "id": "username", "langKey":"USERNAME"},
        { "id": "createDateTime", "langKey":"CREATE_TIME"},
        { "id": "loginDateTime", "langKey":"LAST_LOGIN_TIME"},
        { "id": "loginIp", "langKey":"IP"},
        { "id": "lastModifierId", "langKey":"LAST_EDITOR"},
        { "id": "walletAmount", "langKey":"AMOUNT"},
        { "id": "accountParent", "langKey":"AGENT"}
    ]

</script>

<script src="/js/pointControl/member/member_query_result.js?_=<%=Global.clear_cache %>"></script>

<div id="userInfo_box" class="mui-panel hidden">
</div>

<div id="query_box">
    <div class="mui-panel">

        <table class="fillForm queryBox">
            <%--<tr>
                <th>分站</th>
                <td>
                    <div class="input">
                        <div id="company_filter_list">
                        </div>
                    </div>
                </td>
            </tr>--%>
            <tr id="trIsSearchAll" class="defaultQuery">
                <th style="padding-top: .5em !important;">搜尋範圍</th>
                <td id="isSearchAll">
                    <input type="radio" name="isSearchAll" id="isSearchAll_true" value="true" checked class="filterForm">
                    <label for="isSearchAll_true">全部</label>
                    <input type="radio" name="isSearchAll" id="isSearchAll_false" value="false" class="filterForm">
                    <label for="isSearchAll_false" >僅自己</label>
                </td>
            </tr>
            <tr class="defaultQuery">
                <th>會員搜尋</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="username" class="filterForm keyword inline" placeholder="帳號 / 暱稱">
                        &nbsp;
                        <a href="#" id="toggle-advance" class="inline">進階搜尋
                            <span class="icon icon-down-open"></span>
                            <span class="hidden icon icon-up-open"></span>
                        </a>
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>代理搜尋</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="parentName" class="filterForm keyword inline" placeholder="帳號 / 暱稱">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>電話</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="phone" class="filterForm keyword inline" placeholder="請輸入完整的電話號碼">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>IP</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="ip" class="filterForm keyword inline" placeholder="123.1.1.1">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th class="alignTop">建立時間</th>
                <td id="create">
                </td>
            </tr>

            <tr class="advanceQuery hidden">
                <th class="alignTop">最後登入時間</th>
                <td id="lastLogin">
                </td>
            </tr>

            <tr class="advanceQuery hidden">
                <th class="alignTop">最後編輯時間</th>
                <td id="lastModify">
                </td>
            </tr>

            <tr class="advanceQuery hidden">
                <th>主錢包餘額<br />大於或等於</th>
                <td>
                    <div class="mui-textfield inline input">
                        <input type="text" name="walletAmount" class="filterForm keyword inline" placeholder="金額">
                    </div>
                </td>
            </tr>

            <!--
            <tr class="advanceQuery hidden">
                <th>會員分數</th>
                <td>
                    <div class="mui-textfield">
                        <input type="number" class="score inline" placeholder="從" min="0" max="99" />
                        <input type="number" class="score inline" placeholder="到" min="1" max="100" />
                    </div>
                </td>
            </tr>
            -->

            <tr class="advanceQuery hidden">
                <th>排序方式</th>
                <td id="sort">
                </td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <div>
                        <div id="submit" class="mui-btn mui-btn--primary submitBtn" data-disabled="false"><i class="icon-spinner"></i>查詢</div>
                    </div>
                </td>
            </tr>

        </table>



    </div>
</div>

<div id="list_wrapper" class="reportTable hidden">
    <div id="list_banner" class="mui-panel">
        <span id="member_total-js"></span>
    </div>
    <div id="list_box" class="mui-panel">

    <%--
    <table class="mui-table">
        <thead>
            <tr>
                <!--<th>上級</th>-->
                <th class="memberAccount">會員帳號/暱稱</th>
                <th>遊戲帳號</th>
                <th>電話</th>
                <!--<th>帳戶群組</th>-->
                <!--<th>會員分數</th>-->
                <th>備註</th>
                <th>交易歷程</th>
                <th>建立時間</th>
                <th>最後登入時間</th>
                <th>IP</th>
                <th>管理</th>
                <th>最後編輯人員</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <!--
                <td class="th">
                    <i class="icon-search gray"></i>
                    <a href="#" class="viewLevel viewLevel-js">abcde</a>
                    <span class="nickname">(暱稱)</span>
                </td>
                -->
                <td class="overlayBox textLeft">

                    <div data-overlay="toggle">
                        <input type="checkbox" id="chkPoint_3" />
                        <label for="chkPoint_3">
                            <i class="icon-down-open gray" data-overlay="toggle-down"></i>
                            <i class="icon-up-open gray" data-overlay="toggle-up"></i>
                            <a><i class="icon-user-1"></i>wxyz</a>
                            <span class="nickname">(暱稱)</span>
                        </label>

                        <div class="overlayWrapper" data-overlay="content">

                            <table class="overlayConetntTable">
                                <tbody>
                                    <tr>
                                        <th>儲值總額</th>
                                        <th>出售總額</th>
                                        <th>錢包餘額</th>
                                        <th>下放點數</th>
                                        <th>提出點數</th>
                                        <th>轉移點數</th>
                                        <th>轉移目的</th>
                                    </tr>
                                    <tr>
                                        <td>205,000</td>
                                        <td>31,000</td>
                                        <td>60,000</td>
                                        <td>20,000</td>
                                        <td>33,000</td>
                                        <td>18,000</td>
                                        <td>目的描述說明</td>
                                    </tr>
                                </tbody>

                            </table>

                        </div>

                    </div>


                </td>
                <td class="overlayBox floatBox_gameAccount">

                    <div data-overlay="toggle">
                        <input type="checkbox" id="chkPoint_4" />
                        <label for="chkPoint_4">
                            <i class="icon-down-open gray" data-overlay="toggle-down"></i>
                            <i class="icon-up-open gray" data-overlay="toggle-up"></i>
                            <a>遊戲帳號</a>
                        </label>

                        <div class="overlayWrapper" data-overlay="content">

                            <table class="overlayConetntTable">
                                <tbody>
                                    <tr>
                                        <th>運彩</th>
                                        <th>運彩</th>
                                        <th>運彩</th>
                                        <th>運彩</th>
                                        <th>運彩</th>
                                        <th>運彩</th>
                                    </tr>
                                    <tr>
                                        <td>xhih5646</td>
                                        <td>xhih5646</td>
                                        <td>xhih5646</td>
                                        <td>xhih5646</td>
                                        <td>xhih5646</td>
                                        <td>xhih5646</td>
                                    </tr>
                                </tbody>

                            </table>

                        </div>

                    </div>

                </td>
                <td>0958660228</td>
                <!--<td>ABC</td>-->
                <!--<td>60</td>-->
                <td>備註備註備註備註</td>
                <td>
                    <a href="#" class="mui-btn mui-btn--raised mui-btn--primary mui-btn--small viewPointHistory-js" target="_blank"><i class="icon-search"></i>交易歷程</a>
                </td>

                <td>2016/04/10 12:28:36</td>
                <td>2016/04/10 12:28:36</td>
                <td>210.122.3.45</td>
                <td>
                    <div class="mui-btn mui-btn--raised mui-btn--primary mui-btn--small "><span class="icon icon-pencil"></span></div>
                </td>
                <td>admin123</td>
            </tr>
        </tbody>
    </table>
    --%>

    </div>

    <div class="fixedBottom list text-center">
        <%--分頁--%>
        <div class="mui-container">
            <div class="pageGroup">
            </div>
        </div>
        <%--分頁--%>
    </div>

</div>


<div id="dialog" class="dialogDelete myModal">
    <div class="myModalContent">
<%--        <table class="dialogTable fillForm">
            <tbody>
                <tr class="rowTitle">
                    <th>會員</th>
                    <td>
                        test01
                    </td>
                </tr>
                <tr class="rowTitle">
                    <th>錢包餘額</th>
                    <td>
                        2,5630,000
                    </td>
                </tr>
                <tr class="rowTitle">
                    <th>錢包鎖定</th>
                    <td>
                        <div id="walletIsLock" class="inline noSelect">
                            <input type="radio" name="walletIsLock" id="walletIsLock_false" value="false" class="filterForm">
                            <label for="walletIsLock_false" class="quickDateItem"><i class="icon-lock-open-1"></i> 解除</label>
                            <input type="radio" name="walletIsLock" id="walletIsLock_true" value="true" class="filterForm">
                            <label for="walletIsLock_true" class="quickDateItem"><i class="icon-lock-1"></i> 鎖定以進行轉點</label>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody id="closeBlock" class="hidden">
                <tr>
                    <td></td>
                    <td class="textRight">
                        <div class="mui-btn mui-btn--default mui-btn--small modalClose-js">關閉</div>
                    </td>
                </tr>
            </tbody>
            <tbody id="transManage">
                <tr>
                    <th>類型</th>
                    <td id="transType">
                    
                    </td>
                </tr>
                <tr>
                    <th>金額</th>
                    <td>
                        <input type="text" name="amount" class="filterForm inline" placeholder="請輸入金額">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="mui-btn mui-btn--primary mui-btn--small deleteGroup-js">確定</div><div class="mui-btn mui-btn--default mui-btn--small modalClose-js">取消</div>
                    </td>
                </tr>
            </tbody>
        </table>--%>
    </div>
</div>

