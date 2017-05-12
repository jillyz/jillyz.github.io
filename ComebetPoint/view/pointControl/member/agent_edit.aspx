<%@ Page Language="C#" AutoEventWireup="true" CodeFile="agent_edit.aspx.cs" Inherits="view_control_member_auth_setting" %>
<%@ Import Namespace="ClassLibrary" %>
<%@ Import Namespace="ClassLibrary.Define" %>
<%@ Import Namespace="ClassLibrary.GameDefine" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>

<link href="/css/control/member/edit_credit.css?_=<%=Global.clear_cache %>" rel="stylesheet" />
<link href="/css/pointControl/member/agent_edit.css?_=<%=Global.clear_cache %>" rel="stylesheet" />

<script>
    var pageTitle = '編輯代理資料';
    var lang = {
        'SELECT_TIP': '請選擇',
        'NATION_NUMBER': '國際區碼',
        'AGENT_EDIT_SETTING_LABEL_LIVE_TOP_LIMIT': '真人峰頂上限(萬)',
        'AGENT_EDIT_SETTING_LABEL_PERCENT': '佔成(%)',
        'AGENT_EDIT_SETTING_LABEL_FEEDBACK': '返水',
        'AGENT_EDIT_SETTING_LABEL_IS_OPEN': '開放',
        'AGENT_EDIT_SETTING_LABEL_LIMIT': '限注',
        'AGENT_EDIT_SETTING_LABEL_LIMIT_HIDE': '顯示限注',
        'AGENT_EDIT_SETTING_LABEL_LIMIT_SHOW': '隱藏限注',
        'AGENT_EDIT_SETTING_LABEL_QUICK_SET': '快速設定',
        'AGENT_EDIT_SETTING_LABEL_GAME': '遊戲',
        'AGENT_EDIT_SETTING_LABEL_GAME_ALL': '全部遊戲',
        'AGENT_EDIT_SETTING_LABEL_TEN_THOUSAND': '萬',
        'AGENT_EDIT_SETTING_TIP_LIVE_TOP_LIMIT': '峰頂上限僅針對單一會員，表示該會員手上餘額不可大於此設定值，0代表無限制',
        'AGENT_EDIT_SETTING_CONFIRM_FORCE_SUBMIT': '強制設定',
        'AGENT_EDIT_SETTING_CONFIRM_CANCEL': '取消',
        'MEMBER_EXCHANGE_AMOUNT_NOT_LOCKED': '<%=dic_page_id_lang_map["MEMBER_EXCHANGE_AMOUNT_NOT_LOCKED"]%>',
        'C_ANNOUNCE_CATEGORY_LABEL': '<%=dic_page_id_lang_map["C_ANNOUNCE_CATEGORY_LABEL"]%>',
        'ALL': '<%=dic_page_id_lang_map["ALL"]%>',
        'PARLAY_MIX': '<%=dic_page_id_lang_map["PARLAY_MIX"]%>',
        'MEMBER_PERCENT_LABEL': '<%=dic_page_id_lang_map["MEMBER_PERCENT_LABEL"]%>',
        'CAN_BE_BET': '<%=dic_page_id_lang_map["CAN_BE_BET"]%>',
        'GSC_DISPLAY_TEXT': '<%=dic_page_id_lang_map["GSC_DISPLAY_TEXT"]%>',
        'QUICK_SETTING': '<%=dic_page_id_lang_map["QUICK_SETTING"]%>',
        'IS_FORCE':'<%=dic_page_id_lang_map["SPORT_CFG_IS_FORCE"]%>',
        'IN_PLAY':'<%=dic_page_id_lang_map["IN_PLAY"]%>',
        'IN_PLAY_DELAY':'<%=dic_page_id_lang_map["SPORT_CFG_BT_DELAY"]%>',
        'SPORT_SET_ALL':'<%=dic_page_id_lang_map["SPORT_SET_ALL"]%>',
        'CLOSE':'<%=dic_page_id_lang_map["CLOSE"]%>',
        'OK':'<%=dic_page_id_lang_map["OK"]%>',
        'WATER_FEEDBACK':'<%=dic_page_id_lang_map["WATER_FEEDBACK"]%>',
        'SCHEDULE_BOUND':'<%=dic_page_id_lang_map["SCHEDULE_BOUND"]%>', // 單場上限
        'SINGLE_MAX':'<%=dic_page_id_lang_map["SINGLE_MAX"]%>', // 單隊上限
        'ONE_BET_MAX':'<%=dic_page_id_lang_map["ONE_BET_MAX"]%>', // 單注上限
        'COMPANY_PARLAY_MIX_WIN_UPPER_BOUND':'<%=dic_page_id_lang_map["COMPANY_PARLAY_MIX_WIN_UPPER_BOUND"]%>', // 綜和過關最大可贏彩金
        'COMPANY_PARLAY_WIN_UPPER_BOUND':'<%=dic_page_id_lang_map["COMPANY_PARLAY_WIN_UPPER_BOUND"]%>', // 過關最大可贏彩金
        'PARLAY_MIX_TIMES':'<%=dic_page_id_lang_map["PARLAY_MIX_TIMES"]%>', // 綜和過關數
        'PARLAY_TIMES':'<%=dic_page_id_lang_map["PARLAY_TIMES"]%>', // 過關數
        <% foreach (var gameTypeId in ClassLibrary.Glbv.dic_gameTypeIdToLangMap) { %>
        'GAMETYPE<%=gameTypeId.Key %>': '<%=dic_page_id_lang_map[gameTypeId.Value] %>',
        <% } %>
        <% foreach (var sectionId in ClassLibrary.Glbv.dic_sectionIdToLangMap) { %>
        'SECTION<%=sectionId.Key %>': '<%= dic_page_id_lang_map[sectionId.Value] %>',
        <% } %>
        <% foreach (var betTypeId in ClassLibrary.Glbv.dic_betTypeIdToLangMap) { %>
        'BETTYPE<%=betTypeId.Key %>': '<%= dic_page_id_lang_map[betTypeId.Value] %>',
        <% } %>
    }
    var nationNumLang = {
        'SELECT_TIP': '請選擇',
    }
    var data = <%=data["d"]%>;

    var nationNumber = <%=filter.GetNationNumbers()%>;

    var walletTypes = <%=filter.GetWalletTypes() %>;
    var walletTypeExclude = {
        '<%=PointControl.Wallet.Define.WalletTypes.System %>':'',
        '<%=PointControl.Wallet.Define.WalletTypes.MainWallet %>':''
    };

    var cashFlowSuppliers = <%=filter.GetCashFlowSuppliers()%>;

    var isCanEditSc = <%=data["isCanEditScheduleSetting"].ToString().ToLower()%>;

    // 賽事設定 ===========================================
    var royalType = <%=filter.GetRoyalGameTypes()%>;
    var allbetType = <%=filter.GetAllbetGameTypes()%>;
    var ultxType = <%=filter.GetUltxGameTypes()%>;
    var mayaType = <%=filter.GetMayaGameTypes()%>;
    var howType = [
        {'id': 'g1', 'name': lang.AGENT_EDIT_SETTING_LABEL_GAME_ALL}
    ]
    var uc8Type = [
        {'id': 'c1', 'name': lang.AGENT_EDIT_SETTING_LABEL_GAME_ALL}
    ]
    var qtechType = [
        {'id': 'f1', 'name': lang.AGENT_EDIT_SETTING_LABEL_GAME_ALL}
    ]

    // 體育 //---------------------------------------

    var memberLevelId = <%=MemberLevel.MEMBER%>;
    <% //代表目前操作者的會員id %>
    var memberIdCurrentUser = <%=memberId_current_user%>;

    <% /*
        k=該會員體育
        l=該會員歐博
        y=該會員瑪雅
        m=該會員皇家
        C=該會員豪彩
        n=該會員UC8
        A=該會員QTech
        o=該會員遊聯

        p=上層體育
        q=上層歐博
        z=上層瑪雅
        r=上層皇家
        D=上層豪彩
        s=上層UC8
        B=上層QTech
        t=上層游聯
        */ %>

    var scheduleSetting_parent = data['p'];
    var scheduleSetting_member = data['k'];
    var forceCloseGame = {<%=GameTypeIds.SPECIALEVENT%>: true}

    var gameTypeIdToBallTypeId = {
        <% foreach (JProperty jp_b in Glbv.jt_bgs_struct) foreach (JProperty g in jp_b.Value)
               { %>
        '<%=g.Name%>': '<%= Glbv.dic_gameTypeIdToBallTypeId[g.Name]%>',
        <% } %>
    }

    var isOpenStatus = {
        'true': '<%=BetStatus.OPEN%>',
        'false': '<%=BetStatus.CLOSE%>'
    }

    var sportcfg = {
        gameTypeIdToBallTypeId: {
        <% foreach (JProperty jp_b in Glbv.jt_bgs_struct) foreach (JProperty g in jp_b.Value)
               { %>
            '<%=g.Name%>': '<%= Glbv.dic_gameTypeIdToBallTypeId[g.Name]%>',
        <% } %>
        },
        gameTypeIdToName: {
            <% foreach (var g in Glbv.dic_gameTypeIdToLangMap)
               { %>
            '<%=g.Key%>': '<%= dic_page_id_lang_map[g.Value]%>',
            <% } %>
        },
        gameOpenBetType: {
            <% foreach (Newtonsoft.Json.Linq.JProperty ballType in ClassLibrary.Glbv.jt_bgs_struct) foreach (Newtonsoft.Json.Linq.JProperty gameType in ballType.Value)
                   { %>
            '<%=gameType.Name%>': {
                <% foreach (Newtonsoft.Json.Linq.JProperty sectionType in gameType.Value)
                   { %>
                '<%=sectionType.Name%>': {
                        <% foreach (Newtonsoft.Json.Linq.JProperty betType in sectionType.Value)
                           { %>
                        '<%=betType.Name%>': '',
                        <% } %>
                    },
                <% } %>
            },
            <% } %>
        },
        gameTypeSortList: function () {
            <% //裡面列出來的是要至頂排序的球類 %>
            var sortAry = {'#<%=GameTypeIds.BASEBALL_MLB %>': '',
                '#<%=GameTypeIds.BASEBALL_NPB %>':'', 
                '#<%=GameTypeIds.BASEBALL_KPB %>':'', 
                '#<%=GameTypeIds.BASEBALL_TB %>':'', 
                '#<%=GameTypeIds.BASEBALL %>':'', 
                '#<%=GameTypeIds.BASKETBALL_NBA %>':'',
                '#<%=GameTypeIds.BASKETBALL_EUP %>':'',  
                '#<%=GameTypeIds.BASKETBALL %>':'',  
                '#<%=GameTypeIds.SOCCER %>':'',  
                '#<%=GameTypeIds.SOCCERWC %>':'' }

            for (var gameTypeId in sportcfg.gameOpenBetType) {
                if (sortAry[gameTypeId] !== undefined) {
                    continue;
                }

                sortAry['#' + gameTypeId]  = '';
            }

            return sortAry;
        },
        sectionCombineName: {
            '<%=SectionIds.SINGLE_SECTION1 %>': '<%=dic_page_id_lang_map["SINGLE_SECTION"]%>',
            '<%=SectionIds.IN_PLAY_SINGLE_SECTION1 %>': '<%=dic_page_id_lang_map["IN_PLAY_SINGLE_SECTION"]%>',
        },
        sectionCombineMap: function (gameTypeId) {
            var needSerial = {};
            var nonSerial = {};

            var sectionLoopData = sportcfg.gameOpenBetType[gameTypeId];
            for (var s in sectionLoopData) {
                var isSerial = isNeedSerial(s);

                if (isSerial !== false) {
                    if (needSerial[isSerial] === undefined) {
                        needSerial[isSerial] = [];
                    } else {
                        needSerial[isSerial] = needSerial[isSerial].split('-');
                    }
                    
                    needSerial[isSerial].push(s);
                    needSerial[isSerial] = needSerial[isSerial].join('-');
                } else {
                    nonSerial[s] = sectionLoopData[s];
                    nonSerial[s]['combine'] = s;
                }
            }

            for (var s in needSerial) {
                nonSerial[s] = sectionLoopData[s];
                nonSerial[s]['sectionName'] = sportcfg.sectionCombineName[s];
                nonSerial[s]['combine'] = needSerial[s];
            }

            function isNeedSerial(sectionId) {
                switch (sectionId) {
                    case '<%=SectionIds.SINGLE_SECTION1 %>':
                    case '<%=SectionIds.SINGLE_SECTION2 %>':
                    case '<%=SectionIds.SINGLE_SECTION3 %>':
                    case '<%=SectionIds.SINGLE_SECTION4 %>':
                        return '<%=SectionIds.SINGLE_SECTION1 %>';
                    case '<%=SectionIds.IN_PLAY_SINGLE_SECTION1 %>':
                    case '<%=SectionIds.IN_PLAY_SINGLE_SECTION2 %>':
                    case '<%=SectionIds.IN_PLAY_SINGLE_SECTION3 %>':
                    case '<%=SectionIds.IN_PLAY_SINGLE_SECTION4 %>':
                        return '<%=SectionIds.IN_PLAY_SINGLE_SECTION1 %>';
                    break;
                }

                return false;
            }

            return nonSerial;
        },
        isInPlaySectionId: {
            '<%=SectionIds.IN_PLAY %>':'',
            '<%=SectionIds.IN_PLAY_DOWN_HALF %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING1 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING2 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING3 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING4 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING5 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING6 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_INNING7 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SECTION1 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SECTION2 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SECTION3 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SECTION4 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SET1 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SET2 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SET3 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SET4 %>':'',
            '<%=SectionIds.IN_PLAY_SINGLE_SET5 %>':'',
            '<%=SectionIds.IN_PLAY_SPECIAL_BET %>':'',
            '<%=SectionIds.IN_PLAY_UP_HALF %>':'',
            '<%=SectionIds.IN_PLAY_UP_HALF_SPECIAL_BET %>':'',
        },
        ballTypeNameToId: {
            'BASEBALL': '<%=BallTypeIds.BASEBALL%>',
            'SOCCER': '<%=BallTypeIds.SOCCER%>',
        },
        gameTypeName: {
            SOCCER: '<%=GameTypeIds.SOCCER%>',
            SOCCERWC: '<%=GameTypeIds.SOCCERWC%>',
        },
        sectionTypeMap: {
            PARLAY: '<%=SectionIds.PARLAY%>',
            IN_PLAY: '<%=SectionIds.IN_PLAY%>',
            SPECIAL_BET: '<%=SectionIds.SPECIAL_BET%>',
            IN_PLAY_SPECIAL_BET: '<%=SectionIds.IN_PLAY_SPECIAL_BET%>',
            UP_HALF_SPECIAL_BET: '<%=SectionIds.UP_HALF_SPECIAL_BET%>',
            IN_PLAY_UP_HALF_SPECIAL_BET: '<%=SectionIds.IN_PLAY_UP_HALF_SPECIAL_BET%>',
        },
        betTypeMap: {
            RUNLINE: '<%=BetTypeIds.RUNLINE%>',
        },
        spBetTypeNameToId: {
            CS: '<%=BetTypeIds.CS%>',
            GET_FIRST_SCORE: '<%=BetTypeIds.GET_FIRST_SCORE%>',
            GET_LAST_SCORE: '<%=BetTypeIds.GET_LAST_SCORE%>',
        },
        isSpecialSection: {
            '<%=SectionIds.SPECIAL_BET%>': true,
            '<%=SectionIds.IN_PLAY_SPECIAL_BET%>': true,
            '<%=SectionIds.UP_HALF_SPECIAL_BET%>': true,
            '<%=SectionIds.IN_PLAY_UP_HALF_SPECIAL_BET%>': true,
            '<%=SectionIds.DOWN_HALF_SPECIAL_BET%>': true,
            '<%=SectionIds.IN_PLAY_DOWN_HALF_SPECIAL_BET%>': true,
        },
        hasRunlineSet: {
            '<%=SectionIds.GAME_LINES%>': '',
            '<%=SectionIds.IN_PLAY%>': '',
            '<%=SectionIds.PARLAY%>': '',
        },
        betTypeIdMap: {
            'RUNLINE': '<%=BetTypeIds.RUNLINE%>',
            'RUNLINE_GAME': '<%=BetTypeIds.RUNLINE_GAME%>',
            'RUNLINE_SET': '<%=BetTypeIds.RUNLINE_SET%>',
            'TOTAL': '<%=BetTypeIds.TOTAL%>',
            'TOTAL_GAME': '<%=BetTypeIds.TOTAL_GAME%>',
            'OE': '<%=BetTypeIds.OE%>',
            'OE_GAME': '<%=BetTypeIds.OE_GAME%>',
            'CS': '<%=BetTypeIds.CS%>',
            'GET_FIRST_SCORE': '<%=BetTypeIds.GET_FIRST_SCORE%>',
            'GET_LAST_SCORE': '<%=BetTypeIds.GET_LAST_SCORE%>',
        },
        betStatus:{
            'true': '<%=BetStatus.OPEN%>',
		    'false': '<%=BetStatus.CLOSE%>'
		},
        soccerOddType: {
			<%foreach (var type in Glbv.dic_soccerOddType)
     { %>
		    '<%=type.Key%>':'<%=type.Key%>',
			<%} %>
		},
        betFieldMap: {
            IS_OPEN: '<%=BetLimit.IS_OPEN%>', //i
            FEEDBACK: '<%=BetLimit.FEEDBACK%>', //f
            SINGLE_MAX: '<%=BetLimit.SINGLE_MAX%>', //s
            ONE_BET_MAX: '<%=BetLimit.ONE_BET_MAX%>', //o
            EACH_SINGLE_DIFF: '<%=BetLimit.EACH_SINGLE_DIFF%>', //e
            PARLAY_MIX_IS_OPEN: '<%=BetLimit.PARLAY_MIX_IS_OPEN%>',
            SOCCER_ODD_TYPE: '<%=BetLimit.SOCCER_ODD_TYPE%>', //d
            EACH_SINGLE_DIFF: '<%=BetLimit.EACH_SINGLE_DIFF%>', //e
            PARLAY_MAX_AMOUNT: '<%=BetLimit.PARLAY_MAX_AMOUNT%>', //a
            CS_MAX_AMOUNT: '<%=BetLimit.CS_MAX_AMOUNT%>', //g
            OWN_PERCENT: '<%=BetLimit.OWN_PERCENT%>', //p
            PARLAY_MIX_MAX: '<%=BetLimit.PARLAY_MIX_MAX%>', //k
            DELAY: '<%=BetLimit.DELAY %>', //y
            ONE_BET_MIN: '<%=BetLimit.ONE_BET_MIN %>', //n
            PARLAY_IS_OPEN: '<%=BetLimit.PARLAY_IS_OPEN %>', //b
            PARLAY_MAX: '<%=BetLimit.PARLAY_MAX %>', //l
            PARLAY_MIX_MAX_AMOUNT: '<%=BetLimit.PARLAY_MIX_MAX_AMOUNT %>', //c
        },
        betFieldLangMap: {
            '<%=BetLimit.FEEDBACK %>': lang.WATER_FEEDBACK,
            'A_<%=BetLimit.FEEDBACK %>': 'A-' + lang.WATER_FEEDBACK,
            'B_<%=BetLimit.FEEDBACK %>': 'B-' +lang.WATER_FEEDBACK,
            'C_<%=BetLimit.FEEDBACK %>': 'C-' +lang.WATER_FEEDBACK,
            'D_<%=BetLimit.FEEDBACK %>': 'D-' +lang.WATER_FEEDBACK,
            '<%=BetLimit.SINGLE_MAX %>': lang.SCHEDULE_BOUND,
            '<%=BetLimit.EACH_SINGLE_DIFF %>': lang.SINGLE_MAX,
            '<%=BetLimit.ONE_BET_MAX %>': lang.ONE_BET_MAX,
        },
        betTypeSetFieldMap: {
            FEEDBACK: '<%=BetLimit.FEEDBACK%>',
            ONE_BET_MAX: '<%=BetLimit.ONE_BET_MAX%>',
            SINGLE_MAX: '<%=BetLimit.SINGLE_MAX%>',
            EACH_SINGLE_DIFF: '<%=BetLimit.EACH_SINGLE_DIFF%>',
            PARLAY_MAX: '<%=BetLimit.PARLAY_MAX %>'
        },
        
    }

</script>
<script src="/js/model/casino/limit_data.js?_=<%=Global.clear_cache %>"></script>

<div id="form_box" >
<%-- 資料編輯========================//start --%>
    <div class="mui-panel">
        <div class="baseForm-js" data-action="updateBase1">
            <h1 class="formBoxTitle">編輯代理 - <span id="username"></span></h1>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>變更密碼</label>
                    <div class="mui-textfield input">
                        <input type="password" name="password" id="password" class="filterForm">
                    </div>
                </div>
                <div class="infoItem">
                    <label>再次輸入密碼</label>
                    <div class="mui-textfield input">
                        <input type="password" name="repassword" id="repassword" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>暱稱</label>
                    <div class="mui-textfield input">
                        <input type="text" name="nickname" id="nickname" class="filterForm">
                    </div>
                </div>
                <div class="infoItem">
                    <label>備註</label>
                    <div class="mui-textfield input">
                        <input type="text" name="memo" id="note" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>電話</label>
                    <div>
                        <div class="mui-textfield input inline">
                            <select name="nationNumber" class="select inline filterForm">                                    
                            </select>
                        </div>
                        <div class="mui-textfield input inline">
                            <input type="text" name="phone" id="phone" placeholder="電話號碼" class="filterForm phone">                         
                        </div>
                    </div>
                </div>
                <div class="infoItem">
                    <label>EMAIL</label>
                    <div class="mui-textfield input">
                        <input type="text" name="email" id="email" class="filterForm">                           
                    </div>
                </div>
                <div class="infoItem">
                    <label>LINE</label>
                    <div class="mui-textfield input">
                        <input type="text" name="line" id="line" class="filterForm">                           
                    </div>
                </div>
                <div class="infoItem">
                    <label>WECHAT</label>
                    <div class="mui-textfield input">
                        <input type="text" name="wechat" id="wechat" class="filterForm">                           
                    </div>
                </div>
                <div class="infoItem">
                    <label>SKYPE</label>
                    <div class="mui-textfield input">
                        <input type="text" name="skype" id="skype" class="filterForm">                           
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>可登入</label>
                    <div class="mui-textfield input">
                        <div class="fillForm">
                            <input type="radio" name="isCanLogin" id="isCanLogin_true" value="true" class="filterForm">
                            <label for="isCanLogin_true">可登入</label>
                            <input type="radio" name="isCanLogin" id="isCanLogin_false" value="false" class="filterForm">
                            <label for="isCanLogin_false" >否</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="infoPanel">  
                <div class="inline textCenter">
                    <br />
                    <div class="mui-btn mui-btn--primary submitBtn update-js" data-disabled="false" data-action="updateBase1"><i class="icon-spinner"></i>儲存</div>
                </div>
            </div>
        </div>
        <div class="detailOptionWrap-js baseForm-js" data-action="updateBase2">
            <h1 class="formBoxTitle">分站</h1>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>分站站名</label>
                    <div class="mui-textfield input">
                        <input type="text" name="companyTitle" id="companyTitle" class="filterForm">
                    </div>
                </div>
                <div class="infoItem">
                    <label>分站URL</label>
                    <div class="mui-textfield input">
                        <%--<input type="text" name="url" id="url" class="filterForm">--%>
                        入口頁：
                        <span id="portalUrl"><%--sitename.point.net--%></span><br />
                        管理端：
                        <span id="admintUrl"><%--sitename.point.net/admin--%></span>
                    </div>
                </div>
                <div class="infoItem">
                    <label>首頁廣告輪播圖</label>
                    <div class="mui-textfield input">
                        <a href="/pointcontrol/popup#/pointcontrol/advertisement/list?id=<%=data["agentId"] %>" class="mui-btn mui-btn--small mui-btn--primary" data-is-ajax="0" target="_blank">設定廣告輪播圖</a>
                    </div>
                </div>
                <div class="infoItem">
                    <label>優惠活動設定</label>
                    <div class="mui-textfield input">
                        <a href="/pointcontrol/popup#/pointcontrol/promote/list?id=<%=data["agentId"] %>" class="mui-btn mui-btn--small mui-btn--primary" data-is-ajax="0" target="_blank">設定優惠活動</a>
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>信用額度</label>
                    <div class="mui-textfield input">
                        <input type="text" name="creditAmount" id="creditAmount" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>最低儲值金額</label>
                    <div class="mui-textfield input">
                        <input type="text" name="lowestDepositAmount" id="lowestDepositAmount" class="filterForm">
                    </div>
                    <label>最低出售金額</label>
                    <div class="mui-textfield input">
                        <input type="text" name="lowestWithdrawAmount" id="lowestWithdrawAmount" class="filterForm">
                    </div>
                    <label>最高出售金額</label>
                    <div class="mui-textfield input">
                        <input type="text" name="highestWithdrawAmount" id="highestWithdrawAmount" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>客服Line ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="serviceLine" id="serviceLine" class="filterForm">
                    </div>
                </div>
                <div class="infoItem">
                    <label>客服Line Qr Code</label>
                    <div class="mui-textfield input">
                        <input type="file" id="serviceLineQrCode" class="imageToBase64-js">
                        <input type="hidden" name="serviceLineQrCode" class="filterForm" />
                    </div>
                </div>
                <div class="infoItem">
                    <img src="" class="qrcodeDisplay-js" data-id="line" height="60" />
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>客服Wechat ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="serviceWechat" id="serviceWechat" class="filterForm">
                    </div>
                </div>
                <div class="infoItem">
                    <label>客服Wechat Qr Code</label>
                    <div class="mui-textfield input">
                        <input type="file" id="serviceWechatQrCode" class="imageToBase64-js">
                        <input type="hidden" name="serviceWechatQrCode" class="filterForm" />
                    </div>
                </div>
                <div class="infoItem">
                    <img src="" class="qrcodeDisplay-js" data-id="wechat" height="60" />
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>客服Skype ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="serviceSkype" id="serviceSkype" class="filterForm">
                    </div>
                </div>
                <div class="infoItem">
                    <label>客服Skype Qr Code</label>
                    <div class="mui-textfield input">
                        <input type="file" id="serviceSkypeQrCode" class="imageToBase64-js">
                        <input type="hidden" name="serviceSkypeQrCode" class="filterForm" />
                    </div>
                </div>
                <div class="infoItem">
                    <img src="" class="qrcodeDisplay-js" data-id="skype" height="60" />
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>合作Line ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="corporateLine" id="corporateLine" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>合作Wechat ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="corporateWechat" id="corporateWechat" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>合作Skype ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="corporateSkype" id="corporateSkype" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>Logo Path</label>
                    <div class="mui-textfield input">
                        <input type="text" name="logoPath" id="logoPath" class="filterForm">
                    </div>
                </div>
            </div>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>提款說明</label>
                    <div class="mui-textfield input">
                        <input type="text" name="withdrawExplain" id="withdrawExplain" class="filterForm">
                    </div>
                </div>
            </div>
            <h1 class="formBoxTitle">開放館別</h1>
            <div class="infoPanel">
                <div class="infoItem" style="width: 100%;">
                    <label></label>
                    <div class="mui-textfield input">
                        <div id="walletOpen" class="fillForm">
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="formBoxTitle">開放金流商</h1>
            <div class="infoPanel">
                <div class="infoItem" style="width: 100%;">
                    <label></label>
                    <div class="mui-textfield input">
                        <div id="supplierOpen" class="fillForm">
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="formBoxTitle">金流設定-中華國際(PePay)</h1>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>Shop ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="pepayShopId" id="pepayShopId" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Sys Trust Code</label>
                    <div class="mui-textfield input">
                        <input type="text" name="pepaySysTrustCode" id="pepaySysTrustCode" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Shop Trust Code</label>
                    <div class="mui-textfield input">
                        <input type="text" name="pepayShopTrustCode" id="pepayShopTrustCode" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Api Url</label>
                    <div class="mui-textfield input">
                        <input type="text" name="pepayApiUrl" id="pepayApiUrl" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
            </div>
            <h1 class="formBoxTitle">金流設定-藍新科技(EzPay)</h1>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>Shop ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ezpayShopId" id="ezpayShopId" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Sys Trust Code</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ezpaySysTrustCode" id="ezpaySysTrustCode" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Api Url</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ezpayApiUrl" id="ezpayApiUrl" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
            </div>
            <h1 class="formBoxTitle">金流設定-綠界科技(EcPay)</h1>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>Merchant ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ecpayMerchantId" id="ecpayMerchantId" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Hash Key</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ecpayHashKey" id="ecpayHashKey" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Hash IV</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ecpayHashIv" id="ecpayHashIv" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
                <div class="infoItem">
                    <label>Api Url</label>
                    <div class="mui-textfield input">
                        <input type="text" name="ecpayApiUrl" id="ecpayApiUrl" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
            </div>
            <h1 class="formBoxTitle">客服系統-Tawk</h1>
            <div class="infoPanel">
                <div class="infoItem">
                    <label>ID</label>
                    <div class="mui-textfield input">
                        <input type="text" name="tawkId" id="tawkId" class="filterForm" placeholder="此設定值不提供觀看">
                    </div>
                </div>
            </div>
            <div class="infoPanel">  
                <div class="inline textCenter">
                    <br />
                    <div class="mui-btn mui-btn--primary submitBtn update-js" data-disabled="false" data-action="updateBase2"><i class="icon-spinner"></i>儲存</div>
                </div>
            </div>
        </div>
    </div>
    <%-- 資料編輯========================//end --%>
    <%-- 賽事設定========================//start --%>
    <div class="mui-panel detailOptionWrap-js">
        <div id="edit_credit_box">
            <div class="memberInfo">
                <%-- 皇家真人 --%>
        <%--        <table id="royal_game_table" class="expandTable-js royal gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    1
                                    <%=dic_page_id_lang_map["SET"] %>(<%=dic_page_id_lang_map["BALLTYPEa"] %>)
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="royalfg">
                
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99" class="tfoot">
                                <div id="update_royal-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>--%>

                <%-- 歐博真人 --%>
                <table id="allbet_game_table" class="expandTable-js allbet gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["BALLTYPEb"] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="allbetfg">
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99" class="tfoot">
                                <div id="update_allbet-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%-- 瑪雅真人 --%>
                <table id="maya_game_table" class="expandTable-js maya gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["BALLTYPEe"] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="mayafg">
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99" class="tfoot">
                                <div id="update_maya-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%-- 豪彩 --%>
                <table id="how_game_table" class="expandTable-js how gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["BALLTYPEg"] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="howfg">
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="2" class="tfoot">
                                <div id="update_how-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%-- UC8電子 --%>
                <table id="uc8_game_table" class="expandTable-js uc8 gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["BALLTYPEc"] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="uc8fg">
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="2" class="tfoot">
                                <div id="update_uc8-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%-- QTech電子 --%>
                <table id="qtech_game_table" class="expandTable-js qtech gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["BALLTYPEf"] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="qtechfg">
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="2" class="tfoot">
                                <div id="update_qtech-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%-- 游聯電子 --%>
                <table id="ultx_game_table" class="expandTable-js ultx gameSetTable">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="ultx">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["BALLTYPEd"] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js" id="ultxfg">
                        <tr>
                            <th><%=dic_page_id_lang_map["GAME"] %></th>
                            <th><%=dic_page_id_lang_map["QUICK_SETTING"] %></th>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99" class="tfoot">
                                <div id="update_ultx-js" class="btnUpdate md-raised-button md-bg-amber-500 waves-effect"><%=dic_page_id_lang_map["UPDATE"] %></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <%-- 體育 --%>
                <table class="memberGameTableWrap expandTable-js sport">
                    <tbody>
                        <tr>
                            <td colspan="99" class="expandTableBar">
                                <span class="loadingField" data-target="royal">
                                    <span class="loading"></span>
                                </span>
                                <div class="expandTableBtn-js">
                                    <span class="down icon icon-down-open"></span>
                                    <span class="up icon icon-up-open"></span>
                                    <%=dic_page_id_lang_map["ACCOUNT_WALLETTYPES_" + PointControl.Wallet.Define.WalletTypes.Sportlottery] %>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99" class="tfoot">
                                <div class="updateSportcfg-js btnUpdate md-raised-button md-bg-amber-500 waves-effect item left">
                                    <%=dic_page_id_lang_map["UPDATE"]%>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99">
                                <table id="member_game_table-js" class="memberGameTable">
                                    <tbody class="fieldList">
                                    </tbody>
                                </table>
                                <table id="quick_table" class="quickTable">
                                    <tbody class="fieldList">
                                        <tr class="thead">
                                            <td><%=dic_page_id_lang_map["QUICK_SETTING"]%></td>
                                            <td><%=dic_page_id_lang_map["ALL"]%></td>
                                            <td><%=dic_page_id_lang_map["ALL"]%>(<%=dic_page_id_lang_map["NOT_INCLUDE"] + " :" + dic_page_id_lang_map["PARLAY"]%>)</td>
                                            <td><%=dic_page_id_lang_map["IN_PLAY"]%>
                                                <br />
                                                <%=dic_page_id_lang_map["SPORT_CFG_BT_DELAY"] %>
                                                <br />
                                                <input type="text" style="color: #000" class="quickSetAll-js" data-key="<%=BetLimit.DELAY %>" data-type="delay" />
                                            </td>
                                            <td><%=dic_page_id_lang_map["PARLAY"]%></td>
                                        </tr>
                                        <%--<tr>
                                            <td class="th"><%=dic_page_id_lang_map["WATER_FEEDBACK"]%>(<%=dic_page_id_lang_map["NOT_INCLUDE"] + " :" + dic_page_id_lang_map[Glbv.dic_gameTypeIdToLangMap[GameTypeIds.SOCCER]]%>)</td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.FEEDBACK %>" data-type="all" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.FEEDBACK %>" data-type="allNonParlay"/>
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.FEEDBACK %>" data-type="inPlay"/>
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.FEEDBACK %>" data-type="parlay"/>
                                            </td>
                                        </tr>--%>
                                        <tr>
                                            <td class="th"><%=dic_page_id_lang_map["ONE_BET_MAX"]%>(<%=dic_page_id_lang_map["TEN_THOUSAND"]%>)</td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.ONE_BET_MAX%>" data-type="all" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.ONE_BET_MAX%>" data-type="allNonParlay" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.ONE_BET_MAX%>" data-type="inPlay" />
                                            </td>
                                            <td>
                                                <%=dic_page_id_lang_map["PARLAY_TIMES"]%>:
                                                <select class="parlayMaxSetAll-js" data-key="<%=BetLimit.PARLAY_MAX%>" data-type="parlay" >
                                                    <% for (int i = 1; i <= 10; i++)
                                                        {%>
                                                        <% if (i == 1)
                                                            { %>
                                                        <option value="0"><%=dic_page_id_lang_map["CLOSE"]%></option>
                                                        <% }
                                                            else
                                                            { %>
                                                        <option value="<%=i%>"><%=i%></option>
                                                        <% } %>
                                                    <% } %>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="th"><%=dic_page_id_lang_map["SCHEDULE_BOUND"]%>(<%=dic_page_id_lang_map["TEN_THOUSAND"]%>)</td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.SINGLE_MAX%>" data-type="all" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.SINGLE_MAX%>" data-type="allNonParlay" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.SINGLE_MAX%>" data-type="inPlay" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.SINGLE_MAX%>" data-type="parlay" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="th"><%=dic_page_id_lang_map["SINGLE_MAX"]%>(<%=dic_page_id_lang_map["TEN_THOUSAND"]%>)</td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.EACH_SINGLE_DIFF%>" data-type="all" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.EACH_SINGLE_DIFF%>" data-type="allNonParlay" />
                                            </td>
                                            <td>
                                                <input type="text" class="quickSetAll-js" data-key="<%=BetLimit.EACH_SINGLE_DIFF%>" data-type="inPlay" />
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="sportcfg_table" class="sportInfo">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="expandItem-js">
                        <tr>
                            <td colspan="99" class="tfoot">
                                <div class="updateSportcfg-js btnUpdate md-raised-button md-bg-amber-500 waves-effect item left">
                                    <%=dic_page_id_lang_map["UPDATE"]%>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<%-- 賽事設定========================//end --%>
    <div id="dialog" class="dialogDelete myModal">
        <div class="myModalContent">
        
        </div>
</div>
</div>