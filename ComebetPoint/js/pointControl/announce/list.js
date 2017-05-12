var view = {
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        //分站樹狀選單
        module_companyTree.init('/pointControl/announce/list', '#companysTree', false); //postUrl, treeMenuContainerID, radio
		
        // 快速日期選項 *beginName, *endName, *domId, *dateLang, hasTime, beginVal, endVal
        dateView.renderDatePickerQuickSetHtml('beginDateTime', 'endDateTime', 'dateTime', dateLang, true);

        initView.renderLeveleTagListHtml();
        initView.renderTypeListHtml('all', '', '#type');

        view.afterAddAnnounce();

        view.bindEvent();
    },

    bindEvent: function () {

        // 進階搜尋
        $('#queryBox').on('click', '#toggle-advance', function () {
            $('.advanceQuery, #toggle-advance .icon-up-open, #toggle-advance .icon-down-open').toggle();
        });

        $('#queryBox').on('change', 'input[type=checkbox]', function () {
            initView.chkStatusChange(this);
        });
        $('[name="type"]').change(function () {
            initView.renderSubTypeListHtml();
        });

        $('.query-js').click(function () {
            view.getQueryResult();
        });
    },
    afterAddAnnounce: function () {
        var urlObj = getUrl.parseParamValue(),
            query = urlObj.query;

        if (query !== undefined) {
            view.getQueryResult();
        }
    },
    search: function () {
        var form = {};
        var filter = {}, tmpName = '';

        $('.filterForm').each(function () {
            var type = $(this).attr('type');
            var name = $(this).attr('name');
            var val = $(this).val();

            if (type == 'checkbox' && $(this).attr('data-name')) {
                if (filter[name] === undefined) {
                    filter[name] = [];
                }

                if ($(this)[0].checked) {
                    filter[name].push(val);
                    form[name] = filter[name].join(',');
                }
            } else if (type == 'textarea') {
                var content = tinyMCE.get(name).getContent();
                form[name] = content;
            } else {
                form[name] = val;
            }
            if (name == 'gameTypeId') {
                if ($('[name="gameTypeId"]')[0].hasAttribute('disabled')) {
                    form['gameTypeId'] = '';
                } else {
                    form['gameTypeId'] = val;
                }
            }
        });

        var value = '';
        $('[name="levelIds"]').each(function () {
            if (this.checked == true && this.value !== '') {
                value = value + this.value + ',';
            }
        });

        form['levelIds'] = value.slice(0, -1);
        form['companyIds'] = module_companyTree.searchCompanysId('#companysTree');
        form['action'] = 'list';

        return form;
    },
    getQueryResult: function (currentPage) {

        var form = view.search();

        if (currentPage !== undefined) {
            form['page'] = currentPage;
            model_global_global.ajaxLoading(true);
        } else {
            $('#submit').attr('data-disabled', true);
            $('#result').hide();
        }

        $('#btnBatchEdit').addClass('hidden');
                
        $.post(
            '/pointControl/announce/list',
            JSON.stringify(form),
            function (res) {

                var lang = model_global_global.getLangText(res);
                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);
                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'), 0);
                    }
                    $('#submit').attr('data-disabled', false);
                } else {
                    $('.input.error').removeClass('error');
                    $('.message').hide();
                }

                var data = JSON.parse(res);
                var result = dataHandler.groupingJSONData(data.d, viewList.field.token);

                if (currentPage !== undefined) {
                    model_global_global.ajaxLoading(false);
                } else {
                    $('#submit').attr('data-disabled', false);
                }

                if (data.d.length > 0) {
                    var html = viewList.renderAnnResultHtml(result);
                    if (!currentPage) {
                        var pagerHtml = pagerViewOne.renderPaginationHtml(data.p, data.d.length);
                        $('.pageGroup').html(pagerHtml);
                    }
                    $('#result').show();
                } else {
                    var html = viewList.renderEmptyDataHtml();
                    $('#result').show();
                }
                $('#listTable').html(html);

            }
        )
    }

};

$(function () {
    view.init();
});