var view = {
    field: {
        'userId': 'a',
        'userAuth': 'b',
        'upLevelAuth': 'c'
    },
    init: function () {
        roulte.appendView(); if (typeof pageTitle === 'undefined') { return; }
        view.title = pageTitle;

        var query = model_global_global.getQueryString(model_global_global.getHash());
        isLookSelf = query['query']['id'] == myId ? true : false;

        view.getTitle();
        view.renderSettingGroupHtml('#settings', pageGroup, pageUrl, data);
        $('.options').hide();
        view.allCheck();

        if (canEdit == false) {
            $('.settingOption input:checkbox').prop('disabled', true);
            $('#submit_box').remove();
        }

        view.bindEvent();
    },
    bindEvent: function () {
		$('#submit_box').on('click', '.save-js', function () {
    		var isEditedNum = $(':checkbox[data-edited="true"]:not(:checked)').size();
    		if (isEditedNum > 0) {
    			view.renderConfirmHtml();
    			myModal.showModal('#dialog');
    		} else {
    			view.update($(this));
    		}
    	});

    	$('#dialog').on('click', '.save-js', function () {
    		view.update($(this));
    	});

        // 全部群組展收
        $('#form_box').on('click', '.btnToggleAll-js', function () {
            var $this = $(this),
                isOpen = $this.attr('data-open');

            if (isOpen == 'false') {
                $(this).attr('data-open', 'true');
                $('.btnPageGroup, .options').attr('data-open', 'true');
                $('.options').stop().slideDown();
            }
            else if (isOpen == 'true') {
                $(this).attr('data-open', 'false');
                $('.btnPageGroup, .options').attr('data-open', 'false');
                $('.options').stop().slideUp();
            }
        });

        // 某群組展收
        $('#settings').on('click', '.toggleGroup-js', function () {

            var $groupBar = $(this).parents('.btnPageGroup'),
                groupIndex = $groupBar.parents('.settingGroup').index(),
                $groupOption = $('.settingGroup:eq(' + groupIndex + ')').find('.options'),
                isOpen = $groupBar.attr('data-open');

            if (isOpen == 'false') 
            {
                $groupBar.attr('data-open', 'true');
                $groupOption.attr('data-open', 'true').stop().slideDown();
            } 
            else if (isOpen == 'true')
            {
                $groupBar.attr('data-open', 'false');
                $groupOption.attr('data-open', 'false').stop().slideUp();
            }

            view.allToggle();

        });

        // 全部群組內項目全選
        $(document).on('click', '#all', function () {
            if (this.checked) {
                $('.settingGroup :checkbox').prop('checked', true);
                //UI
                $('.btnPageGroup, .options, .btnToggleAll-js').attr('data-open', 'true');
                $('.options').slideDown();
            } else {
                $('.settingGroup :checkbox').prop('checked', false);
            }
            view.calcNum();
            $(':checkbox[data-edited="false"]').trigger('change');
        });

        // 某群組內項目全選
        $('#form_box').on('click', '.all', function () {
            var groupIndex = $(this).parents('.settingGroup').index(),
                $thisGroup = $('.settingGroup:eq(' + groupIndex + ')'),
                $thisGroupChks= $thisGroup.find('.options :checkbox');

            if (this.checked) {
                $thisGroupChks.prop('checked', true);
                //UI
                $thisGroup.find('.btnPageGroup').attr('data-open', 'true');
                $thisGroup.find('.options').stop().slideDown().attr('data-open', 'true');
                $('.btnToggleAll-js').attr('data-open', 'true');
            } else {
                $thisGroupChks.prop('checked', false);
            }
            view.allCheck();
            view.calcNum();
            $thisGroup.find(':checkbox[data-edited="false"]').trigger('change');
        });

        // 群組內單個項目勾選
        $('#form_box').on('click', '.options :checkbox', function () {
            var groupIndex = $(this).parents('.settingGroup').index();
            view.groupCheck(groupIndex);
            view.allCheck();
            view.calcNum();
        });

        $('#form_box').on('change', ':checkbox[data-edited="false"]', function () {
            $(this).attr('data-edited', true);
        });
    },
    isContains: function (longStr, containStr) {
        return new RegExp(containStr.toLowerCase()).test(longStr.toLowerCase());
    },
    groupCheck: function (groupIndex) {
        var num_all = $('.settingGroup:eq(' + groupIndex + ') .options :checkbox').size(); //選項總個數
        var num_checked = $('.settingGroup:eq(' + groupIndex + ') .options :checkbox:checked').size(); //選中個數
        if (num_all == num_checked) { //若選項總個數等於選中個數
            $('.settingGroup:eq(' + groupIndex + ') .all').prop("checked", true); //全選選中
        } else {
            $('.settingGroup:eq(' + groupIndex + ') .all').prop("checked", false);
        }
    },
    allCheck: function () {
        var num_all = $('#settings :checkbox').size(); //選項總個數
        var num_checked = $('#settings :checkbox:checked').size(); //選中個數

        if (num_all > 0) {
            if (num_all == num_checked) { //若選項總個數等於選中個數
                $('#all').prop('checked', true); //全選選中
            } else {
                $('#all').prop('checked', false);
            }
        } else {
            $('#submit_box').hide(); //無可設定(上層全關)=>不可修改則不顯示儲存
        }        
    },
    allToggle: function () {
        var allNum = $('#settings .btnPageGroup').size(); //選項總個數
        var openNum = $('#settings .btnPageGroup[data-open="true"]').size(); //選中個數
        if (allNum == openNum) { //若選項總個數等於選中個數
            $('.btnToggleAll').attr('data-open', 'true');
        } else {
            $('.btnToggleAll').attr('data-open', 'false');
        }
    },
    //更新btnPageGroup內的已勾選數量
    calcNum: function () {
        $('.settingGroup').each(function () {
            var num = $(this).find('.settingOption :checked').size();
            $(this).find('.selectNum').text(num);
        });        
    },
    getTitle: function () {
        var urlObj = getUrl.parseParamValue(),
            username = urlObj.username;
        
        var isMySelfView = data[view.field.userId] == myId;

        if (canEdit == true && isMySelfView == true) {
            $('#authPgaeTitle').html(lang.AUTH_SETTING_PAGE_TITLE_MY + lang.AUTH_SETTING_PAGE_TITLE_CAN_EDIT_TRUE);
        }
        if (canEdit == true && isMySelfView == false) {
            $('#authPgaeTitle').html(username + '&nbsp;' + lang.AUTH_SETTING_PAGE_TITLE_CAN_EDIT_TRUE);
        }
        if (canEdit == false && isMySelfView == true) {
            $('#authPgaeTitle').html(lang.AUTH_SETTING_PAGE_TITLE_MY + lang.AUTH_SETTING_PAGE_TITLE_CAN_EDIT_FALSE);
        }
        if (canEdit == false && isMySelfView == false) {
            $('#authPgaeTitle').html(username + '&nbsp;' + lang.AUTH_SETTING_PAGE_TITLE_CAN_EDIT_FALSE);
        }
        
    },
    renderSettingGroupHtml: function (dom, pageGroup, pageUrl, data) {
        var html = '';

        for (pageGroupUrl in pageGroup) {
            html +=
            '<div class="settingGroup">' +
                '<div class="inline btnPageGroup" data-open="false">' +
                    '<div class="toggleGroup-js">' +
                        '<span class="icon icon-down-open iconOpen"></span>' +
                        '<span class="icon icon-up-open iconClose"></span>' +
                        pageGroup[pageGroupUrl] +
                    '</div>' +                    
                    view.checkIsContainsUrl(pageGroupUrl, pageUrl, data, 'btnSelectAll') +　//群組內 全選checkbox,是否產生
                '</div>' +
                '<div class="noSelect fillForm options" data-open="false">' +
                    view.checkIsContainsUrl(pageGroupUrl, pageUrl, data, 'option') +　//群組內 權限設定項目
                '</div>' +
            '</div>';
        }

        $(dom).html(html);
        
        //btnPageGroup右側的checkbox：若群組內已為全選，則checkbox預設勾選
        var indexNum = $('.settingGroup').size();
        for (var i = 0; i < indexNum; i++) {
            view.groupCheck(i);
        }
    },
    checkIsContainsUrl: function (pageGroupUrl, pageUrl, data, element) {

        var result = '',
            hasSettingNum = 0,
            authNum = 0;

        for (id in pageUrl) {
            var isContain = view.isContains(pageUrl[id], pageGroupUrl),
                hasSetting = isLookSelf || canEdit || data[view.field.upLevelAuth][id] == 1 ? true : false, //判斷上層權限：1開 2關
                auth = data[view.field.userAuth][id];

            if (isContain == true && hasSetting == true && auth == 1) {
                authNum += 1;
            }

            if (isContain == true && hasSetting == true) {
                hasSettingNum += 1;
            }

            if (isContain == true) {
                result += view.renderSettingOptionsHtml(id, hasSetting, auth);
            }
        }

        switch(element){

            case 'option': 
                return result;
                break;

            case 'btnSelectAll':
                var chk = '';

                //若群組內可設定的權限數量大於0，則顯示全選按鈕
                if (hasSettingNum > 0) {
                    chk =
                    //群組內項目數量: "已勾選數/全部可選數"
                    '<span class="inline num">' +
                        '<span class="selectNum">' + authNum +  '</span> / ' + hasSettingNum +
                    '</span>' +
                    //群組checkbox: 全選or全取消
                    '<div class="icon-gogog btnSelectAll-js">' +
                        '<input type="checkbox" name="authSetting" data-name="authSetting" id="chk_' + pageGroupUrl + '" class="all" ' + (!canEdit && isLookSelf ? 'disabled="disabled"': '') + '>' +
                    '</div>';
                }
                return chk;
                break;
        }        
    },
    //權限選項
    renderSettingOptionsHtml: function (pageId, hasSetting, auth) {

        var html = '';

        // 上層權限開，則這層才可設定權限開關
        if (hasSetting == true) {
            html = 
            '<div class="settingOption">' +
                '<input type="checkbox" name="authSetting" ' + (!canEdit && isLookSelf ? 'disabled="disabled"': '') + ' data-name="authSetting" id="chk_' + pageId + '" class="filterForm" '+
                 (
                    auth == 1 ?
                    ' checked'
                    :
                    ''
                ) +
                //權限已開 => 加"已編輯"屬性(初始為false表示尚未編輯過) => 為了判斷若有任何權限「從開變關」，則儲存時要跳出確認提示
                (
                    auth == 1 ?
                    ' data-edited="false"'
                    :
                    ''
                ) +
                ' data-auth-name="' + pageId + '">' +
                '<label for="chk_' + pageId + '">' + searchView.searchText(pageId, pageName) + '</label>' +
            '</div>';
        } else {
            html =
            '<div class="settingOption">' +
                '<label for="chk_' + pageId + '" class="noAuth">' + searchView.searchText(pageId, pageName) + ' <span class="grey">(' + lang.AUTH_SETTING_UP_LEVEL_AUTH_IS_CLOSED + ')</span></label>' +
            '</div>';
        }

        return html;
    },
    renderConfirmHtml: function () {

        var xx = '';

        var html =
        '<table class="dialogTable fillForm">' +
            '<tbody>' +
            '<tr class="rowTitle">' +
                '<td class="red bold">' + lang.AUTH_SETTING_TIP_WILL_EFFECT_UNDER_LEVEL + '<td>' +
            '</tr>' +
            '<tr>' +
                '<td>' +view.renderOptionIsEditedFrom1To2() + '<td>' +
            '</tr>' +
            '<tr>' +
                '<td>' +
                    '<div class="mui-btn mui-btn--primary save-js">' + lang.AUTH_SETTING_DIALOG_BTN_SUBMIT + '</div>' +
                    '<div class="mui-btn mui-btn--default modalClose-js">' + lang.AUTH_SETTING_DIALOG_BTN_CANCEL + '</div>' +
                '<td>' +
            '</tr>' +
            '</tbody>' +
        '</table>';

        $('#dialog .myModalContent').html(html);

    },
    //若權限選項：本來為開(1)，變成關閉(2)
    renderOptionIsEditedFrom1To2: function () {
        var html = '';

        $(':checkbox[data-edited="true"]:not(:checked)').each(function () {
            var authTxt = $(this).next('label').text(),
                groupTxt = $(this).parents('.settingGroup').find('.toggleGroup-js').text();
            html += '<li><label class="red bold">' + groupTxt + ' > ' + authTxt + '</label></li>';
        });

        return html;
    },
    updateAuthOptionStatus: function () {
        $('.options [name="authSetting"]').each(function () {
            var staus = $(this).prop('checked');
            //權限關閉後
            if (staus == false)
            {
                //移除"已編輯"標記 =>移除紅色三角驚嘆圖示
                $(this).removeAttr('data-edited');
            }
            //權限打開後
            else
            {
                //初始化"已編輯"標記 =>待下次轉關後才會變更為data-edited=true
                $(this).attr('data-edited', false);
            }
        });
    },
    search: function () {

        var form = {},
            authData = {};

        var urlObj = getUrl.parseParamValue(),
            userId = urlObj.id;

        form['action'] = 'update';
        form['id'] = userId;

        $('.filterForm').each(function () {
            var authId = $(this).attr('data-auth-name'),
                authIsChecked = $(this).prop('checked'),
                authVal = authIsChecked == true ? 1 : 2 ; //權限: 1開 2關
            authData[authId] = authVal;
        });

        form['auth'] = authData;
        
        return form;
    },
    update: function (btn) {
        var form = view.search();

        btn.attr('data-disabled', true);

        $.post(
            '/pointControl/member/auth_setting',
            JSON.stringify(form),
            function (data) {
                btn.attr('data-disabled', false);

                view.updateAuthOptionStatus();

                var lang = model_global_global.getLangText(data);

                if (lang['key'] !== undefined) {
                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                myModal.hideModal();
            }
        )
    },
}

$(function () {
    view.init();
});

