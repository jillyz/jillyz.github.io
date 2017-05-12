var viewPersonnelHtml = {
    // countOrderId 計算產了第幾個 detailTable
    // 0是根層 , 1之後是下層
    // 值會寫在 table 的 data-order-id 內 , 
    // 以便瀏覽上下階層時作 detailTable 的更新或移除; 
    // 點擊帳號看下層=>此值+1; 
    // 點擊階層選單的上層=>依所點擊取得其 data-order-id , 並對下層作移除(比此值大的就算下層, 移除levelNav節點和table)
    countOrderId: 0, //初始
    pagerObjs: {}, // for 分頁模組
    init: function () {
        viewPersonnelHtml.bindEvent();
    },
    field: {
        "userid": "a",
        "username": "b",
        "nickname": "c",
        "phone": "d",
        "memberNum": "e",
        "memberNumLine": "f",
        "ip": "g",
        "loginDateTime": "h",
        "createDateTime": "i",
        "editor": "j",
        "lastEditTime": "k",
        "memo": "l",
        "levelId": "m",
        "isLastLevel": "n"
    },
    bindEvent: function () {

        //點代理帳號看下層代理
        $('#list_box').on('click', '.viewLevel-js', function () {
            var levelId = $(this).attr('data-levelid'),
                userId = $(this).attr('data-userid'),
                username = $(this).attr('data-username');

            var dataOrderId = viewPersonnelHtml.countOrderId++;

            viewPersonnelHtml.checkDetailHandler(1, 0, dataOrderId, levelId, userId, username);

            return false;
        });

        //檢視會員資料
        $('#list_box').on('click', '.viewMember-js', function () {
            var agentId = $(this).attr('data-userid'),
                agentName = $(this).attr('data-username')
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/member/member_query?parentId=' + agentId + '&parentName=' + agentName;
            window.open(url, '_blank');
        });

        $('#levelNav').on('click', '.navRoot-js', function () {
            $('#detailWrap_0').removeClass('hidden');
            $('.detailWrap:not(#detailWrap_0)').remove();
            viewPersonnelHtml.levelNavUpdateNode(0); //0代表根層

        });

        $('#levelNav').on('click', '.navNode-js', function () {
            var thisOrder = parseInt($(this).attr('data-order-id'));
            var isLatesOrder = ((thisOrder + 1) == viewPersonnelHtml.detailTableOrder) ? true : false;

            //若不是階層選單最後一層
            if (isLatesOrder == false) {
                viewPersonnelHtml.detailTableShowOrRemove(thisOrder);
                viewPersonnelHtml.levelNavUpdateNode(thisOrder);
            }
        });

        // 設定權限
        $('#list_box').on('click', '.authSetting-js', function () {
            var id = $(this).attr('data-id'),
                username = $(this).attr('data-username');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/member/auth_setting?id=' + id + '&username=' + username;
            window.open(url, '_blank');
        });

        // 檢視Log
        $('#list_box').on('click', '.log-js', function () {
            var userId = $(this).attr('data-id'),
                username = $(this).attr('data-username');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/search/log?userId=' + userId + '&username=' + username;
            window.open(url, '_blank');
        });

        // 編輯代理資料
        $('#list_box').on('click', '.edit-js', function () {
            var id = $(this).attr('data-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/member/agent_edit?id=' + id;
            window.open(url, '_blank');
        });
    },
    //處理看明細 (從根層看 or 從明細代理往下層繼續看 or 同層分頁 )
    checkDetailHandler: function (mode, currentPage, dataOrderId, levelId, userId, username) {

        if (mode == 0 && currentPage == 0 && dataOrderId == 0) {
            $('#reportDetail').html('');
            viewPersonnelHtml.pagerObjs = {};
        }

        switch (mode) {

            //從根層看明細
            case 0:

                var thisOrderId = dataOrderId;

                var form = view.search(currentPage);
                var res = view.getQueryData(form);

                if (res.d.length > 0) {
                    $('#emptyData').addClass('hidden');
                    viewPersonnelHtml.renderLevelNavHtml(0, 0);
                    viewPersonnelHtml.renderWrapperHtml(mode, res, thisOrderId);
                } else {
                    $('#levelNav').addClass('hidden');
                    $('#emptyData').removeClass('hidden');
                }

                $('#list_wrapper').removeClass('hidden');

                break;

            //從明細代理往下查
            case 1:

                var thisOrderId = dataOrderId + 1;

                var form = view.nextLevelSearch(currentPage, levelId, userId);
                var res = view.getQueryData(form);

                viewPersonnelHtml.renderLevelNavHtml(1, thisOrderId, userId, username, levelId);
                viewPersonnelHtml.renderWrapperHtml(mode, res, thisOrderId, userId, username, levelId);
                $('#list_wrapper').removeClass('hidden');

                break;

            //查同層分頁
            case 2:

                var thisOrderId = dataOrderId;

                var pager = viewPersonnelHtml.pagerObjs[thisOrderId];
                var currentPage = pager.getCurrentPage();

                var form = view.nextLevelSearch(currentPage, levelId, userId);
                var res = view.getQueryData(form);

                viewPersonnelHtml.renderWrapperHtml(mode, res, thisOrderId);
                $('#list_wrapper').removeClass('hidden');

                break;

        }
    },
    //for分頁使用，直接執行 viewPersonnelHtml.checkDetailHandler() 的 mode 2 分頁取資料
    getPageData: function (dataOrderId) {

        var pager = viewPersonnelHtml.pagerObjs[dataOrderId];
        var currentPage = pager.getCurrentPage();

        viewPersonnelHtml.checkDetailHandler(2, currentPage, dataOrderId);
    },
    //處理: 從階層選單點擊後, 要顯示哪個順序的明細表, 或清除其下層的明細表
    detailTableShowOrRemove: function (dataOrderId) {

        $('#reportTotal_0').addClass('hidden');
        $('.detailWrap').addClass('hidden');
        $('.detailWrap[data-order-id="' + dataOrderId + '"]').removeClass('hidden');

        $('.detailWrap').each(function () {
            var tableOrder = $(this).attr('data-order-id');
            if (tableOrder > dataOrderId) {
                $(this).remove();
            }
        });
    },
    // 產階層選單節點
    renderLevelNavHtml: function (mode, dataOrderId, userId, username, levelId) {

        switch (mode) {

            // root
            case 0:
                var html = '<li><a class="navRoot navRoot-js"><i class="icon-folder-open"></i> ' + lang.AGENT_LIST_NAV_ME + '</a></li>';
                $('#levelNav ul').html(html);
                break;

                // next, need: levelId, userId, username, dataOrderId, userId
            case 1:
                //var html = $('#levelNav ul').html();
                var html = '';

                html += '<li>';
                html += '<a class="navNode navNode-js" data-user-id="' + userId + '" data-level-id="' + levelId + '" data-order-id="' + dataOrderId + '">';
                html += '<i class="icon-angle-double-right"></i>';
                html += username + ' (' + searchView.searchText(levelId, levels) + ')';
                html += '</a>';
                html += '</li>';

                $('#levelNav ul').append(html);
                break;
        }
        $('#levelNav').removeClass('hidden');
    },
    // 若user點了階層選單中某個上層, 要移除下層節點
    levelNavUpdateNode: function (dataOrderId) {
        $('#levelNav .navNode').each(function () {
            var nodeOrder = $(this).attr('data-order-id');
            if (nodeOrder > dataOrderId) {
                $(this).parents('li').remove();
            }
        });
        $('.pageGroup').attr('data-target', '#detailWrap_' + dataOrderId);

    },
    // 明細表容器
    renderWrapperHtml: function (mode, res, dataOrderId, userId, username, levelId) {

        var currentPage = $('pageSelect_' + dataOrderId).val();

        var detailHtml = viewPersonnelHtml.renderDetailListHtml(res, dataOrderId, false); //資料來自API

        if (viewPersonnelHtml.pagerObjs[dataOrderId] == undefined) {
            viewPersonnelHtml.pagerObjs[dataOrderId] = Object.create(pagerView);
        }

        var pager = viewPersonnelHtml.pagerObjs[dataOrderId];
        var paginationHtml = pager.renderPaginationHtml(dataOrderId, res.p, res.d.length, viewPersonnelHtml.getPageData);

        var resulHtml = '';

        resulHtml += '<div id="detailWrap_' + dataOrderId + '" data-order-id="' + dataOrderId + '" class="detailWrap">';

        resulHtml += detailHtml;

        resulHtml += '<div class="fixedBottom list text-center">';
        resulHtml += '<div class="mui-container">';
        resulHtml += '<div class="pageGroupWrap">';
        resulHtml += '<div id="pageGroup_' + dataOrderId + '" class="pageGroup">';
        resulHtml += paginationHtml;
        resulHtml += '</div>';
        resulHtml += '</div>';
        resulHtml += '</div>';
        resulHtml += '</div>';

        resulHtml += '</div>';

        //若元素
        //已存在
        if ($('#detailList_' + dataOrderId).length !== 0) {
            $('#reportDetail').show();
            $('#detailList_' + dataOrderId).show().html(detailHtml);
        }
            //不存在
        else {
            $('#reportDetail').show().append(resulHtml);
        }

        //顯示或隱藏哪個detailWrap
        $('.detailWrap:not([data-order-id="' + dataOrderId + '"])').addClass('hidden');
        $('.detailWrap[data-order-id="' + dataOrderId + '"]').removeClass('hidden');

        pager.bindEvent();

    },
    // 明細表內容
    renderDetailListHtml: function (res, dataOrderId, isRootDetail) {

        var data = res.d;

        //若有資料
        if (data.length > 0) {

            var row = '';

            for (var i = 0; i < data.length; i++) {

                var d = data[i],
                    vf = viewPersonnelHtml.field;

                row +=
                '<tr>' +
                    '<td>' +
                    (
                        (d[vf.isLastLevel] || d[vf.memberNumLine] == 0)
                        ?
                        d[vf.username]
                        :
                        '<a href="#" class="bold viewLevel-js" data-userid="' + d[vf.userid] + '" data-username="' + d[vf.username] + '" data-levelid="' + d[vf.levelId] + '">' +
                            d[vf.username] +
                        '</a>'
                    ) +
                    '</td>' +
                    '<td>' + d[vf.nickname] + '</td>' +
                    '<td>' + d[vf.phone] + '</td>' +
                    '<td class="textCenter colNum">' +
                        (
                            (d[vf.memberNum] == 0)
                            ?
                            d[vf.memberNum]
                            :
                            '<a class="viewMember viewMember-js" data-userid="' + d[vf.userid] + '" data-username="' + d[vf.username] + '">' +
                                d[vf.memberNum] +
                            '</a>'
                        ) +
                    '</td>' +
                    '<td class="textCenter colNum">' + d[vf.memberNumLine] + '</td>' +
                    '<td class="textCenter">' +
                        '<div class="mui-btn mui-btn--primary mui-btn--small authSetting-js" data-id="' + d[vf.userid] + '" data-username="' + d[vf.username] + '">' + lang.AGENT_LIST_BTN_AUTH_SETTING + '</div>' +
                    '</td>' +
                    '<td class="textCenter">' +
                        '<div class="mui-btn mui-btn--primary mui-btn--small log-js" data-id="' + d[vf.userid] + '" data-username="' + d[vf.username] + '"><i class="icon-search"></i></div>' + // log query
                    '</td>' +
                    '<td>' + d[vf.createDateTime] + '</td>' +
                    '<td>' + ( d[vf.loginDateTime] ? d[vf.loginDateTime] : lang.NOT_LOGIN_YET ) + '<br>' + d[vf.ip] + '</td>' +
                    '<td>' + d[vf.memo] + '</td>' +
                    '<td class="textCenter editInfo-gameSetting">' +
                        '<div class="mui-btn mui-btn--primary mui-btn--small edit-js" data-id="' + d[vf.userid] + '" data-username="' + d[vf.username] + '"><span class="icon icon-pencil"> ' + lang.AGENT_LIST_BTN_EDIT_GAME_SETTING + '</span></div>' +
                    '</td>' +
                    '<td>' +
                        (d[vf.editor] ? d[vf.editor] + '<br>' + d[vf.lastEditTime] : '--') +
                    '</td>' +
                '</tr>';
            }

            var html = '';

            html +=
                '<table id="detailList_' + dataOrderId + '" class="detailTable tableView mui-table" data-order-id="' + dataOrderId + '">' +
                '<thead>' +
                '<tr>' +
                    '<th>' + lang.AGENT_LIST_COL_USERNAME + '</th>' +
                    '<th>' + lang.AGENT_LIST_COL_NICKNAME + '</th>' +
                    '<th>' + lang.AGENT_LIST_COL_PHONE + '</th>' +
                    '<th class="textCenter colNum">' + lang.AGENT_LIST_COL_MEMERS_NUM + '</th>' +
                    '<th class="textCenter colNum">' + lang.AGENT_LIST_COL_HEIRARCHY_MEMBERS_NUM + '</th>' +
                    '<th class="textCenter">' + lang.AGENT_LIST_COL_AUTH + '</th>' +
                    '<th class="textCenter">' + lang.AGENT_LIST_BTN_LOG + '</th>' +
                    '<th>' + lang.AGENT_LIST_COL_CREATE_TIME + '</th>' +
                    '<th>' + lang.AGENT_LIST_COL_LAST_LOGIN_TIME_IP + '</th>' +
                    '<th>' + lang.AGENT_LIST_COL_MEMO + '</th>' +
                    '<th class="textCenter col-editInfo-GameSetting">' + lang.AGENT_LIST_COL_MANAGE + '</th>' +
                    '<th>' + lang.AGENT_LIST_COL_LAST_MODIFY + '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                row +
                '</tbody>' +
                '</table>';

        }

        //若無資料
        else {
            var html = '';
            html += '<table id="detailList_' + dataOrderId + '" class="detailTable tableView mui-table" data-order-id="' + dataOrderId + '">';
            html += '<thead>';
            html += '<tr><th>-</th></tr>';
            html += '</thead>';
            html += '<tbody>';
            html += '<tr>';
            html += '<td>' + lang.LIST_POINT_EMPTY_DATA + '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
        }

        return html;

    },

}

$(function () {
    viewPersonnelHtml.init();
});