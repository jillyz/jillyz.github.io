var view = {
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        // 快速日期選項 *beginName, *endName, *domId, *dateLang, hasTime, beginVal, endVal
        dateView.renderDatePickerQuickSetHtml('lastModifyBeginDateTime', 'lastModifyEndDateTime', 'lastModify', dateLang, true);
        dateView.renderDatePickerQuickSetHtml('createBeginDateTime', 'createEndDateTime', 'create', dateLang, true);

        // 下拉選單 *fieldName, *data, defaultVal, hasAll, hasSelectTip, viewLang
        var ddlGroupHtml = dropDownListView.renderHtml('groupId', accountGroup, '', true, '', groupLang);
        $('#groupId').html(ddlGroupHtml);
        var ddlcashFlowHtml = dropDownListView.renderHtml('cashFlowType', cashFlowType, '', true, '', cashFlowLang);
        $('#cashFlowType').html(ddlcashFlowHtml);
        var ddlStatusHtml = dropDownListView.renderHtml('status', status2, 1, true, '', statusLang);
        $('#status').html(ddlStatusHtml);

        // 排序選項
        var sortHtml = sortView.renderSortByListHtml('sortColumn', 'sortDirection', sort, sortLang, 'createDateTime', -1);
        $('#sort').html(sortHtml);

        view.bindEvent();

    },
    bindEvent: function () {

        // 進階搜尋
        $('#query_box').on('click', '#toggle-advance', function () {
            $('.advanceQuery, #toggle-advance .icon-up-open, #toggle-advance .icon-down-open').toggle();
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

        form['sortDirection'] = $('[name="sortDirection"]:checked').val();
        //form['companyIds'] = companysView.getCompanyIds(companys);

        return form;

    },
    getQueryResult: function (btn) {

        var form = view.search();

        btn.attr('data-disabled', true);
        $('#list_box').hide();

        $.post(
            '/pointControl/account/account_list',
            JSON.stringify(form),
            function (res) {

                btn.attr('data-disabled', false);

                var lang = model_global_global.getLangText(res);

                if (lang['key'] !== undefined) {

                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                } else {
                    $('.input.error').removeClass('error');
                    $('.message').hide();
                }

                data = JSON.parse(res);

                var newGroupingData = dataHandler.groupingJSONData(data.d, viewAccountList.field.companyId);
                viewAccountList.renderResultHtml(data.d, newGroupingData, '#list_box');

                $('.item:eq(0)').addClass('isOpen');
                
                $('#list_box').fadeIn();
            }
        )
    }
};

$(function () {
    view.init();
});