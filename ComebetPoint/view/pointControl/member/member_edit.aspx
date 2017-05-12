<%@ Page Language="C#" AutoEventWireup="true" CodeFile="member_edit.aspx.cs" Inherits="view_control_member_auth_setting" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<style>
    .input {
        padding-left: 0;
    }
    .inline {
        width: auto !important;
    }
    .nationNumber {
        width: 6em !important;
    }
    .hidden {
        display: none !important
    }
</style>
<script>
    var pageTitle = '編輯會員資料';
    var lang = {
        'SELECT_TIP': '請選擇',
        'NATION_NUMBER': '國際區碼'
    }
    var nationNumLang = {
        'SELECT_TIP': '請選擇',
    }
    var data = <%=data["d"]%>;
    var banks = <%=filter.GetBanks()%>;
    var nationNumber = <%=filter.GetNationNumbers()%>;
    var sex = <%=filter.GetSex()%>;
    var chinaBanks = <%=filter.GetChinaBanks()%>;
    var chinaMainRegion = <%=filter.GetChinaMainRegions()%>;

    var currencyKeyToId = {
        'CNY': '<%=CurrencyCode.CNY %>'
    }

    <% // 要顯示的幣值區塊, 要處理的區塊加上 class="displayCurrencyWrap-js" data-currency="value" %>
    var displayCurrency = data["w"];
</script>
<div id="memder_edit_wrap">
    <div id="form_box" class="formBoxWrapper">
        <%--應用範例 ===============================================================================================//start --%>
        <div class="mui-panel">
            <h1 class="formBoxTitle">會員 - <span id="username"></span></h1>
            <table class="formBox queryBox">
                <tbody>
                    <tr>
                        <th>變更密碼</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="password" name="password" id="password" placeholder="請設定新密碼" class="filterForm">
                            </div>
                            <small>至少4碼，且包含至少2碼英文</small>
                        </td>
                    </tr>
                    <tr>
                        <th>確認密碼</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="password" name="repassword" id="repassword" placeholder="再次輸入密碼" class="filterForm">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 class="formBoxTitle ">個人資料</h1>
            <table class="formBox queryBox " data-currency="1">
                <tbody>
                    <tr>
                        <th>暱稱</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="nickname" id="nickname" class="filterForm">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">電話</th>
                        <td>
                            <div class="mui-textfield input">
                                <select name="nationNumber" class="select inline">                                    
                                </select>
                            </div>
                            <div class="mui-textfield input">
                                <input type="text" name="phone" id="phone" placeholder="電話號碼" class="filterForm">                         
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
                        <th>LINE</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="line" id="line" class="filterForm">                           
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
                        <th>SKYPE</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="skype" id="skype" class="filterForm">                           
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>會員分數</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="memberScore" id="memberScore" class="filterForm">                           
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>備註</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="memo" id="note" class="filterForm">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 class="formBoxTitle ">提款資料</h1>
            <table class="formBox queryBox ">
                <tbody>
                    <tr>
                        <th class="alignTop">提款密碼</th>
                        <td>
                            <div class="mui-textfield input">
                                <div id="reset_withdraw_pwd-js" class="mui-btn mui-btn--primary mui-btn--small" data-disabled="false">重設提款密碼</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">姓名</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="personalName" placeholder="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">生日</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="birthday" placeholder="ex :2016/10/10">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">性別</th>
                        <td>
                            <div class="mui-textfield input">
                                <select name="sex">
                                    <option value="">未設定</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">身分證字號</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="personalId">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">身分證照片</th>
                        <td class="uploadPic">
                            <div class="mui-textfield input showPic">
                                <img id="img_identityCardPic" src="" width="150" /><br />
                                <div class="mui-btn  mui-btn--raised mui-btn--small mui-btn--primary mui-btn--flat showUploadUI-js">上傳照片</div>                            
                            </div>
                            <div class="mui-textfield uploadPanel hidden">
                                <input type="file" id="identityCardPic" class="imageToBase64-js"  />
                                <input type="hidden" name="identityCardPic" />
                                <div class="red">僅接受 小於 1MB 的 JPG 圖片</div>
                                <div class="mui-btn  mui-btn--raised mui-btn--small mui-btn--primary mui-btn--flat uploadCancel-js">取消上傳</div> 
                            </div>                        
                        </td>
                    </tr>
                    <tr class="displayCurrencyWrap-js" data-currency="<%=CurrencyCode.TWD %>">
                        <th class="alignTop">銀行名稱</th>
                        <td>
                            <div class="mui-textfield input">
                                <select name="bankId" id="bankId" class="select">
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr class="displayCurrencyWrap-js" data-currency="<%=CurrencyCode.CNY %>">
                        <th class="alignTop">銀行名稱</th>
                        <td>
                            <div class="mui-textfield input">
                                <select name="bankId" id="bankId_china" class="select">
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr class="displayCurrencyWrap-js" data-currency="<%=CurrencyCode.CNY %>">
                        <th class="alignTop">地區1</th>
                        <td>
                            <div class="mui-textfield input">
                                <select name="chinaMainRegion" id="china_main_region" class="select">
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr class="displayCurrencyWrap-js" data-currency="<%=CurrencyCode.CNY %>">
                        <th class="alignTop">地區2</th>
                        <td>
                            <div class="mui-textfield input">
                                <select name="chinaSubRegion" id="china_sub_region" class="select">
                                    <option selected disabled>請選擇</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">戶名</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="accountName">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">存款簿帳號</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="accountNum">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">分行</th>
                        <td>
                            <div class="mui-textfield input">
                                <input type="text" name="bankBranch">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="alignTop">存款簿照片</th>
                        <td class="uploadPic">
                            <div class="mui-textfield input showPic">
                                <img id="img_bankbookPic" src="" width="150" /><br />
                                <div class="mui-btn  mui-btn--raised mui-btn--small mui-btn--primary mui-btn--flat showUploadUI-js">上傳照片</div>
                            </div>
                            <div class="mui-textfield uploadPanel hidden">
                                <input type="file" id="bankbookPic" class="imageToBase64-js"  />
                                <input type="hidden" name="bankbookPic" />
                                <div class="red">僅接受 小於 1MB 的 JPG 圖片</div>
                                <div class="mui-btn  mui-btn--raised mui-btn--small mui-btn--primary mui-btn--flat uploadCancel-js">取消上傳</div> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <div id="" class="mui-btn mui-btn--primary submitBtn update-js" data-disabled="false"><i class="icon-spinner"></i>儲存</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <%--應用範例 ===============================================================================================//end --%>
    </div>
</div>