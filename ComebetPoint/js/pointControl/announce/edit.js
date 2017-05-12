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

        initView.dateTimePicker();
        var checkedIds = data[view.field.levelIds];
        initView.renderLeveleTagListHtml();
        view.searchLevelTagsSetItemChecked();
        view.renderSubTypeListHtml();

        initView.renderLangContentHtml('#langContent', 'edit');

        view.bindEvent();

        view.clearEditStyle();
    },
    bindEvent: function () {

        $('#EditBox').on('click', '.editMode-js', function () {
            var root = $(this).parents('.rootEdit');

            root.find('.editField').removeAttr('disabled');
            root.find('.defaultField').attr('disabled', '');
            $(this).addClass('isHidden');
            root.find('.editModeCancel-js').removeClass('isHidden');
        });

        $('#EditBox').on('click', '.editModeCancel-js', function () {
            var root = $(this).parents('.rootEdit');

            root.find('.editField').attr('disabled', '');
            root.find('.defaultField').removeAttr('disabled');
            $(this).addClass('isHidden');
            root.find('.editMode-js').removeClass('isHidden');
        });

        $('#EditBox').on('click', '.cancelSubTypeList-js', function () {
            var typeListOption = initView.renderTypeListHtml('', data[view.field.type]);
            $('#type').html(typeListOption);
            $('#subType').html('');
        });

        $('#EditBox').on('click', '.editModeEditor-js', function () {
            var root = $(this).parents('.rootEdit');

            root.find('.editField').removeAttr('disabled');
            root.find('.defaultField').attr('disabled', '');
            $(this).addClass('isHidden');
            root.find('.editModeEditorCancel-js').removeClass('isHidden');
        });

        $('#EditBox').on('click', '.editModeEditorCancel-js', function () {
            var root = $(this).parents('.rootEdit');

            root.find('.editField').attr('disabled', '');
            root.find('.defaultField').removeAttr('disabled');
            $(this).addClass('isHidden');
            root.find('.editModeEditor-js').removeClass('isHidden');
        });

        $('input[type=checkbox]').change(function () {
            initView.chkStatusChange(this);
        });

        $('[name="type"]').change(function () {
            view.renderSubTypeListHtml();
            view.clearEditStyle();
        });

        $('#EditBox').on('click', '.update-js', function () {
            view.updateDataHandler();
        });
    },
    clearEditStyle: function(){
        var urlObj = getUrl.parseParamValue();
        var batchIds = urlObj.batchIds;
        var batchIdsArray = batchIds.split(",");
        if (batchIdsArray.length === 1) {
            $('.editMode-js, .editModeEditor-js').each(function () {
                $(this).trigger('click');
                $('.editModeCancel-js, .editModeEditorCancel-js').addClass('isHidden');
                $('.editBorder').removeClass('editBorder');
                $('.editBorderB').removeClass('editBorderB');
                $('#tip').remove();
            });
        }
    },
    renderSettingViewHtml: function () {

        var n = data[view.field.type] - 1;
        var array = data[view.field.levelIds].split(",");

        var urlObj = getUrl.parseParamValue();
        var batchIds = urlObj.batchIds;
        var batchIdsArray = batchIds.split(",");

        var GameTypeId = data[view.field.gameTypeId];
        var GameTypeText = searchView.searchText(data[view.field.gameTypeId], types);

        var html = '';
        html =
            '<input type="hidden" name="companyIds" value="' + batchIds + '" />' +
            '<table class="queryBox">' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_EDIT_PUBLIC_DATE_TIME + '</th>' +
                    '<td class="setDateTime rootEdit">' +
                        '<div class="mui-textfield inline">' +
                            '<div id="dateTimeRange" class="mt inline input">' +
                                '<input id="fromTime" type="text" name="beginDateTime" placeholder="從" class="editField editBorderB dateTime dateTimePicker" maxlength="10" value="' + data[view.field.beginDateTime] + '" disabled />' +
                                '<input id="toTime" type="text" name="endDateTime" placeholder="到" class="editField editBorderB dateTime dateTimePicker" maxlength="10" value="' +data[view.field.endDateTime]+ '" disabled />' +
                                '<input type="text" name="beginDateTime" placeholder="從" class="defaultField dateTime" maxlength="10" value="' + data[view.field.beginDateTime] + '" readonly  />' +
                                '<input type="text" name="endDateTime" placeholder="到" class="defaultField dateTime" maxlength="10" value="' + data[view.field.endDateTime] + '" readonly  />' +
                            '</div>' +
                        '</div>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editMode-js"><span class="icon icon-pencil"></span></a>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeCancel-js"><i class="icon-cancel"></i></a>' +
                    '</td>' +
                '</tr>' +
                ((batchIdsArray.length > 1) ? '' : '<tr><th>' + lang.ANNOUNCE_EDIT_COMPANY + '</th><td>' + searchView.searchCompanyName(data[view.field.companyId], companys) + '</td></tr>') +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_EDIT_LEVEL + '</th>' +
                    '<td class="rootEdit">' +
                        '<div class="input">' +

                            '<ul class="levelListView defaultField" style="width: auto;" >' +
                                initView.renderTextList(array) +
                            '</ul>' +

                            '<div id="levelList" class="filterTag level editField editBorderB" name="levelId" style="width: auto; vertical-align: middle; " disabled>' +
                            '</div>' +

                            '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editMode-js"><span class="icon icon-pencil"></span></a>' +
                            '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden pullRight editModeCancel-js"><i class="icon-cancel"></i></a>' +

                        '</div>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_EDIT_ANNOUNCE_TYPE + '</th>' +
                    '<td class="rootEdit">' +
                        '<div class="inline">' +
                            '<select id="type" name="type" class="select editField editBorderB" disabled>' +
                                initView.renderTypeListHtml('', data[view.field.type]) +
                            '</select>' +
                        '</div>' +
                        '<div class="inline">' +
                            '<div class="select defaultField">' +
                                searchView.searchText(data[view.field.type], types) +
                            '</div>' +
                        '</div>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editMode-js"><span class="icon icon-pencil"></span></a>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeCancel-js' + ((GameTypeText == undefined) ? ' cancelSubTypeList-js' : "") + '"><i class="icon-cancel"></i></a>' +
                    '</td>' +
                '</tr>' +
                '<tr id="subType"></tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_EDIT_TOP_MOST + '</th>' +
                    '<td class="rootEdit">' +
                        '<div class="inline">' +
                            '<select name="topMost" class="select editField editBorderB" disabled>' +
                                '<option value="false">否</option>' +
                                '<option value="true">是</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="inline">' +
                            '<div class="select defaultField">' +
                                ( data[view.field.topMost] ? '是' : '否') +
                            '</div>' +
                        '</div> ' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editMode-js"><span class="icon icon-pencil"></span></a>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeCancel-js"><i class="icon-cancel"></i></a>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<th>' + lang.ANNOUNCE_EDIT_STATUS + '</th>' +
                    '<td class="rootEdit">' +
                        '<div class="inline">' +
                            '<select name="status" class="select editField editBorderB" disabled>' +
                                view.renderStatusOptionHtml() +
                            '</select>' +
                        '</div>' +
                        '<div class="inline">' +
                            '<div class="select defaultField">' +
                                searchView.searchText(data[view.field.status], status2) +
                            '</div>' +
                        '</div> ' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editMode-js"><span class="icon icon-pencil"></span></a>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeCancel-js"><i class="icon-cancel"></i></a>' +
                    '</td>' +
                '</tr>' +
            '</table>';

        $('#EditSetting').html(html);
    },

    renderSubTypeListHtml: function () {

        var typeIdInit = data[view.field.type];
        var typeIdNow = $('[name="type"]')[0].value;

        for (key in types) {

            if (types[key].id == typeIdNow) {

                var data2 = types[key].d; // gameTypeId , SubTypeList-Data
                var GameTypeId = data[view.field.gameTypeId];
                var GameTypeText = searchView.searchText(data[view.field.gameTypeId], types)

                var html = '';

                if (data2.length > 0) {
                    html +=
                    '<th>' + lang.ANNOUNCE_EDIT_GAME_TYPE + '</th>' +
                    '<td class="rootEdit">' +
                        '<div class="inline">' +
                            '<select id="gameTypeId" class="select form editField editBorderB" name="gameTypeId" ' + ((GameTypeId == undefined || GameTypeText == undefined) ? '' : 'disabled') + '>';
                    for (var i = 0; i < data2.length; i++) {
                        html +=
                            '<option value="' + data2[i].id + '">' + data2[i].name + '</option>';
                    }
                    html +=
                            '</select>' +
                        '</div>' +
                        '<div class="inline">' +
                            '<div class="select defaultField" ' + ((GameTypeId == undefined || GameTypeText == undefined) ? 'disabled' : '') + '>' +
                                GameTypeText +
                            '</div>' +
                        '</div>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger ' + ((GameTypeText == undefined) ? 'isHidden' : '') + ' editMode-js"><span class="icon icon-pencil"></span></a>' +
                        '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeCancel-js"><i class="icon-cancel"></i></a>' +
                    '</td>';
                }
                $('#subType').html(html);
            }
        }
        view.searcTypeSetItemSelected('#gameTypeId', data[view.field.gameTypeId]);
    },
    renderStatusOptionHtml: function () {
        var html = '';
        for (var i = 0; i < status2.length; i++) {
            html +=
                '<option value="' + status2[i].id + '" ' + ((status2[i].id == data[view.field.status]) ? 'selected' : '') + '>' +
                    status2[i].name +
                '</option>';
        }
        return html;
    },
    // 設置階層已選的選項
    searchLevelTagsSetItemChecked: function () {
        var arrLevelIds = data[view.field.levelIds].split(",");

        for (var i = 0; i < arrLevelIds.length; i++) {
            $('[name="levelIds"]').each(function () {
                var value = this.value;
                if (value == arrLevelIds[i]) {
                    this.checked = true;
                }
            });
        }
    },
    // 設置公告已選的選項
    searcTypeSetItemSelected: function (dom, id) {
        var option = $(dom).children('option');

        for (var i = 0; i < option.size() ; i++) {
            var val = option[i].value;
            if (val == id) {
                option[i].selected = true;
            }
        }
    },
    updateDataHandler: function () {

        var form = {};

        form['action'] = 'update';
        
        var urlObj = getUrl.parseParamValue();
        var batchIds = urlObj.batchIds;
        form['ids'] = batchIds;

        var beginDateTime = $('.editField[name="beginDateTime"]').not('[disabled]').val();
        if (beginDateTime !== undefined) {
            form['beginDateTime'] = beginDateTime;
        }

        var endDateTime = $('.editField[name="endDateTime"]').not('[disabled]').val();
        if (endDateTime !== undefined) {
            form['endDateTime'] = endDateTime;
        }

        var levelIds = $('.editField[name="levelId"]').not('[disabled]').val();
        if (levelIds !== undefined) {
            var value = '';
            $('.form[data-name="levelId"]').each(function () {
                if (this.checked == true) {
                    value = value + this.value + ',' ;
                }
            });
            form['levelIds'] = value.slice(0,-1);;
        }        

        var type = $('.editField[name="type"]').not('[disabled]').val();
        if (type !== undefined) {
            form['type'] = type;
        }

        var gameTypeId = $('.editField[name="gameTypeId"]').not('[disabled]').val();
        if (gameTypeId !== undefined) {
            form['gameTypeId'] = gameTypeId;
        }

        var topMost = $('.editField[name="topMost"]').not('[disabled]').val();
        if (topMost !== undefined) {
            form['topMost'] = topMost;
        }

        var status = $('.editField[name="status"]').not('[disabled]').val();
        if (status !== undefined) {
            form['status'] = status;
        }

        for (var i = 0; i < nations.length; i++) {
            var titleKey = 'title_' + nations[i].id;
            var titleContent = $('.editField[name="' + titleKey + '"]').not('[disabled]').val();
            if (titleContent !== undefined) {
                form[titleKey] = titleContent;
            }
            var valueKey = 'value_' + nations[i].id;
            var valueGet = $('.editField[name="' + valueKey + '"]').not('[disabled]').val();
            var valueContent = tinyMCE.get(valueKey).getContent();
            if (valueGet !== undefined) {
                form[valueKey] = valueContent;
            }
        }

        if (form['levelIds'] == '') {
            model_global_global.showNotice(lang.ANNOUNCE_EDIT_ATLEAST_ONE_LEVEL); //請選擇至少一個階層
            return;
        }
        if (form['beginDateTime'] == '' || form['endDateTime'] == '') {
            model_global_global.showNotice(lang.ANNOUNCE_EDIT_DATE_TIME_IMCOMPLETE); //有效日期必須填寫完整
            return;
        }

        if ($('.editField').not('[disabled]').size() < 1) {
            model_global_global.showNotice(lang.ANNOUNCE_EDIT_NOT_ON_EDIT_MODE); //沒有編輯中資料可儲存
            return;
        }

        var rawData = model_global_global.objectToJRSA(form);

        model_global_global.ajaxLoading(true);

        $.post(
            '/pointControl/announce/edit',
            JSON.stringify(form),
            function (data) {
                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(data);

                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);

                    if (lang['key'] == 'levelIds') {
                        lang['key'] = 'levelId';
                    }

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                console.log(JSON.stringify(form));
                console.log(rawData);
            }
        )
    }

};

$(function () {
    view.init();
});