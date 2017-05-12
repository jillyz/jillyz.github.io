var view = {
    field: {
        'id': 'a',
        'companyId': 'd',
        'beginDateTime': 'g',
        'endDateTime': 'h',
        'status': 'i',
        'type': 'j',
        'gameTypeId': 'k',
        'topMost': 'l',
        'levelIds': 'm'
    },
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        view.renderSettingViewHtml();
        initView.renderLangContentHtml('#langContent', 'view');
    },
    renderSettingViewHtml: function () {

        var n = data[view.field.type] - 1;
        var array = data[view.field.levelIds].split(",");
        var html = '';

        html =
        '<div class="mui-panel">' +
            '<table class="queryBox fillForm">' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_VIEW_PUBLIC_DATE_TIME + '</th>' +
                    '<td>' +
                        data[view.field.beginDateTime] + ' - ' + data[view.field.endDateTime] +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_VIEW_COMPANY + '</th>' +
                    '<td>' +
                        searchView.searchCompanyName(data[view.field.companyId], companys) +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_VIEW_LEVEL + '</th>' +
                    '<td>' +
                        '<ul class="levelListView">' +
                            initView.renderTextList(array) +
                        '</ul>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_VIEW_ANNOUNCE_TYPE + '</th>' +
                    '<td>' +
                        searchView.searchText(data[view.field.type], types) +
                    '</td>' +
                '</tr>' +
                ((types[n].d.length > 0) ? ('<tr><th>' + lang.ANNOUNCE_VIEW_GAME_TYPE + '</th><td>' + searchView.searchText(data[view.field.gameTypeId], types) + '</td></tr>') : '') +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_VIEW_TOP_MOST + '</th>' +
                    '<td>' +
                        (data[view.field.topMost] ? '是' : '否') +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_VIEW_STATUS + '</th>' +
                    '<td>' +
                        searchView.searchText(data[view.field.status], status2) +
                    '</td>' +
                '</tr>';
            '</table>' ;

        $('#setting').html(html);
    },
};

$(function () {
    view.init();
});