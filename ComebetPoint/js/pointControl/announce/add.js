var view = {

    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;
        initView.dateTimePicker();
        initView.renderLeveleTagListHtml();
        initView.renderTypeListHtml('', '', '#type');

        initView.renderLangContentHtml('#langContent', 'add');

        //分站樹狀選單
        module_companyTree.init('/pointControl/announce/add', '#companysTree', false); //postUrl, treeMenuContainerID, radio

        //呈現方式 下拉選單
        var modeHtml = dropDownListView.renderHtml('mode', displayModes, '', false, false);
        $('#displayModes').html(modeHtml);

        //舊的分站選單
        //model_global_global.appendCompanyFilterListBoxHtml('#company_filter_list_box-js', companys);

        view.bindEvent();
    },

    bindEvent: function () {

        $('input[type=checkbox]').change(function () {
            initView.chkStatusChange(this);
        });

        $('.addBtn-js').click(function () {
            view.add(this);
        });

        $('[name="type"]').change(function () {
            initView.renderSubTypeListHtml();
        });
    },

    add: function (isSearch) {
        var form = {};
        
        var filter = {}, tmpName = '';
        $('.form').each(function () {
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

        //form['companyIds'] = model_global_global.getCompanyIdForm();
        //if (form['companyIds'] === '') {
        //    form['companyIds'] = model_global_global.getCompanyIdBySelect()
        //}

        form['companyIds'] = module_companyTree.searchCompanysId('#companysTree');

        form['action'] = 'add';

        var rawData = model_global_global.objectToJRSA(form);
        model_global_global.ajaxLoading(true);
        $.post(
            '/pointControl/announce/add',
            rawData,
            //JSON.stringify(form),
            function (data) {
                model_global_global.ajaxLoading(false);
                var lang = model_global_global.getLangText(data);

                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);

                    if (lang['key'] == 'levelIds') {
                        lang['key'] = 'levelId';
                    }

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }

                    if (lang['key'] == 'success') {
                        location.href = '/pointControl/index#/pointControl/announce/list?query=yes';
                    }
                }
            }
        )
    }

};

$(function () {
    view.init();
});