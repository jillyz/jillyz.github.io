<%@ Page Language="C#" AutoEventWireup="true" CodeFile="auth_setting.aspx.cs" Inherits="view_control_member_auth_setting" %>

<link href="/css/pointControl/member/auth_setting.css?_=<%=Global.clear_cache %>" rel="stylesheet" />

<script>
    var pageTitle = '權限設定/查看';

    var lang = {

        'AUTH_SETTING_PAGE_TITLE_MY': '我的',
        'AUTH_SETTING_PAGE_TITLE_CAN_EDIT_TRUE': '權限設定',
        'AUTH_SETTING_PAGE_TITLE_CAN_EDIT_FALSE': '權限檢視',

        'AUTH_SETTING_UP_LEVEL_AUTH_IS_CLOSED': '上層關',
        'AUTH_SETTING_TIP_WILL_EFFECT_UNDER_LEVEL': '以下權限轉為「關閉」，儲存後會影響下層權限！',
        'AUTH_SETTING_DIALOG_BTN_SUBMIT': '確定儲存',
        'AUTH_SETTING_DIALOG_BTN_CANCEL': '取消'
    }

    var pageGroup = <%=filter.GetPageAuthGroups()%>;
    var pageUrl = <%=data["url"]%>;
    var pageName =<%=data["lang"]%>;
    var canEdit =<%=data["canEdit"].ToString().ToLower() %>;

    var data = <%=data["d"]%>;

    var myId = <%=memberId_current_user%>;
    var isLookSelf = false;

</script>

<div id="form_box" class="settingBox">
    <div  class="mui-panel">

        <h1 class="formBoxTitle fixed">
            <span class="mui-btn mui-btn--primary btnToggleAll btnToggleAll-js" data-open="false">
                <span class="iconOpen"><span class="icon icon-down-open"></span> 展開 </span>
                <span class="iconClose"><span class="icon icon-up-open"></span> 收起 </span>
            </span>
            <span id="authPgaeTitle"></span>
        </h1>
        <div id="settings">

        </div>

<%--        <div class="group">
            <div class="inline btnPageGroup toggleGroup-js" data-id="5">
                <div class="inline">
                    <span class="icon icon-down-open icon-toggle"></span>
                    <span class="hidden icon icon-up-open icon-toggle"></span>
                    人事管理
                </div>
                <div class="icon-gogog btnSelectAll-js">
                    <i class="icon-blank hidden"></i>
                    <i class="icon-ok-squared"></i>
                </div>
            </div>
            <div class="noSelect fillForm">
                <div>
                    <input type="checkbox" name="option" id="chk_dt1">
                    <label for="chk_dt1">下級代理查詢</label>
                </div>
                <div>
                    <input type="checkbox" name="option" id="chk_dt2">
                    <label for="chk_dt2">下級代理查詢</label>
                </div>
                <div>
                    <input type="checkbox" name="option" id="chk_dt3">
                    <label for="chk_dt3">下級代理查詢</label>
                </div>
                <div>
                    <input type="checkbox" name="option" id="chk_dt4">
                    <label for="chk_dt4">下級代理查詢</label>
                </div>
            </div>        
        </div>--%>

    </div>
</div>

<div id="submit_box" class="fixedBottom list text-center">
    <div>
        <input type="checkbox" id="all" class="btnAllSelect" />
        <div id="submit" class="mui-btn mui-btn--primary submitBtn save-js" data-disabled="false"><i class="icon-spinner"></i>儲存</div>
    </div>
</div>


<div id="dialog" class="dialogDelete myModal">
    <div class="myModalContent">
    </div>
</div>
