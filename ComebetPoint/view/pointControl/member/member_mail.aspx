<%@ Page Language="C#" AutoEventWireup="true" CodeFile="member_mail.aspx.cs" Inherits="view_control_report_sportlottery_list" %>

<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="WebModules.Http" %>
<%= Global.google_analytics_script %>

<style>
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
</style>

<script>
    var pageTitle = '會員站內信發送';
    var typeLang = {
        'SELECT_TIP': '請選擇'
    }
    var mailTypes = <%=filter.GetSiteMailTypes()%>;
</script>

<div id="form_box" class="formBoxWrapper">


    <div class="mui-panel">

        <h1 class="formBoxTitle">發送站內信 至會員 : <span id="toUsername"></span></h1>
        <table class="formBox queryBox">
            <tbody>
                <tr>
                    <th>類型</th>
                    <td>
                        <div id="type" class="mui-textfield input"></div><br />
                    </td>
                </tr>
                <tr>
                    <th>標題 <br />(上限100字)</th>
                    <td>
                        <div class="mui-textfield input">
                            <input type="text" name="title" class="filterForm">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>內容 <br />(上限500字)</th>
                    <td>
                        <div class="mui-textfield input">
                            <textarea name="value" class="filterForm" onkeydown
                                ="view.autogrow(this);" style="resize:none;overflow:hidden;"></textarea>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        <div id="btnCreat" class="mui-btn mui-btn--primary submitBtn addAccount-js" data-disabled="false"><i class="icon-spinner"></i>新增</div>
                        <button type="reset" class="hidden" id="resetForm"></button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>

</div>
