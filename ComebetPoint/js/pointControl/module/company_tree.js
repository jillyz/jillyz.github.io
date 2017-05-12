// 樹狀選單套用範例
//
// View: 
// 1.定義語系 companyTreeLang
// var companyTreeLang = {
// 'COMPANY_TREE_TIP_PLAESE_SELECT': '請勾選指定分站',
// 'COMPANY_TREE_TIP_SELECTED_COUNT': '已指定分站數',
// 'COMPANY_TREE_TITLE_TOTAL_NEXT_LEVEL': '下層分站數量',
// 'COMPANY_TREE_TITLE_TOTAL_MEMBERS': '會員數量',
// 'COMPANY_TREE_OPTION_COMPANY_ALL': '全部分站',
// 'COMPANY_TREE_OPTION_COMPANY_SPECIFIED': '指定分站',
// 'COMPANY_TREE_BTN_TOGGLE_NEXT_LEVEL': '展開下層',
// 'COMPANY_TREE_BTN_ALL': '全選',
// 'COMPANY_TREE_LABEL_HAS_NODES_NOT_EXPAND': '無法全選！請展開下層的全部分站後，再次全選',
// 'COMPANY_TREE_LABEL_NO_NODE_NEXT_LEVEL': '已展開全部子分站！',
// 'COMPANY_TREE_EMPTY_DATA': '(無資料)'
// }
// 2.建立容器 例如 id="companysTree" 
//              => <div id="companysTree" class="input noSelect companysTree"></div>
//
// JS: 
// 1. init  => module_companyTree.init('/pointControl/announce/add', '#companysTree', true); //postUrl(自己頁面), treeMenuContainerID, radio(true表示只能單選)
// 2. 送資料 => form['companyIds'] = module_companyTree.searchCompanysId('#companysTree');
var module_companyTree = {
    field: {
        "companyId": "a",
        "name": "b",
        "title": "c",
        "memberCount": "d",
        "downCount": "e",
        "principalLevelId": "f",
        "principalId": "g",
        "hasNext": "h"
    },
	state: false,
	init: function (postUrl, treeMenuContainerID, radio, callback) {

        $(treeMenuContainerID).text('Loading......');
        module_companyTree.getCompanysInitData(postUrl, treeMenuContainerID, radio, callback);

        module_companyTree.bindEvent(treeMenuContainerID, radio);
    },
	bindEvent: function (treeMenuContainerID, radio) {

        $(treeMenuContainerID).on('change', '[name="openTree"]', function () {
            var isOpenTree = $(treeMenuContainerID + ' [name="openTree"]:checked').val();

            //1 = true , 0 = false
            if (isOpenTree == 1) { 
                $(treeMenuContainerID + ' .treeWrap').removeClass('hidden');
                $(treeMenuContainerID + ' .treeTip').removeClass('hidden');

            } else {
                $(treeMenuContainerID + ' .selectCompany').prop('checked', false);
                $(treeMenuContainerID + ' .selectCount').text(0);
                $(treeMenuContainerID + ' .treeTip').addClass('hidden');
                $(treeMenuContainerID + ' .treeWrap').addClass('hidden');
            }
        });

        $(treeMenuContainerID).on('click', '.itemToggle-js', function () {
            var $thisNode = $(this).parent('.treeItem').parent('.treeNode');
            var $nextNode = $thisNode.children('.nextNode').children('.treeNode');
            var isOpen = $thisNode.hasClass('isOpen') ? true : false;

            //點擊後收起
            if (isOpen == true) {
                $thisNode.removeClass('isOpen');
                //$nextNode.addClass('hidden'); //hide
            }
                //點擊後展開
            else if (isOpen == false) {
                $(this).attr('data-had-opened', 'true');

                //初次點擊才取資料
                if ($nextNode.hasClass('isFirst')) {
                    var postUrl = $(this).parents('.treeRoot').attr('data-postUrl'),
                        levelId = $(this).attr('data-levelId'),
                        memberId = $(this).attr('data-memberId'),
                        nextTargetId = $(this).attr('data-nextTargetId');

                    module_companyTree.getCompanysLevelData(postUrl, levelId, memberId, nextTargetId, radio);
                }

                $thisNode.addClass('isOpen');
            }
        });

        $(treeMenuContainerID).on('change', '.selectCompany', function () {
            var isChecked = ($(this).prop('checked') == true);
            module_companyTree.selectCount(treeMenuContainerID);
        });

        $(treeMenuContainerID).on('click', '.openNextAllToggle-js', function () {
            var $openNodes = $(treeMenuContainerID).find('.hasNext:not(.isOpen) .itemToggle-js[data-had-opened="false"]');
            var $unopenedNodes = $(treeMenuContainerID).find('.isFirst');
            //還有節點未被點擊過=>展開
            if ($openNodes.size() > 0) {
                $openNodes.each(function () {
                    $(this).trigger('click');
                });
            }
            //全部節點都被點擊過
            //if ($openNodes.size() == 0) {
            //    model_global_global.showNotice(companyTreeLang.COMPANY_TREE_LABEL_NO_NODE_NEXT_LEVEL);
            //}
        });

        $(treeMenuContainerID).on('click', '.selectAll-js', function () {
            var num_all = $(treeMenuContainerID).find('.selectCompany').size(); //選項總個數
            var num_checked = $(treeMenuContainerID).find('.selectCompany:checked').size(); //選中個數

            if (num_checked == num_all) {
                $(treeMenuContainerID).find('.selectCompany').prop('checked', false);
            } else {
                $(treeMenuContainerID).find('.selectCompany').prop('checked', true);
                module_companyTree.hasNodesNotExpand(treeMenuContainerID);
            }
            module_companyTree.selectCount(treeMenuContainerID);
        });

	},
	selectCount: function (treeMenuContainerID) {
	    var num = $('.selectCompany:checked').size();
	    $(treeMenuContainerID).find('.selectCount').text(num);
	},
	hasNodesNotExpand: function (hasNodesNotExpand) {
	    var hasNodesNotExpand = $(hasNodesNotExpand + ' .isFirst').size() > 0;
	    if (hasNodesNotExpand == true) {
	        model_global_global.showNotice(companyTreeLang.COMPANY_TREE_LABEL_HAS_NODES_NOT_EXPAND);
	    }
	},
    //view上需加入語系內容: companyTreeLang
    renderCompanysTreeMemuHtml: function (companyIdCurrentUser, companysData, treeMenuContainerID, companyTreeLang, postUrl, radio) {

        var optionType = (radio == true) ? 'radio' : 'checkbox';
        var crrtCompanyId = companyIdCurrentUser;

        var getNodesHtml = module_companyTree.renderTreeNodeHtml(companysData, radio);

        //複選
        if (radio == undefined || radio == false) {

            var treeMenuHtml =
                '<div class="fillForm">' +
                    '<input type="radio" name="openTree" value="0" id="openTree_0" value="0" checked>' +
                    '<label for="openTree_0">' + companyTreeLang.COMPANY_TREE_OPTION_COMPANY_ALL + '</label>' +
                    '<input type="radio" name="openTree" id="openTree_1" value="1">' +
                    '<label for="openTree_1">' + companyTreeLang.COMPANY_TREE_OPTION_COMPANY_SPECIFIED + '</label>' +
                    '<span class="treeTip hidden">' +
                        '<span class="hightlight">' + companyTreeLang.COMPANY_TREE_TIP_SELECTED_COUNT + ':&nbsp;&nbsp;<strong class="selectCount hightlight">0</strong></span>' +
                    '</span>' +
                    
                '</div>' +
                '</div>' +
                '<div class="treeWrap hidden">' +
                    '<div class="treeFunc">' +
                        '<span class="openNextAllToggle openNextAllToggle-js">' +
                            companyTreeLang.COMPANY_TREE_BTN_TOGGLE_NEXT_LEVEL +
                        '</span>' +
                        '<span class="openNextAllToggle selectAll-js">' +
                            companyTreeLang.COMPANY_TREE_BTN_ALL +
                        '</span>' +
                    '</div>' +
                    '<div class="treeNode hasNext inline">' +
                        '<div class="treeItem">' +
                            '<div class="inline itemCheck">' +
                                '<input type="' + optionType + '"  name="company" id="chkCom_' + crrtCompanyId + '" class="form selectCompany" data-companyId="' + crrtCompanyId + '" />' +
                                '<label for="chkCom_' + crrtCompanyId + '">' +
                                    '<i class="icon-ok-squared ic icChecked"></i>' +
                                    '<i class="icon-check-empty ic icUnchecked"></i>' +
                                '</label>' +
                                '<label class="inline itemName" for="chkCom_' + crrtCompanyId + '"><strong>' + searchView.searchCompanyName(crrtCompanyId, companys) + '</strong></label>' +
                            '</div>' +
                        '</div><!--treeItem-->' +

                    '</div>' +

                    '<div class="treeRoot" data-postUrl="' + postUrl + '">' +
                        getNodesHtml +
                    '</div>' +
                '</div>';
        }
        //單選
        else {
            var treeMenuHtml =
                '<div class="treeWrap ">' +
                    '<div class="treeFunc">' +
                        '<span class="openNextAllToggle openNextAllToggle-js">' +
                            companyTreeLang.COMPANY_TREE_BTN_TOGGLE_NEXT_LEVEL +
                        '</span>' +
                    '</div>' +
                    '<div class="treeNode hasNext inline">' +
                        '<div class="treeItem">' +
                            '<div class="inline itemCheck">' +
                                '<input type="' + optionType + '"  name="company" id="chkCom_' + crrtCompanyId + '" class="form selectCompany" data-companyId="' + crrtCompanyId + '" />' +
                                '<label for="chkCom_' + crrtCompanyId + '">' +
                                    '<i class="icon-dot-circled ic icChecked"></i>' +
                                    '<i class="icon-circle-thin ic icUnchecked"></i>' +
                                '</label>' +
                                '<label class="inline itemName" for="chkCom_' + crrtCompanyId + '"><strong>' + searchView.searchCompanyName(crrtCompanyId, companys) + '</strong></label>' +
                            '</div>' +
                        '</div><!--treeItem-->' +

                    '</div>' +

                    '<div class="treeRoot" data-postUrl="' + postUrl + '">' +
                        getNodesHtml +
                    '</div>' +
                '</div>';
        }


        $(treeMenuContainerID).html(treeMenuHtml);
    },
    renderTreeNodeHtml: function (companysData, radio) {

        var optionType = (radio == true) ? 'radio' : 'checkbox';
        var optionIcon = (radio == true) ? '<i class="icon-dot-circled ic icChecked"></i><i class="icon-circle-thin ic icUnchecked"></i>' : '<i class="icon-ok-squared ic icChecked"></i><i class="icon-check-empty ic icUnchecked"></i>';

        var treeNodeHtml = '';

        //無資料
        if (companysData.length == 0) {
            treeNodeHtml =
            '<div class="treeNode noNext">' +
                '<div class="treeItem">' +
                    '<div class="inline itemToggle">' +
                    '</div>' +
                    '<div class="inline itemCheck">' +
                        '<label class="inline itemName itemEmpty" ><strong>' + companyTreeLang.COMPANY_TREE_EMPTY_DATA + '</strong></label>' +
                    '</div>' +
                '</div><!--treeItem-->' +
            '</div>';
        }

        //有資料
        for (var i = 0; i < companysData.length; i++) {
            var d = companysData[i],
                vf = module_companyTree.field;
            treeNodeHtml +=
            '<div class="treeNode' +
            (
                d[vf.hasNext] == true
                ?
                ' hasNext'
                :
                ' noNext'
            ) +
            (
                d[vf.downCount] == 0
                ?
                ' isOpen'
                :
                ''
            ) +
            '">' +
                '<div class="treeItem">' +
                    '<div class="inline itemToggle' +
                    (
                        d[vf.hasNext] == true
                        ?
                        ' itemToggle-js'
                        :
                        ''
                    ) +                    
                    '" data-had-opened="false" data-levelId="' + d[vf.principalLevelId] + '" data-memberId="' + d[vf.principalId] + '" data-nextTargetId="' + d[vf.companyId] + '">' +
                        '<i class="icon-plus-squared ic icClose"></i>' +
                        (d[vf.downCount] > 0 ? '<i class="icon-minus-squared ic icOpen"></i>' : '' ) +
                    '</div>' +
                    '<div class="inline itemCheck">' +
                        '<input type="' + optionType + '" name="company" id="chkCom_' + d[vf.companyId] + '" class="form selectCompany" data-companyId="' + d[vf.companyId] + '" />' +
                        '<label for="chkCom_' + d[vf.companyId] + '">' +
                            optionIcon + 
                        '</label>' +
                        '<label class="inline itemName" for="chkCom_' + d[vf.companyId] + '">' +
                            '<strong>' + d[vf.name] + ' - ' + d[vf.title] + '</strong> ' +
                            '<span>( ' +
                                '<span title="' + companyTreeLang.COMPANY_TREE_TITLE_TOTAL_NEXT_LEVEL + '"><i class="icon-sitemap lightGray"></i>' + d[vf.downCount] + '<span> / ' +
                                '<span title="' + companyTreeLang.COMPANY_TREE_TITLE_TOTAL_MEMBERS + '"><i class="icon-users lightGray"></i>' + d[vf.memberCount] + ' </span>' +
                            ')</span>' +
                        '</label>' +
                    '</div>' +
                '</div><!--treeItem-->' +
                //next node loading tip
                (
                    d[vf.hasNext] == true && d[vf.downCount] > 0
                    ?
                    '<div class="nextNode hidden" data-nextNodeId="' + d[vf.companyId] + '">' +
                        '<div class="treeNode isFirst noNext">' +
                            '<div class="treeItem">' +
                                '<div class="inline itemToggle">' +
                                '</div>' +
                                '<div class="inline itemCheck">' +
                                    '<label class="inline itemName" >Loading</label>' +
                                '</div>' +
                            '</div><!--treeItem-->' +
                        '</div>' +
                    '</div>'
                    :
                    ''
                ) +
            '</div>';
        }

        return treeNodeHtml;
    },
    getCompanysInitData: function (postUrl, treeMenuContainerID, radio, callback) {
        var form = {
            'action': 'company'
        }
        model_global_global.ajaxLoading(true);

        return $.post(
            postUrl,
            JSON.stringify(form),
            function (res) {

                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(res);
                if (lang['key'] !== undefined) {

                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                res = JSON.parse(res);

                if (res.length > 0) {
                	module_companyTree.state = true;
                }

                module_companyTree.renderCompanysTreeMemuHtml(companyIdCurrentUser, res, treeMenuContainerID, companyTreeLang, postUrl, radio);

                if (callback !== undefined && typeof callback == 'function') {
                	callback();
                }
            }
        )
    },
    getCompanysLevelData: function (postUrl, levelId, memberId, nextTargetId, radio) {
        var form = {
            'action': 'company',
            'levelId': levelId,
            'memberId': memberId
        }
        model_global_global.ajaxLoading(true);

        return $.post(
            postUrl,
            JSON.stringify(form),
            function (res) {

                model_global_global.ajaxLoading(false);

                var lang = model_global_global.getLangText(res);
                if (lang['key'] !== undefined) {

                    model_global_global.showNotice(lang['value']);

                    if (model_global_global.formFieldError(lang['key'], lang['value'])) {
                        // 前往Y軸
                        model_global_global.goToScrollPosY('#content', $('[name=' + lang['key'] + ']'));
                    }
                }

                res = JSON.parse(res);
                var nextNodeTreeHtml = module_companyTree.renderTreeNodeHtml(res, radio);
                $('[data-nextNodeId="' + nextTargetId + '"]').html(nextNodeTreeHtml);

            }
        )
    },
    searchCompanysId: function (treeMenuContainerID) {

        var ids = [];

        $(treeMenuContainerID + ' .selectCompany:checked').each(function () {
            var thisID = $(this).attr('data-companyid');
            ids.push(thisID);
        });

        return ids.toString();
    }
}