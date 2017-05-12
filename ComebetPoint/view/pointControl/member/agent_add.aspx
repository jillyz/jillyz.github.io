<%@ Page Language="C#" AutoEventWireup="true" CodeFile="agent_add.aspx.cs" Inherits="view_alert_danger_bill" %>
<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.Utils" %>
<%@ Import Namespace="WebModules.Http" %>
<%= Global.google_analytics_script %>
<link href="/css/pointcontrol/member/agent_add.css?_=<%=Global.clear_cache %>" rel="stylesheet" />
<style>
    .input .error-message {
        padding-left: 0;
    }
</style>
<script>
    var pageTitle = '新增下級代理';

    var lang = {
        'AGENT_ADD_PASSWORD_HIDE': '隱藏密碼',
        'AGENT_ADD_PASSWORD_SHOW': '顯示密碼'
    }
    var nationNumLang = {
        'SELECT_TIP': '請選擇',
    }
    var nationNumber = <%=filter.GetNationNumbers() %>;

    var isSa = <%=data["isSa"].ToString().ToLower() %>;
</script>

<div id="form_box" class="formBoxWrapper">
    <div class="mui-panel">
        <h1 class="formBoxTitle">新增下級代理</h1>
        <table class="formBox queryBox">
            <tbody>
                <tr>
                    <th class="alignTop">帳號</th>
                    <td>
                        <div class="mui-textfield hasMsg input">
                            <input type="text" name="username" id="username" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" class="filterForm url-js">
                            <span class="msgYes hidden"><i class="icon-ok"></i></span>
                            <span class="msgNo hidden"><i class="icon-cancel-1"></i> 已被使用</span>
                        </div>
                        <small class="tip">帳號至少4碼；可接受英文、數字、底線。<br />帳號亦將用於分站網址</small>
                    </td>
                </tr>                
                <tr>
                    <th class="alignTop">密碼</th>
                    <td class="hasBtn">
                        <div class="mui-textfield input">
                            <input type="password" name="password" id="password" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" class="filterForm">
                            <a class="inInputBtn pwToggle-js noSelect">顯示密碼</a>
                        </div>
                        <small class="tip">密碼至少4碼，且包含至少2碼英文</small>
                    </td>
                </tr>
                <tr>
                    <th>暱稱</th>
                    <td>
                        <div class="mui-textfield hasMsg input">
                            <input type="text" name="nickname" id="nickname" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" class="filterForm">
                            <span class="msgYes hidden"><i class="icon-ok"></i></span>
                            <span class="msgNo hidden"><i class="icon-cancel-1"></i> 已被使用</span>                 
                        </div>
                    </td>
                </tr>
                <%--<tr>
                    <th>權限</th>
                    <td>
                        <div class="mui-textfield input">
                            <div id="btnSetting" class="mui-btn mui-btn--raised mui-btn--raised mui-btn--primary setAuthority-js"><i class="icon-cog"></i> 設定權限</div>
                        </div>
                        <div class="getContentList-js"></div>
                    </td>
                </tr>--%>
                <tr>
                    <th class="alignTop">電話</th>
                    <td>
                        <div class="mui-textfield input">
                            <select name="nationNumber" class="select inline filterForm">                                    
                            </select>
                        </div>
                        <div class="mui-textfield input">
                            <input type="text" name="phone" id="phone" placeholder="電話號碼"  class="filterForm">                         
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>EMAIL</th>
                    <td>
                        <div class="mui-textfield input">
                            <input type="text" name="email" id="email" class="filterForm">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>WECHAT</th>
                    <td>
                        <div class="mui-textfield input">
                            <input type="text" name="wechat" id="wechat" class="filterForm">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>LINE</th>
                    <td>
                        <div class="mui-textfield input">
                            <input type="text" name="line" id="line" class="filterForm">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>備註</th>
                    <td>
                        <div class="mui-textfield input">
                            <input type="text" name="memo" id="memo" class="filterForm">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <h1 class="formBoxTitle">分站</h1>
        <table class="formBox queryBox">
            <tbody>
                <tr>
                    <th>站名</th>
                    <td>
                        <div class="mui-textfield input">
                            <input type="text" name="companyTitle" id="companyTitle" class="filterForm">
                        </div>
                    </td>
                </tr>
                <tr class="isSa">
                    <th>指定域名</th>
                    <td>
                        <div>
                            <input type="text" name="domain" id="domain" class="filterForm" placeholder="ex : abc.net">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>網址</th>
                    <td>
                        <div>
                            <br />
                            入口頁：<br />
                            <span id="portalUrl" class="lightBlue bold"><%--sitename.point.net--%></span><br />
                            管理端：<br />
                            <span id="admintUrl" class="lightBlue bold"><%--sitename.point.net/admin--%></span><br />
                            **網址前綴，同此代理帳號**
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <h1 class="formBoxTitle"></h1>
        <table>
            <tbody>
                <tr>
                    <th>　　　　　　　</th>
                    <td>
                        <div id="btnAdd" class="mui-btn mui-btn--primary submitBtn addAgent-js" data-disabled="false"><i class="icon-spinner"></i>新增</div>
                        <button type="reset" class="hidden" id="resetForm"></button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>


</div>

