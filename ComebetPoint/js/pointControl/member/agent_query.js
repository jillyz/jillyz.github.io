var view = {
    currentPage: 0,
    obj: {},
    init: function() {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        // 分站選單
        //companysView.oneMainSite_multipleSubSite('#company_filter_list', companys)

        // 快速日期選項 *beginName, *endName, *domId, *dateLang, hasTime, beginVal, endVal
        dateView.renderDatePickerQuickSetHtml('createBeginDateTime', 'createEndDateTime', 'create', dateLang, true);
        dateView.renderDatePickerQuickSetHtml('loginBeginDateTime', 'loginEndDateTime', 'lastLogin', dateLang, true);
        dateView.renderDatePickerQuickSetHtml('lastModifyBeginDateTime', 'lastModifyEndDateTime', 'lastModify', dateLang, true);

        // 排序選項
        var sortHtml = sortView.renderSortByListHtml('sortColumn', 'sortDirection', sort, sortLang, 'id', -1);
        $('#sort').html(sortHtml);

        view.afterAddAgent();

        view.bindEvent();
    },
    bindEvent: function() {

        $('#query_box').on('click', '#toggle-advance', function() {
            $('.advanceQuery, .icon-up-open, .icon-down-open').toggle();
        });

        $('#query_box').on('click', '#submit', function() {
            viewPersonnelHtml.checkDetailHandler(0, 0, 0);
        });
    },
    afterAddAgent: function () {
        var urlObj = getUrl.parseParamValue(),
            username = urlObj.username;

        if (username !== undefined) {
            $('[name="username"]').val(username);
        }

        viewPersonnelHtml.checkDetailHandler(0, 0, 0);

    },
    search: function (currentPage) {

        var form = {};
        form['action'] = 'list';

        //串filter
        $('.filterForm').each(function() {
            var name = $(this).attr('name');
            var val = $(this).val();
            form[name] = val;
        });
        //form['companyIds'] = companysView.getCompanyIds(companys);
        form['sortDirection'] = $('[name="sortDirection"]:checked').val();

        form['page'] = currentPage;

        return form;
    },

    nextLevelSearch: function (currentPage, thisLevelId, thisUserId) {
        var form = {};
        var isOnlyByOrder = $('.filterForm[name="sortDirection"]').val() !== '' || $('.filterForm[name="phone"]').val() !== '';

        form['action'] = 'list';
        form['sortDirection'] = $('[name="sortDirection"]:checked').val();

        //串階層資料
        $('.navNode').each(function () {
            var levelId = $(this).attr('data-level-id'),
                userId = $(this).attr('data-user-id');
            form[levelId] = userId;
            form["parentId"] = userId;
        });
        if (thisLevelId !== undefined) {
            form[thisLevelId] = thisUserId;
            form["parentId"] = thisUserId;
        }

        form['page'] = currentPage;

        return form;
    },
    getQueryData: function (form) {

        model_global_global.ajaxLoading(true);

        var output = '';

        $.ajax({
            url: '/pointControl/member/agent_query',
            data: JSON.stringify(form),
            type: 'POST',
            async: false,
            success: function (result) {

                //setTimeout是為了讓loading強制出現一下下
                setTimeout(function () {
                    model_global_global.ajaxLoading(false);
                }, 0);

                output = result;
            }
        });

        return JSON.parse(output);
    },

};

$(function () {
    view.init();
});