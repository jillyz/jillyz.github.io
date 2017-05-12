var view = {
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        // 下拉選單
        var ddlGroupTypeHtml = dropDownListView.renderHtml('groupType', groupType, '', true, '', groupTypeLang);
        $('#groupType').html(ddlGroupTypeHtml);

        view.bindEvent();

    },
    bindEvent: function () {

        // 進階搜尋
        $('#query_box').on('click', '#toggle-advance', function () {
            $('.advanceQuery, #toggle-advance .icon-up-open, #toggle-advance .icon-down-open').toggle();
        });

        // 分站連動下拉
        $('#query_box').on('change', '.companyMain-js', function () {
            companysView.renderCompanysSubListHtml(companys);
        });

        // 查詢按鈕
        $('#query_box').on('click', '#submit', function () {
            view.getQueryResult($(this));
        });

    },
    search: function () {
        var form = {};

        form['action'] = 'list';

        $('.filterForm').each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            form[name] = val;
        });

        return form;
    },
    getQueryResult: function (btn) {
        var form = view.search();

        if (btn) { btn.attr('data-disabled', true); }
        $('#list_box, #tip').hide();

        $.post(
            '/pointControl/account/group_list',
            JSON.stringify(form),
            function (res) {

                res = JSON.parse(res);

                viewGroupList.renderResultHtml(res.d);

                if (btn) { btn.attr('data-disabled', false); }                
                $('#list_box, #tip').show();
            }
        )
    }
};

$(function () {
    view.init();
});