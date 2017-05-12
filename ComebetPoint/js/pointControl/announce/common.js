var initView = {
    dateTimePicker: function () {
        $('.dateTimePicker').datetimepicker({
            dateFormat: 'yy/mm/dd',
            showSecond: true,
            timeFormat: 'HH:mm:ss'
        });
    },
    renderTextList: function (array) {
        var html = '';
        for (var i = 0; i < array.length; i++) {
            //var text = initView.searchText(array[i], levels, 1);
            var text = searchView.searchText(array[i], levels);
            html += '<li>' + text + '</li>';
        }
        return html;
    },
    renderLeveleTagListHtml: function () {
        var data = levels.splice(1, levels.length-1);

        console.log(levels, data);

        var html =
            '<div class="filterTagItem">' +
                '<label class="chkType">' +
                    '<input class="chkIcon all" name="levelIds" data-name="levelId" type="checkbox" value="" />' +
                    '<span class="check icon icon-check"></span>' +
                    '<span class="cancel icon icon-cancel"></span>' +
                    '<span class="text">' + lang.ALL + '</span>' +
                '</label>' +
            '</div>';

        for (var i = 0; i < data.length; i++) {
            html +=
            '<div class="filterTagItem">' +
                '<label class="chkType">' +
                    '<input class="chkIcon form" name="levelIds" data-name="levelId" type="checkbox" value="' + data[i].id + '" />' +
                    '<span class="check icon icon-check"></span>' +
                    '<span class="cancel icon icon-cancel"></span>' +
                    '<span class="text">' + data[i].name + '</span>' +
                '</label>' +
            '</div>';
        }
        html += '<div class="clearfix"></div>';

        $('#levelList').html(html);
    },
    renderTypeListHtml: function (param, defaultVal, dom) {
        var annType = types;
        var html = '';
        if (param == 'all') {
            html +=
            '<option value="">' + lang.ALL + '</option>';
        }

        for ( var i = 0; i < annType.length; i++) {
            html +=
                '<option value="' + annType[i].id + '"' +
                    ((defaultVal !== undefined && annType[i].id == defaultVal) ? ' selected' : '') +
                    '>' +
                    annType[i].name +
                '</option>';
        }

        if (dom) {
            $(dom).html(html);
            initView.renderSubTypeListHtml();
            return;
        }

        return html;
    },
    renderSubTypeListHtml: function ( defaultVal ) {
        var typeId = $('[name="type"]')[0].value;

        var html = '';

        for (key in types) {
            if (types[key].id == typeId) {
                var data = types[key].d; //SubTypeList-Data
                
                if (data.length > 0) {
                    html +=
                    '<th>' + gameTypeLang.TYPE + '</th>' +
                    '<td class="rootEdit">' +
                        '<div class="inline input">' +
                            '<select class="select filterForm" name="gameTypeId">'+
                                '<option value="">' + gameTypeLang.NO_FILTER + '</option>';
                    for (var i = 0; i < data.length; i++) {
                        html +=
                                '<option value="' + data[i].id +
                                    (( defaultVal !== undefined && data[i].id == defaultVal) ? ' selected' : '') +
                                    '">' +
                                    data[i].name +
                                '</option>';
                    }
                    html +=
                            '</select>' +
                        '</div>' +
                    '</td>';
                }
            }
        }
        $('#subType').html(html);
    },
    chkStatusChange: function (dom) {
        var name = $(dom).attr('data-name');
        var chk = true;

        if (!$(dom).hasClass('all')) {
            $('[data-name="' + name + '"]').each(function () {
                if ($(this).hasClass('all')) {
                    return;
                }
                if (!$(this)[0].checked) {
                    chk = false;
                    return;
                }
            });

            if ($('input[data-name="' + name + '"].all').size() > 0) {
                $('input[data-name="' + name + '"].all')[0].checked = chk;
            }
        } else {
            var boo = $(dom)[0].checked;
            $('input[data-name="' + name + '"][class!=all]').each(function () {
                $(this)[0].checked = boo;
            });
        }
    },

    renderLangContentHtml: function (dom, mode) {

        var _lang = nations;

        var html = '';

        html +=
            '<div class="mui-panel">';

        // TAB -------
        html +=
                '<ul class="mui-tabs__bar mui-tabs__bar--justified">';
        for (var i = 0; i < _lang.length; i++) {
            html +=
                        '<li' + ((i == 0) ? ' class="mui--is-active"' : '') + '>' +
                            '<a data-mui-toggle="tab" data-mui-controls="pane_' + _lang[i].id + '">' + _lang[i].name + '</a>' +
                        '</li>';
        }
        html += '</ul>';

        // INPUT -------
        switch (mode) {

            case 'add':
                for (var i = 0; i < _lang.length; i++) {
                    html +=
                        '<div class="mui-tabs__pane' + ((i == 0) ? ' mui--is-active' : '') + ' editorWrapper" id="pane_' + _lang[i].id + '">' +
                            '<div class="rootEdit">' +
                                // 公告標題
                                '<label class="noSelect">' +
                                    nationLang.ANNOUNCE_CONTENT_LABEL_TITLE + ' ( ' + _lang[i].id + ' )' +
                                '</label>' +
                                '<input type="text" class="form bigger" name="title_' + _lang[i].id + '" data-name="' + _lang[i].id + '" >' +
                            '</div>' +
                            '<div class="rootEdit">' +
                                // 公告內容
                                '<label class="noSelect">' +
                                    nationLang.ANNOUNCE_CONTENT_LABEL_CONTENT + ' ( ' + _lang[i].id + ' )' +
                                '</label>' +
                                '<textarea type="textarea" class="form mceEditor" name="value_' + _lang[i].id + '" id="value_' + _lang[i].id + '" data-name="' + _lang[i].id + '">' +
                                '</textarea>' +
                            '</div>' +
                        '</div>';
                }
                break;

            case 'edit':
                for (var i = 0; i < _lang.length; i++) {
                    var titleKey = 'b_' + _lang[i].id,
                        titleContent = initView.searchValueInKey(titleKey),
                        valueKey = 'c_' + _lang[i].id,
                        valueContent = initView.searchValueInKey(valueKey);
                    html +=
                    '<div class="mui-tabs__pane' + ((i == 0) ? ' mui--is-active' : '') + ' editorWrapper" id="pane_' + _lang[i].id + '">' +
                        '<div class="rootEdit">' +
                            // 公告標題
                            '<label class="noSelect">' +
                                nationLang.ANNOUNCE_CONTENT_LABEL_TITLE + ' ( ' + _lang[i].id + ' )' +
                                '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editMode-js"><span class="icon icon-pencil"></span></a>' +
                                '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeCancel-js"><i class="icon-cancel"></i></a>' +
                            '</label>' +
                            '<input type="text" name="title_' + _lang[i].id + '" class="editField editBorderB" disabled value="' + titleContent + '">' +
                            '<input type="text" name="title_' + _lang[i].id + '" class="defaultField" readonly value="' + titleContent + '">' +
                        '</div>' +
                        '<div class="rootEdit">' +
                            //公告內容
                            '<label class="noSelect">' +
                                nationLang.ANNOUNCE_CONTENT_LABEL_CONTENT + ' ( ' + _lang[i].id + ' )' +
                                '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger editModeEditor-js"><span class="icon icon-pencil"></span></a>' +
                                '<a class="mui-btn--flat mui-btn--primary mui-btn--small inline bigger isHidden editModeEditorCancel-js"><i class="icon-cancel"></i></a>' +
                            '</label>' +
                            '<div class="editField editBorder" name="value_' + _lang[i].id + '" disabled>' +
                                '<textarea class="mceEditor" name="value_' + _lang[i].id + '">' +
                                    valueContent +
                                '</textarea>' +
                            '</div>' +
                            '<div class="defaultField" readonly>' +
                                valueContent +
                            '</div>' +
                        '</div>' +
                    '</div>';
                }
                break;

            case 'view':
                for (var i = 0; i < _lang.length; i++) {
                    var titleKey = 'b_' + _lang[i].id,
                        titleContent = initView.searchValueInKey(titleKey),
                        valueKey = 'c_' + _lang[i].id,
                        valueContent = initView.searchValueInKey(valueKey);
                    html +=
                        '<div class="mui-tabs__pane' + ((i == 0) ? ' mui--is-active' : '') + ' editorWrapper" id="pane_' + _lang[i].id + '">' +
                            '<div>' +
                                // 公告標題
                                '<label class="noSelect">' +
                                    nationLang.ANNOUNCE_CONTENT_LABEL_TITLE + ' ( ' + _lang[i].id + ' )' +
                                '</label>' +
                                '<div class="annContent bigger">' + titleContent + '</div>' +
                            '</div>' +
                            '<div>' +
                                // 公告內容
                                '<label class="noSelect">' +
                                    nationLang.ANNOUNCE_CONTENT_LABEL_CONTENT + ' ( ' + _lang[i].id + ' )' +
                                '</label>' +
                                '<div class="annContent">' + valueContent + '</div>' +
                            '</div>' +
                        '</div>';
                }
                break;
        }

        html +=
            '</div><!-- mui-panel -->';

        $(dom).html(html);
        initView.tinymceEditor();
    },

    tinymceEditor: function () {
        tinymce.init({
            selector: 'textarea',
            height: 500,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: [
              //'//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
              '//www.tinymce.com/css/codepen.min.css'
            ],
            language: 'zh_TW'
        });
    },

    searchValueInKey: function (key) {
        for (n in data) {
            if (n == key) {
                return data[n];
            }
        }
    },
};
