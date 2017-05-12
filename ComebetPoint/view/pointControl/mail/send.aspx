<%@ Page Language="C#" AutoEventWireup="true" CodeFile="send.aspx.cs" Inherits="view_control_report_sportlottery_list" %>

<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="WebModules.Http" %>
<%= Global.google_analytics_script %>

<style>
    .formBoxTitle {
        margin-top: -.5em;
        padding-bottom: .25em;
        font-size: 1.5em;
    }
    .panelWrap {
        height: calc(100vh - 200px);
        overflow: auto;
    }
    .input {
        padding-left: 0;
    }
    .select {
        width: 100% !important;
        padding: .5em;
    }
    .mui-select>select,
    .mui-select__menu {
        font-size: 13px;
    }
    .full {
        width: 100% !important;
    }
    .noSelect {
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    .group {
        margin: 1em 0;
        padding: .5em;
        background-color: #f4f4f4;
        color: #333;
        cursor: pointer;
    }
    .mItem {
        width: 120px;
    }
    .fillForm input[type="checkbox"] + label {
        margin-bottom: 3px;
        padding: 3px;
        font-size: 11px;
    }
    /*----------*/
    .groupWrap > .group > .ic-up {
        display: none;
    }
    .groupWrap > .group > .ic-down {
        display: inline-block;
    }
    .groupWrap.isOpen > .group > .ic-up {
        display: inline-block;
    }
    .groupWrap.isOpen > .group > .ic-down {
        display: none;
    }
    .groupWrap > .items {
        display: none;
    }
    .groupWrap.isOpen > .items {
        display: block;
    }
    /*-------------------*/
    .input.error {
        margin-bottom: 3em;
    }
    /*--------------------*/
    .toggleCompany {
        margin-top: -8px; 
        margin-left: -8px;
        padding: 0 .5em;
    }
    .formBoxWrapper .mui-panel {
        margin: 1%;
    }
    .companyWrap {
        float: left; 
        display: block;
        width: 23% !important;
        margin-right: 0 !important; 
    }
    .membersWrap {
        float: left; 
        width: 40% !important; 
        margin: 1% 0 !important;
    }
    .companyWrap.hidden {
        display: none;
    }
    .membersWrap.expand {
        width: 63% !important;
        margin-left: 1% !important;
    }
    .mailWrap {
        float: left; 
        width: 34% !important; 
        margin: 1%;
    }
</style>

<script>
    var pageTitle = '<%=dic_page_id_lang_map["PATH_GROUP_SITEMAIL_MANAG"]%>';

    var lang = {
        'MAIL_SEND_TIP_NO_MEMBER': '<%=dic_page_id_lang_map["MODEL_LANG_11"]%>'
    }

    var companyTreeLang = {
        'COMPANY_TREE_TIP_PLAESE_SELECT': '<%=dic_page_id_lang_map["COMPANY_MODEL_1"]%>',
        'COMPANY_TREE_TIP_SELECTED_COUNT': '<%=dic_page_id_lang_map["COMPANY_MODEL_2"]%>',
        'COMPANY_TREE_TITLE_TOTAL_NEXT_LEVEL': '<%=dic_page_id_lang_map["COMPANY_MODEL_3"]%>',
        'COMPANY_TREE_TITLE_TOTAL_MEMBERS': '<%=dic_page_id_lang_map["COMPANY_MODEL_4"]%>',
        'COMPANY_TREE_OPTION_COMPANY_ALL': '<%=dic_page_id_lang_map["COMPANY_MODEL_5"]%>',
        'COMPANY_TREE_OPTION_COMPANY_SPECIFIED': '<%=dic_page_id_lang_map["COMPANY_MODEL_6"]%>',
        'COMPANY_TREE_BTN_TOGGLE_NEXT_LEVEL': '<%=dic_page_id_lang_map["COMPANY_MODEL_7"]%>',
        'COMPANY_TREE_BTN_ALL': '<%=dic_page_id_lang_map["ALL_SELECT"]%>',
        'COMPANY_TREE_LABEL_HAS_NODES_NOT_EXPAND': '<%=dic_page_id_lang_map["COMPANY_MODEL_8"]%>',
        'COMPANY_TREE_LABEL_NO_NODE_NEXT_LEVEL': '<%=dic_page_id_lang_map["COMPANY_MODEL_9"]%>',
        'COMPANY_TREE_EMPTY_DATA': '<%=dic_page_id_lang_map["COMPANY_MODEL_10"]%>'
    }
    var typeLang = {
        'SELECT_TIP': '<%=dic_page_id_lang_map["PLEASE_SELECT"]%>'
    }
    var companys = <%=filter.GetAllCompanys() %>;
    var companyIdCurrentUser = <%=companyId_current_user%>
    var mailTypes = <%=filter.GetSiteMailTypes()%>;

</script>

<script src="/js/pointControl/module/company_tree.js?_=<%=Global.clear_cache %>"></script>

<div id="form_box" class="formBoxWrapper">

    <div class="mui-panel companyWrap">
        <h1 class="formBoxTitle"><%=dic_page_id_lang_map["C_MC_COMPANY"]%></h1>
        <div class="panelWrap">
            <div id="companysTree" class="input noSelect companysTree"></div>
            <button class="mui-btn mui-btn--primary saveBtn getMembers-js"><%=dic_page_id_lang_map["MODEL_LANG_13"]%></button>
        </div>
    </div>

    <div class="mui-panel membersWrap">
        <div class="mui-btn mui-btn--default mui--pull-left toggleCompany closeCompany-js">
            <i class="icon-angle-double-left"></i>
        </div>
        <div class="mui-btn mui-btn--default mui--pull-left toggleCompany openCompany-js hidden">
            <i class="icon-angle-double-right"></i>
        </div>
        <h1 class="formBoxTitle"><%=dic_page_id_lang_map["MODEL_LANG_10"]%></h1>
        <div id="memberList" class="panelWrap fillForm">            
            <div class="mui--text-center" style=" margin-top: 15vh; font-size: 2em; color: #ccc;">
                <i class="icon-attention" style="font-size: 5em; font-weight: bold;"></i><br /> <br />
                <i class="icon-left-hand"></i> <%=dic_page_id_lang_map["MODEL_LANG_9"]%>
            </div>
        </div>
    </div>

    <div class="mui-panel mailWrap">

        <h1 class="formBoxTitle"><%=dic_page_id_lang_map["MODEL_LANG_8"]%><span id="toUsername"></span></h1>
        <div class="panelWrap">
            <table class="formBox queryBox full">
                <tbody>
                    <tr>
                        <td>
                            <%=dic_page_id_lang_map["C_MC_TYPE"]%>
                            <div id="type" class="mui-textfield input"></div>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <%=dic_page_id_lang_map["TITLE"]%> (<%=dic_page_id_lang_map["CONTENT_LIMIT"]%> :100)
                            <div class="mui-textfield input full">
                                <input type="text" name="title" class="filterForm full">
                            </div>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <%=dic_page_id_lang_map["CONTENT"]%> (<%=dic_page_id_lang_map["CONTENT_LIMIT"]%> :500)
                            <div class="mui-textfield input full">
                                <textarea name="value" class="filterForm full" onkeydown="view.autogrow(this);" style="resize:none;overflow:hidden;"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr id="noMembersTipWrap">
                        <td>
                            <button class="mui-btn mui-btn--primary full" disabled style="background-color: #eee; color: #333;">
                                <i class="icon-left-hand"></i> <%=dic_page_id_lang_map["PATH_GROUP_SITEMAIL_MANAG"]%>
                            </button>
                        </td>
                    </tr>
                    <tr id="sendWrap" class="hidden">
                        <td>
                            <button id="btnCreat" class="mui-btn mui-btn--primary submitBtn sendMail-js" data-disabled="false"><i class="icon-spinner"></i><%=dic_page_id_lang_map["GSC_SEND_TEXT"]%></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>
