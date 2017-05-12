var viewList = {
    init: function () {
        viewList.bindEvent();
        pagerViewOne.bindEvent(view['getQueryResult']);
    },
    field: {
        'id': 'a',
        'title': 'b',
        'companyId': 'd',
        'username': 'e',
        'editor': 'm',
        'createTime': 'r',
        'editTime': 'p',
        'beginDateTime': 'g',
        'endDateTime': 'q',
        'status': 'h',
        'statusText': 'i',
        'type': 'j',
        'typeText': 'k',
        'topMost': 'l',
        'token': 'n', //當作群組id
        'mode': 'o'
    },
    bindEvent: function () {

        $('#listBox').on('click', '.toggleGroup-js td', function () {
            $(this).parent('tr').toggleClass('isOpen').parent('tbody').children('.annList').toggleClass('hidden');
        });

        $('.batchEdit-js').click(function () {
            var arr = viewList.searchSelectItem(),
                batchIds = arr.join(),
                id = arr[0];
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/announce/edit?id=' + id + '&batchIds=' + batchIds;
            window.open(url, '_blank');
        });

        $('#listBox').on('click', '.edit-js', function () {
            var id = $(this).attr('data-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/announce/edit?id=' + id + '&batchIds=' + id;
            window.open(url, '_blank');
        });

        $('#listBox').on('click', '.view-js', function () {
            var id = $(this).attr('data-id');
            var url = location.protocol + '//' + location.host + '/pointControl/popup#/pointControl/announce/view?id=' + id;
            window.open(url, '_blank');
        });

        $('#listBox').on('change', 'input[type=checkbox]', function () {
            initView.chkStatusChange(this);

            var num = viewList.searchSelectItem();
            if (num.length > 0) {
                $('#btnBatchEdit').removeClass('hidden');
            } else {
                $('#btnBatchEdit').addClass('hidden');
            }
        });
    },
    searchSelectItem: function () {
        var target = [];

        $('[name="check"]:checked').each(function () {
            var n = $(this).val();
            target.push(n);
        });

        return target;
    },
    renderEmptyDataHtml: function () {
        return '<div class="emptyData"><i class="icon-comment-1"></i>' + lang.ANNOUNCE_LIST_EMPTY_DATA + '</div>';
    },
    renderAnnResultHtml: function (data) {

        var annGroupListHtml = '';

        annGroupListHtml +=
            '<!--群組列表-->' +
            '<table class="mui-table groupTable">' +
                '<thead>' +
                    '<tr>' +
                        '<th class="colGroup">' + lang.ANNOUNCE_LIST_COL_ANN_TITLE + '</th>' +
                        '<th class="colCate">' + lang.ANNOUNCE_LIST_COL_ANN_TYPE + '</th>' +
                        '<th class="colFromTime">' + lang.ANNOUNCE_LIST_COL_CTRATE_TIME + '</th>' +
                        '<th class="colAutor">' + lang.ANNOUNCE_LIST_COL_CREATOR + '</th>' +
                    '</tr>' +
                '</thead>';

        for (i = 0; i < data.length; i++) {
            for (key in data[i]) {

                // 取第一筆資料當作群組的資料
                annGroupListHtml +=
                '<tbody>' +
                    '<tr class="toggleGroup-js">' +
                        '<td class="colTitle">' +
                            '<i class="icon-down-open mui--pull-left"></i>' +
                            '<span class="title">' + data[i][key][0][viewList.field.title] + '<span>' +
                        '</td>' +
                        '<td>' + searchView.searchText(data[i][key][0][viewList.field.type], types) + '</td>' +
                        '<td>' + data[i][key][0][viewList.field.createTime] + '</td>' +
                        '<td>' + data[i][key][0][viewList.field.username] + '</td>' +
                    '</tr>' +
                    '<tr class="annList hidden">' +
                        '<td colspan="4" class="subTableWrapper">' +
                            viewList.renderAnnListHTml(data[i][key], key) +
                        '</td>' +
                    '</tr>' +
                '</tbody>';
            }
        }
        annGroupListHtml +=
            '</table>' +
            '<!--群組列表-->';

        //-----------------------------------
        return annGroupListHtml;
    },
    renderAnnListHTml: function (data, key) {

        var annListHtml =
        '<!--公告列表-->' +
        '<table class="mui-table subTable">' +
            '<thead>' +
                '<tr>' +
                    '<th class="colChk">' +
                        '<div class="singleCheckbox">' +
                            '<input type="checkbox" id="chk_' + key + '" data-name="g_' + key + '" class="all" value="" />' +
                            '<label for="chk_' + key + '"></label>' +
                        '</div>' +
                    '</th>' +
                    '<th class="colPin">' + lang.ANNOUNCE_LIST_COL_TOP_MOST + '</th>' +
                    '<th class="colPin"></th>' +
                    '<th class="colTitle">' + lang.ANNOUNCE_LIST_COL_TITLE + '</th>' +
                    '<th class="colSite">' + lang.ANNOUNCE_LIST_COL_COMPANY + '</th>' +
                    '<th class="colToTime">' + lang.ANNOUNCE_LIST_COL_PUBLIC_TIME + '</th>' +
                    '<th class="colWay">' + lang.ANNOUNCE_LIST_COL_PRESENT + '</th>' +
                    '<th class="colEditLog">' + lang.ANNOUNCE_LIST_COL_LAST_MODIFY + '</th>' +
                    '<th class="colEdit">' + lang.ANNOUNCE_LIST_COL_EDIT + '</th>' +
                '</tr>' +
            '</thead>' +
            viewList.renderAnnRowHtml(data, key) +
        '</table>' +
        '<!--公告列表-->';

        return annListHtml;

    },
    renderAnnRowHtml: function (data, key) {

        //console.log('renderAnnRowHtml', data)

        var annRowHtml = '';
        for (var i = 0; i < data.length; i++) {

            annRowHtml +=
            '<!--公告項目-->' +
            '<tbody>' +
                '<tr>' +
                    '<td class="colCheckbox">' +
                        '<div class="singleCheckbox inline">' +
	                        '<input type="checkbox" id="chk_' + key + '_' + i + '" name="check" data-name="g_' + key + '" value="' + data[i][viewList.field.id] + '" />' +
	                        '<label for="chk_' + key + '_' + i + '"></label>' +
                        '</div>' +
                    '</td>' +
                    '<td class="colPin">' +
                        '<span class="pin ' + (data[i][viewList.field.topMost] ? 'isPin' : '') + '">頂</span>' +
                    '</td>' +
                    '<td class="colPin">' +
                        ((data[i][viewList.field.status] == '1') ? '<i class="icon-ok-circled green bigger inline" title="' + data[i][viewList.field.statusText] + '"></i>' : '<i class="icon-block-1 red bigger" title="' + data[i][viewList.field.statusText] + '"></i>') +
                    '</td>' +
                    '<td class="colTitle">' +
                        '<a href="#" class="inline view-js" data-id="' + data[i][viewList.field.id] + '">' + data[i][viewList.field.title] + '</a>' +
                    '</td>' +
                    '<td class="colSite">' +
                            searchView.searchCompanyName(data[i][viewList.field.companyId], companys) +
                    '</td>' +
                    '<td class="colToTime">' +
                            data[i][viewList.field.beginDateTime] + ' ~ <br/>' + data[i][viewList.field.endDateTime] +
                    '</td>' +
                    '<td class="colMode">' +
                            searchView.searchText(data[i][viewList.field.mode], mode) +
                    '</td>' +
                    '<td class="colLEditLog">' +
                            data[i][viewList.field.editor] +
                        '<br />' +
                            data[i][viewList.field.editTime] +
                    '</td>' +
                    '<td class="colEdit">' +
                        '<div class="mui-btn mui-btn--raised mui-btn--primary mui-btn--small edit-js inline" data-id="' + data[i][viewList.field.id] + '"><span class="icon icon-pencil"></span></div>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
            '<!--公告項目-->';
        }
        return annRowHtml;

    },
}

$(function () {
    viewList.init();
});
