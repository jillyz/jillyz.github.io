<%@ Page Language="C#" AutoEventWireup="true" CodeFile="agent_query.aspx.cs" Inherits="view_alert_danger_bill" %>

<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.Utils" %>
<%@ Import Namespace="WebModules.Http" %>
<%= Global.google_analytics_script %>
<style>
    #list_wrapper {
        margin-bottom: 100px;
    }
    .viewMember {
        padding: 0 2em;
        font-weight: bold;
        cursor: pointer;
    }
    .colNum {
        width: 7em;
    }
    .col-editInfo-GameSetting {
        width: 12em;
    }
</style>
<script>
    var pageTitle = '下級代理查詢';

    var lang = {
        'ALL': '全部',
        'NO_SUB_COMPANY_DATA': '尚未創建子分站，無法繼續查詢',
        'AGENT_LIST_EMPTY_DATA': '目前尚無符合的資料',

        'AGENT_LIST_NAV_ME': '我',

        'AGENT_LIST_COL_USERNAME': '代理帳號',
        'AGENT_LIST_COL_NICKNAME': '暱稱',
        'AGENT_LIST_COL_PHONE': '電話',
        'AGENT_LIST_COL_MEMERS_NUM': '直屬會員數',
        'AGENT_LIST_COL_HEIRARCHY_MEMBERS_NUM': '下線代理數',
        'AGENT_LIST_COL_AUTH': '權限',
        'AGENT_LIST_COL_LOG': '操作紀錄',
        'AGENT_LIST_COL_CREATE_TIME': '建立時間',
        'AGENT_LIST_COL_LAST_LOGIN_TIME_IP': '最後登入時間/IP',
        'AGENT_LIST_COL_MEMO': '備註',
        'AGENT_LIST_COL_MANAGE': '管理',
        'AGENT_LIST_COL_LAST_MODIFY': '最後編輯',

        'AGENT_LIST_BTN_AUTH_SETTING': '設定',
        'AGENT_LIST_BTN_LOG': '操作紀錄',
        'AGENT_LIST_BTN_EDIT_GAME_SETTING': '資料/賽事設定',
        'NOT_LOGIN_YET': '<%=dic_page_id_lang_map["NOT_LOGIN_YET"]%>'
    }

    <%--var companys = <%=filter.GetAllCompany() %>;--%>

<%--    var walletType = <%=filter.GetWalletTypes() %>;

    var walletTypeExclude = {
        '<%=PointControl.Wallet.Define.WalletTypes.System %>':'',
        '<%=PointControl.Wallet.Define.WalletTypes.MainWallet %>':''
    };--%>

    var transType = <%=filter.GetTransTypes() %>;

    var levels = <%=filter.GetCanViewLevelIds() %>;

    var transTypeExclude = {
        '<%=PointControl.Wallet.Define.TransTypes.Switch %>':''
    };

    var sort = [
        { "id": "username", "langKey":"USERNAME"},
        { "id": "id", "langKey":"CREATE_ID"},
        { "id": "loginDateTime", "langKey":"LAST_LOGIN_TIME"},
        { "id": "loginIp", "langKey":"IP"},
        { "id": "lastModifierId", "langKey":"LAST_EDITOR"},
    ];

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
        'USERNAME':'代理帳號', 
        'CREATE_ID':'建立順序',
        'LAST_LOGIN_TIME':'最後登入時間',
        'IP':'最後登入IP',
        'LAST_EDITOR':'最後編輯人員',
        'ASC':'升',
        'DESC':'降'
    }

</script>
<script src="/js/pointControl/member/agent_query_result.js"></script>

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
            <tr>
                <th>代理帳號</th>
                <td>
                    <div class="mui-textfield inline">
                        <input type="text" name="username" class="filterForm keyword inline">
                        &nbsp;
                        <a href="#" id="toggle-advance" class="inline">進階搜尋
                            <span class="icon icon-down-open"></span>
                            <span class="hidden icon icon-up-open"></span>
                        </a>
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th>電話</th>
                <td>
                    <div class="mui-textfield inline">
                        <input type="text" name="phone" class="filterForm keyword inline input" placeholder="請輸入完整的電話號碼">
                    </div>
                </td>
            </tr>
            <tr class="advanceQuery hidden">
                <th class="alignTop">建立時間</th>
                <td id="create"></td>
            </tr>

            <tr class="advanceQuery hidden">
                <th class="alignTop">最後登入時間</th>
                <td id="lastLogin"></td>
            </tr>

            <tr class="advanceQuery hidden">
                <th class="alignTop">最後編輯時間</th>
                <td id="lastModify">
                </td>
            </tr>

            <tr class="advanceQuery hidden">
                <th>排序方式</th>
                <td id="sort"></td>
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
    <div id="list_box" class="mui-panel">

        <div id="levelNav" class="levelNav hidden">
            <ul>
            </ul>
        </div>

        <table id="reportTotal_0" class="tableView mui-table isRoot">
        </table>

        <div id="reportDetail">

        </div>

        <div id="emptyData" class="emptyData hidden">
            <i class="icon-comment-1"></i> 目前尚無符合的資料
        </div>
        <%--<table class="mui-table">
            <tr>
                <th>上級</th>
                <th>名稱</th>
                <th>階級</th>
                <th>帳戶群組</th>
                <th>電話</th>
                <th>會員數</th>
                <th>體系會員總數</th>
                <th>權限</th>
                <th>建立時間</th>
                <th>備註</th>
                <th>管理</th>
                <th>最後編輯人員</th>
            </tr>
            <tr>
                <td class="th">-</td>
                <td><a href="#" class="viewLevel viewLevel-js">XXXXXX</a></td>
                <td>分站</td>
                <td>ABC</td>
                <td>0958660228</td>
                <td>1000</td>
                <td>4000</td>
                <td>
                    <div class="mui-btn mui-btn--primary mui-btn--small">設定</div>
                </td>
                <td>2016/04/10 12:28:36</td>
                <td>備註備註備註備註</td>
                <td>
                    <div class="mui-btn mui-btn--primary mui-btn--small"><span class="icon icon-pencil"></span></div>
                </td>
                <td>admin123</td>
            </tr>
            <tr>
                <td class="th">XXXXXX</td>
                <td><a href="#" class="viewLevel viewLevel-js">OOOOO</a></td>
                <td>子分站</td>
                <td>ABC</td>
                <td>0958660228</td>
                <td>100</td>
                <td>400</td>
                <td>
                    <div class="mui-btn mui-btn--primary mui-btn--small">設定</div>
                </td>
                <td>2016/04/10 12:28:36</td>
                <td>備註備註備註備註</td>
                <td>
                    <div class="mui-btn mui-btn--primary mui-btn--small"><span class="icon icon-pencil"></span></div>
                </td>
                <td>admin123</td>
            </tr>
            <tr>
                <td class="th">OOOOO</td>
                <td><a href="#" class="viewLevel viewLevel-js">wxyz</a> <span class="nickname">(暱稱)</span></td>
                <td>代理</td>
                <td>ABC</td>
                <td>0958660228</td>
                <td>10</td>
                <td>40</td>
                <td>
                    <div class="mui-btn mui-btn--primary mui-btn--small">設定</div>
                </td>
                <td>2016/04/10 12:28:36</td>
                <td>備註備註備註備註</td>
                <td>
                    <div class="mui-btn mui-btn--primary mui-btn--small"><span class="icon icon-pencil"></span></div>
                </td>
                <td>admin123</td>
            </tr>
        </table>--%>
    </div>

<%--    <div class="fixedBottom list text-center">
        <div class="mui-container">
            <div class="pageGroupWrap">
            </div>
        </div>
    </div>--%>

</div>



