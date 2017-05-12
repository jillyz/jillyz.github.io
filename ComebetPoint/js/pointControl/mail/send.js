var view = {
    field: {
        "userId": "a",
        "username": "b",
        "companyId": "c",
    },
    init: function () {
        roulte.appendView();
        if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        //分站樹狀選單
        module_companyTree.init('/pointControl/mail/send', '#companysTree', false); //postUrl, treeMenuContainerID, radio

        //站內信類別
        var ddlMailTypeHtml = dropDownListView.renderHtml('type', mailTypes, '', '', true, typeLang);
        $('#type').html(ddlMailTypeHtml);

        view.bindEvent();
    },
    bindEvent: function () {

        $('#form_box').on('click', '.getMembers-js', function () {
            view.getMembers();
        });

        $('#form_box').on('click', '.group-js', function () {
            $(this).parent('.groupWrap').toggleClass('isOpen');
        });

        $('#form_box').on('click', '.sendMail-js', function () {
            view.sendMail($(this));
        });

        $('#form_box').on('click', '.closeCompany-js, .openCompany-js', function () {
            $('.closeCompany-js, .openCompany-js').toggleClass('hidden');
            $('.companyWrap').toggleClass('hidden');
            $('.membersWrap').toggleClass('expand');
        });
    },
    autogrow:function (textarea){
        var adjustedHeight=textarea.clientHeight;
        adjustedHeight=Math.max(textarea.scrollHeight,adjustedHeight);
        if (adjustedHeight > textarea.clientHeight) {
            textarea.style.height = adjustedHeight + 'px';
        }
    },
    memberCompanyHtml: function (dataMembers) {
        var html = '';

        for (companyId in dataMembers) {
            html += '<div class="noSelect groupWrap">';
            html += '<div class="group group-js">' +
                        '<i class="icon-down-open ic-down"></i>' +
                        '<i class="icon-up-open ic-up"></i>' +
                        searchView.searchCompanyName(companyId, companys) +
                    '</div>';
            html += '<div class="items">' + view.memberListHtml(dataMembers[companyId]); + '</div>';
            html += '</div>';
        }

        $('#memberList').html(html);
    },
    memberListHtml: function (data) {
        var html = '';

        for ( var i = 0; i < data.length; i++){
            html +=
            '<span>' +
            '<input type="checkbox" name="members" id="m_' + data[i][view.field.userId] + '" data-id="' + data[i][view.field.userId] + '" checked>' +
            '<label class="mItem" for="m_' + data[i][view.field.userId] + '">' + data[i][view.field.username] + '</label>' +
            '</span>';
        }

        return html;

    },
    getMembers: function () {
        var form = {};

        form['action'] = 'members';
        form['companyIds'] = module_companyTree.searchCompanysId('#companysTree');

        model_global_global.ajaxLoading(true);
        $.post(
            '/pointControl/mail/send',
            JSON.stringify(form),
            function (res) {

                model_global_global.ajaxLoading(false);
                var msg = model_global_global.getLangText(res);

                var data = JSON.parse(res);

                if (data.d.length > 0) {
                    var dataMembers = dataHandler.groupingJSONDataToObj(data.d, 'c');
                    view.memberCompanyHtml(dataMembers);
                    $('#noMembersTipWrap').hide();
                    $('#sendWrap').show();
                } else {
                    $('#memberList').html('<span style="color: #607D8B;">' + lang.MAIL_SEND_TIP_NO_MEMBER + '</span>');
                    $('#noMembersTipWrap').show();
                    $('#sendWrap').hide();
                }
                if (msg['key'] !== undefined) {
                    model_global_global.showNotice(msg['value']);
                }
            }
        )
    },
    search: function () {
        var form = {};
        var ids = [];

        $('[name="members"]:checked').each(function () {
            var id = $(this).attr('data-id');
            ids.push(id);
        })

        form['action'] = 'send';
        form['ids'] = ids.toString();
        form['type'] = $('[name="type"]').val();
        form['title'] = $('[name="title"]').val();
        form['value'] = $('[name="value"]').val();

        return form;
    },
    sendMail: function (btn) {

        var form = view.search();
        btn.attr('data-disabled', true);
        var rawData = model_global_global.objectToJRSA(form);

        $.post(
            '/pointControl/mail/send',
            rawData,
            function (data) {

                var lang = model_global_global.getLangText(data);

                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                btn.attr('data-disabled', false);
            }
        )
    }
};

$(function () {
    view.init();
});