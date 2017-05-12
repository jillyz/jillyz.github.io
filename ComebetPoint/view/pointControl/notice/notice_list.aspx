<%@ Page Language="C#" AutoEventWireup="true" CodeFile="notice_list.aspx.cs" Inherits="view_control_notice_notice_list" %>
<link href="/css/pointControl/notice/notice.css?_=<%=Global.clear_cache %>" rel="stylesheet" />
<style>
    #paneWrap {
        overflow: auto;
    }
    #list_box th, 
    #list_box td {
        white-space: nowrap;
    }
    .myModal .fillForm label:not(.chkType) {
        padding: 1em 1.5em;
    }
    .memo {
        width: 18em !important;
        padding: 1.5em 1em !important;
    }
    .icon-arrows-ccw {
        -moz-transform-origin: 55% 55%;
        -ms-transform-origin: 55% 55%;
        -o-transform-origin: 55% 55%;
        -webkit-transform-origin: 55% 55%;
        transform-origin: 55% 55%;
    }
    .btnClearUnpaid {
        width: 20em;
    }
    .alert_circle:empty {
        display: none;
    }
    .alert_circle:not(:empty) {
        display: inline-block;
    }
    .chkTabPane + label {
        height: 36px;
        vertical-align: middle;
        line-height: 36px;
    }
    [name="soundTip"] + label {
        font-family: "fontello";
        font-style: normal;
        font-weight: normal;
        speak: none;
        display: inline-block;
        margin-left: 1em;
        padding: .5em 1em;
        text-decoration: inherit;
        text-align: center;
        font-variant: normal;
        text-transform: none;
        line-height: 1em;
        cursor: pointer;
    }
    [name="soundTip"] + label:hover {
        color: inherit;
    }
    [name="soundTip"] + label:after {
        margin-left: .5em;
    }
    [name="soundTip"]:not(:checked) + label:after {
        content: '\e979';
    }
    [name="soundTip"]:checked + label:after {
        content: '\e978';
    }
    [name="soundTip"]:not(:checked) + label {
        background-color: #bbb;
        color: #fff;
    }
    [name="soundTip"]:checked + label {
        background-color: #F44336;
        color: #fff;
    }
    .clearChk {
        width: 2em;
        height: 2em;
    }
    .continue + label {
        display: inline-block;
        padding: .55em 1em;
        border: 1px solid #ccc;
        color: #666;
        cursor: pointer;
    }
    .continue:checked + label {
        border-color: transparent;
        background-color: #F44336;
        color: #fff;
    }
</style>
<script>
    var pageTitle = '待處理列表 - 通知中心';

    var lang = {
        'ALL': '全部',
        'SELECT_TIP': '請選擇',

        'NOTICE_LIST_COL_UPPER_USERNAME': '上層',
        'NOTICE_LIST_COL_USERNAME': '會員帳號',
        'NOTICE_LIST_COL_CREATE_TIME': '申請時間',
        'NOTICE_LIST_COL_ORDER_ID': '訂單編號',
        'NOTICE_LIST_COL_TYPE': '類型',
        'NOTICE_LIST_COL_FROM': '來源',
        'NOTICE_LIST_COL_TO': '目的',
        'NOTICE_LIST_COL_AMOUNT': '金額',
        'NOTICE_LIST_COL_IS_PAID': '已通知繳費',
        'NOTICE_LIST_COL_ACCOUNT': '帳戶',
        'NOTICE_LIST_COL_DESCRIPTION': '描述',
        'NOTICE_LIST_COL_VIEWER_TIME': '觀看人/時間',
        'NOTICE_LIST_COL_MANAGE': '處理',
        'NOTICE_LIST_COL_CLEAR': '清理',

        'NOTICE_LIST_MNG_BTN_RENOTICE': '可再次通知',

        'NOTICE_LIST_EMPTY_DATA': '目前尚無符合的資料',

        'WALLET_STATUS_MNG_TITLE': '錢包鎖定',
        'WALLET_STATUS_MNG_LOCK_TO_MANAGE': '鎖定以繼續處理',
        'WALLET_STATUS_MNG_UNLOCK': '解除',

        'NOTICE_LIST_MNG_LABEL_MEMO': '處理備註',
        'NOTICE_LIST_MNG_PLACEHOLDER_MEMO': '請輸入備註',
        'NOTICE_LIST_MNG_LABEL_STATUS': '處理狀態',


        'NOTICE_LIST_MNG_SUBMIT': '確定',
        'NOTICE_LIST_MNG_CLOSE': '關閉'
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
    var type = <%=filter.GetTransTypes()%>;
    var typeExclude = {
        '<%=PointControl.Wallet.Define.TransTypes.Switch%>':''
    };

    var typeDepositId = '<%=PointControl.Wallet.Define.TransTypes.Deposit%>';
    var typeWithdrawId = '<%=PointControl.Wallet.Define.TransTypes.Withdrow%>';

    var walletTypes = <%=filter.GetWalletTypes()%>;
    var transStatus = <%=filter.GetTransStatus()%>;
    var transStatusExclude = {
        '<%=PointControl.Wallet.Define.TransStatus.Valid%>':''
    };
    var countdownSec = 5;

</script>

<div class="counterBlock">
    <button class="mui-btn mui-btn--fab mui-btn--primary getData-js" data-allowGet="true"></button>
</div>

<div id="pnlControl" class="mui-panel">

    <span class="fillForm">

        <span class="mui--pull-right">
            <button id="btnClearUnpaid" class="btnClearUnpaid mui-btn mui-btn--danger mui-btn--small hidden">清理未繳單</button>
        </span>


        <span>
            <input type="checkbox" name="isPaid" id="isPaid_true" class="chkTabPane" data-tab="1" data-name="deposit" checked>
            <label for="isPaid_true">
                儲值 已通知繳費 
                <span class="alert_circle hidden" id="num_deposit_paid"></span>
            </label>
        </span>
        <span>
            <input type="checkbox" name="isPaid" id="isPaid_false" class="chkTabPane" data-tab="1" data-name="deposit">
            <label for="isPaid_false">
                儲值 未通知繳費 
                <span class="alert_circle hidden" id="num_deposit_unpaid"></span>
            </label>
        </span>
        <span>
            <input type="checkbox" name="isPaid" id="sell" class="chkTabPane" data-tab="2" data-name="withdraw">
            <label for="sell">
                出售 
                <span class="alert_circle hidden" id="num_withdraw"></span>
            </label>
        </span>

    </span>


    <span>
        <span>
            <input type="checkbox" id="chk_noticeSoundDeposit" name="soundTip" checked class="hidden">
            <label for="chk_noticeSoundDeposit">儲值音效</label>
        </span>
        <span>
            <input type="checkbox" id="chk_loopTipDeposit" checked class="continue hidden">
            <label for="chk_loopTipDeposit">持續通知：已繳費</label>
        </span>
         /
        <span>
            <input type="checkbox" id="chk_noticeSoundWithdraw" name="soundTip" checked class="hidden">
            <label for="chk_noticeSoundWithdraw">出售音效</label>
        </span>
        <span>
            <input type="checkbox" id="chk_loopTipWithdraw" checked class="continue hidden">
            <label for="chk_loopTipWithdraw">持續通知：出售</label>
        </span>
    </span>
    
</div>

<div id="paneWrap" class="mui-panel">

<div id="list_box">

<%--    <ul class="mui-tabs__bar mui-tabs__bar--justified">
      <li class="mui--is-active">
          <a data-mui-toggle="tab" data-mui-controls="pane-justified-1">儲值
              <span class="alert_circle">12</span>
          </a>
      </li>
      <li>
          <a data-mui-toggle="tab" data-mui-controls="pane-justified-2">出售
              <span class="alert_circle">12</span>
          </a>
      </li>
      <li>
          <a data-mui-toggle="tab" data-mui-controls="pane-justified-3">帳戶
              <span class="alert_circle">12</span>
          </a>
      </li>
      <li>
          <a data-mui-toggle="tab" data-mui-controls="pane-justified-4">轉點額度過大
              <span class="alert_circle">12</span>
          </a>
      </li>
      <li>
          <a data-mui-toggle="tab" data-mui-controls="pane-justified-5">其他系統
              <span class="alert_circle">12</span>
          </a>
      </li>
    </ul>
    <div class="mui-tabs__pane mui--is-active" id="pane-justified-1">
        <table class="mui-table">
            <tr>
                <th>會員帳號</th>
                <th>申請時間</th>
                <th>類型</th> 
                <th>描述</th>
                <th>觀看帳號</th>
                <th>備註</th>
            </tr>
            <tr data-id="3001" data-type="1">
                <td>abc1234</td>
                <td>2016/04/02 12:15:26</td>
                <td>儲值</td>
                <td>描述描述描述描述描述描述</td>
                <td class="blue">def5677</td>
                <td>
                    <div>
                        <input type="text" name="memo" class="memo inline" placeholder="請輸入備註"><div id="submit" class="mui-btn mui-btn--primary mui-btn--small confirmBtn confirm-js inline" data-disabled="false">處理</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="mui-tabs__pane" id="pane-justified-2">
        <div class="emptyData">
            <i class="icon-comment-1"></i>目前尚無符合的資料
        </div>
    </div>
    <div class="mui-tabs__pane" id="pane-justified-3">
        <div class="emptyData">
            <i class="icon-comment-1"></i>目前尚無符合的資料
        </div>
    </div>
    <div class="mui-tabs__pane" id="pane-justified-4">
        <div class="emptyData">
            <i class="icon-comment-1"></i>目前尚無符合的資料
        </div>
    </div>
    <div class="mui-tabs__pane" id="pane-justified-5">
        <div class="emptyData">
            <i class="icon-comment-1"></i>目前尚無符合的資料
        </div>
    </div>
--%>


</div>

</div>

<div id="dialog" class="dialogDelete myModal">
    <div class="myModalContent">
        
    </div>
</div>

<audio id="soundNewNotice">
    <source src="/material/crrect_answer1.mp3" type="audio/mpeg">
    <!--Your browser does not support the audio element.-->
</audio>
<audio id="soundDeposit">
    <source src="/material/sound_deposit.mp3" type="audio/mpeg">
    <!--Your browser does not support the audio element.-->
</audio>
<audio id="soundWithdraw">
    <source src="/material/sound_withdraw.mp3" type="audio/mpeg">
    <!--Your browser does not support the audio element.-->
</audio>
