var cookieHandler = {
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setCookie: function (cname, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = cname + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }
}

var getUrl = {
    parseParamValue: function () {

        var qStr = model_global_global.getQueryString(location.href);
        var url = qStr.queryString;

        var theRequest = {};
        strs = url.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        return theRequest;
    },
}

var myModal = {
    showModal: function (dom) {
        $(dom).addClass('show');
        myModal.bindEvent();
    },
    bindEvent: function () {
        $('.myModal').on('click', '.modalClose-js', function () {
            myModal.hideModal();
        });
    },
    hideModal: function () {
        $('.myModal').removeClass('show');
    }
}

var thousandsView = {

    // 加上千分位
    formatNumber: function (n) {

        var nStr = n.toString();
        //if (nStr.includes(',')) {
        //    return n;
        //}
        if (dataHandler.includes(nStr, ',') == true) {
            return n;
        }

        n += "";
        var arr = n.split(".");
        var pattern = /(\d{1,3})(?=(\d{3})+$)/g;
        return arr[0].replace(pattern, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
    },
    // 移除千分位
    unformattedNumber: function (n) {
        var x = n.split(',');
        return parseFloat(x.join(""));
    }
}

// -------------------------------------------------------------
// 多個分頁
// -------------------------------------------------------------
/*var PageView = function (container) {
	this.container = container;

	this.init = function () {
		this.bindEvent();
	}

	this.renderPaginationHtml = function () {

	}

	this.bindEvent = function () {
		$(this.container).on();
	}

	this.init();
}

var pageView = new PageView('#group_' + orderId);
pageView.renderPaginationHtml();*/
var pagerView = {
    isNew: false,
    randomStr: null,
    callback: function () { },
    _orderId: null,
    renderPaginationHtml: function (orderId, pageTotal, dataLength, func) {

        var pageview = this;

        var html = '';
        var prevBtn = '';
        var nextBnt = '';

        if (this.randomStr == null) {
            this.randomStr = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        this.callback = func;
        this._orderId = orderId;

        if (dataLength > 0) {

            if (pageTotal > 1) {
                prevBtn =
                '<div id="pagePrev_' + this.randomStr + '" class="pagePrev mui-btn pagePrev-js">' +
                    '<i class="icon icon-angle-left"></i>' +
                '</div>';
                nextBnt =
                '<div id="pageNext_' + this.randomStr + '" class="pageNext mui-btn pageNext-js">' +
                    '<i class="icon icon-angle-right"></i>' +
                '</div>';
            }

            html +=
                '<div id="pageGroup_' + this.randomStr + '">' +
                //orderId + ' , ' + //test
                //this.randomStr + //test
                prevBtn + '&nbsp;&nbsp;' +
                '<div class="targetSelect">' +
                    '<select id="pageSelect_' + this.randomStr + '" class="pageSelect pageSelect-js">';

            for (var i = 0 ; i < pageTotal; i++) {
                html += '<option value="' + i + '">' + (i + 1) + '</option>'
            }

            html +=
                    '</select> ' +
                '</div>' +
                '<span>&nbsp;&nbsp; / </span>' +
                '<span id="pageGroup_total_' + this.randomStr + '" class="pageTotalNum">' + pageTotal + '</span>' +
                nextBnt +
                '</div>';
            //'<span class="totalPage">共' +
            //'<span>' + pageTotal + '</span> 頁' +
            //'</span>';
        }

        return html;
    },
    //在產完view後做事件綁定
    bindEvent: function () {
        var pageview = this;

        if (this.isNew == false) {

            this.isNew = true;

            if (document.getElementById('pageNext_' + this.randomStr) !== null) {
                document.getElementById('pageNext_' + this.randomStr).onclick = function () {
                    pageview.pageJump(1);
                }

                document.getElementById('pagePrev_' + this.randomStr).onclick = function () {
                    pageview.pageJump(-1);
                }

                document.getElementById('pageSelect_' + this.randomStr).onchange = function () {
                    pageview.callback(pageview._orderId);
                }
            }
        }
    },
    pageJump: function (goto) {

        var targetIndex = this.getCurrentPage(),
            pageTotalNum = parseInt($('#pageGroup_total_' + this.randomStr).text());
        
        switch (goto) {

            case 1:
                var targetPage = targetIndex + 1;
                if (targetPage < pageTotalNum) {
                    $('#pageSelect_' + this.randomStr).val(targetPage);
                    this.callback(this._orderId);
                }
                break;

            case -1:
                var targetPage = targetIndex - 1;
                if (targetIndex > 0) {
                    $('#pageSelect_' + this.randomStr).val(targetPage);
                    this.callback(this._orderId);
                }
                break;
        }
    },

    getCurrentPage: function () {
        return parseInt($('#pageSelect_' + this.randomStr).val());
    },
}
// -------------------------------------------------------------
// 簡易版分頁，跳頁時呼叫的 function:  view.getQueryResult(currentPage);
// -------------------------------------------------------------
var pagerViewOne = {
    renderPaginationHtml: function (pageTotal, dataLength) {

        var html = '';
        var prevBtn = '';
        var nextBnt = '';

        if (dataLength > 0) {

            if (pageTotal > 1) {
                prevBtn =
                '<div class="pagePrev mui-btn pagePrev-js">' +
                    '<i class="icon icon-angle-left"></i>' +
                '</div>';
                nextBnt =
                '<div class="pageNext mui-btn pageNext-js">' +
                    '<i class="icon icon-angle-right"></i>' +
                '</div>';
            }

            html +=
                prevBtn +
                '<div class="targetSelect">' +
                    '<select class="pageSelect">';

            for (var i = 0 ; i < pageTotal; i++) {
                html += '<option value="' + i + '">' + (i + 1) + '</option>'
            }

            html +=
                    '</select>' +
                '</div>' +
                '<span>/</span>' +
                '<span class="pageTotalNum">' + pageTotal + '</span>' +
                nextBnt;
            //'<span class="totalPage">共' +
            //'<span>' + pageTotal + '</span> 頁' +
            //'</span>';
        }

        return html;

    },
    // 在查詢結果的 init 作綁定: pagerView.bindEvent();
    bindEvent: function (funcName, wrapDom) {
        $('.pageGroup').on('click', '.pageNext-js', function () {
            pagerViewOne.pageJump(1, funcName);
        });
        $('.pageGroup').on('click', '.pagePrev-js', function () {
            pagerViewOne.pageJump(-1, funcName);
        });
        $('.pageGroup').on('change', '.pageSelect', function () {
            var currentPage = $(this).val();
            funcName(currentPage);
        });
    },
    pageJump: function (goto, funcName) {

        var targetIndex = parseInt($('.pageSelect').val()),
            pageTotalNum = parseInt($('.pageTotalNum').text());
        console.log(targetIndex);
        switch (goto) {

            case 1:
                var targetPage = targetIndex + 1;
                if (targetPage < pageTotalNum) {
                    funcName(targetPage);
                    $('.pageSelect option')[targetPage].selected = true;
                }
                break;

            case -1:
                var targetPage = targetIndex - 1;
                if (targetIndex > 0) {
                    funcName(targetPage);
                    $('.pageSelect option')[targetPage].selected = true;
                }
                break;
        }
    },
}

var searchView = {
    searchText: function (id, data) {
        for (var i1 = 0; i1 < data.length; i1++) {
            if (data[i1].id == id) {
                return data[i1].name;
            }
        }
    },
    searchTextInDepth: function (id, data, searchDepth) {
        for (var i1 = 0; i1 < data.length; i1++) {
            if (data[i1].id == id) {
                return data[i1].name;
            }
            switch (searchDepth) {
                case 2:
                    if (data[i1].d !== undefined && data[i1].d.length > 0) {
                        for (var i2 = 0; i2 < data[i1].d.length; i2++) {
                            if (data[i1].d[i2].id == id) {
                                return data[i1].d[i2].name;
                            }
                        }
                    }
                    break;
            }
        }
    },
    searchCompanyName: function (id, data) {

        var _name = '';
        var _title = '';

        for (var i1 = 0; i1 < data.length; i1++) {
            if (data[i1].id == id) {
                _name = data[i1].name;
                _title = data[i1].title;
                return _name + ' - ' + _title;
            }
            if (data[i1].d !== undefined && data[i1].d.length > 0) {
                for (var i2 = 0; i2 < data[i1].d.length; i2++) {
                    if (data[i1].d[i2].id == id) {

                        _name = data[i1].d[i2].name;
                        _title = data[i1].d[i2].title;
                        return _name + ' - ' + _title;
                    }
                }
            }

        }
    },
}

var companysView = {

    //---------------------------
    // 分站選單(一對多)
    // 選主分站*1 => 選子分站*n 
    // 主分站全部 => 送出時帶全部子分站id
    // 若只有一個主分站，則不顯示主站選項，僅顯示子分站選項
    oneMainSite_multipleSubSite: function (dom, data) {
        var html = '';
        html += '<select id="mainSite" class="select">';
        html += '<option value="all">全部</option>';
        for (var i = 0; i < data.length; i++) {
            html += '<option value="' + data[i].id + '">' + data[i].name + ' - ' + data[i].title + ' (' + data[i].num + ') </option>';
        }
        html += '</select>';
        html += '<div id="subSite"></div>';
        $(dom).html(html);

        // 若只有一個主分站
        if (data.length == 1) {
            $('#mainSite')[0][1].selected = true;
            $('#mainSite').hide();
            companysView.renderSubSiteHtml(data);
        }

        companysView.bindEvent();
    },
    bindEvent: function () {
        $('.fillForm').on('change', '#mainSite', function () {
            companysView.renderSubSiteHtml(companys);
        });
        $('#subSite').on('change', '#chk_all', function () {
            var chked = $(this).prop('checked');
            if (chked == true) {
                $('#subSite :checkbox').prop('checked', true);
            } else {
                $('#subSite :checkbox').prop('checked', false);
            }
        });
        $('#subSite').on('change', 'input:not(#chk_all)', function () {
            companysView.allCheck();
        });
    },
    renderSubSiteHtml: function (data) {
        var mainSiteId = $('#mainSite').val();

        if (mainSiteId == 'all') {
            companysView.resetAdvaceQuery();
        }

        var html = '';
        for (var i1 = 0; i1 < data.length; i1++) {

            if (data[i1].id == mainSiteId) {

                html += '<input type="checkbox" value="" id="chk_all" checked>';
                html += '<label for="chk_all" class="noSelect">' + lang.ALL + '</label>';

                if (data[i1].d.length > 0) {
                    for (var i2 = 0; i2 < data[i1].d.length; i2++) {
                        //console.log(data[i1].d[i2]);
                        html += '<input type="checkbox" name="companyIds" value="' + data[i1].d[i2].id + '" id="chk_' + data[i1].d[i2].id + '" checked>';
                        html += '<label for="chk_' + data[i1].d[i2].id + '" class="noSelect">' + data[i1].d[i2].name + '-' + data[i1].d[i2].title + '</label>';
                    }
                    html += '<div name="companyIds"></div>';
                    companysView.resetAdvaceQuery();
                } else {
                    html = '<div class="red" name="companyIds"><span class="input error"><i class="icon icon-attention"></i> ' + lang.NO_SUB_COMPANY_DATA + '</span></div>';
                    companysView.hideAdvaceQuery();
                }
            }
        }

        $('#subSite').html(html);
    },
    resetAdvaceQuery: function () {
        $('#submit, #toggle-advance, .defaultQuery').removeClass('hidden');
        $('#toggle-advance .icon-up-open').hide();
        $('#toggle-advance .icon-down-open').show();
        $('.advanceQuery').hide();
    },
    hideAdvaceQuery: function () {
        $('#submit, #toggle-advance, .defaultQuery').addClass('hidden');
        $('.advanceQuery').hide();
    },
    allCheck: function () {
        var num_all = $('#subSite :checkbox:not(#chk_all)').size(); //選項總個數
        var num_checked = $('#subSite :checkbox:checked:not(#chk_all)').size(); //選中個數

        if (num_all == num_checked) { //若選項總個數等於選中個數
            $('#chk_all').prop('checked', true); //全選選中
        } else {
            $('#chk_all').prop('checked', false);
        }


        console.log(num_all, num_checked)
    },

    //---------------------------
    // 分站選單(一對一)
    // 選主分站*1 => 選子分站*1 
    renderCompanysMainListHtml: function (companys) {

        var mainListHtml = '';
        for (i1 = 0; i1 < companys.length; i1++) {
            mainListHtml += '<option value="' + companys[i1].id + '">' + companys[i1].name + '-' + companys[i1].title + ' (' + companys[i1].num + ')</option>'
        }
        $('#companyMain').html(mainListHtml);

    },
    renderCompanysSubListHtml: function (companys) {

        var subListHtml = '',
            mainId = $('#companyMain').val();

        //var _subCompanyNum = 0;

        for (var i1 = 0; i1 < companys.length; i1++) {
            if (companys[i1].id == mainId) {

                _subCompanyNum = companys[i1].d.length;

                if (companys[i1].d.length == 0) {
                    subListHtml += '<option value=""></option>';
                } else {
                    for (var i2 = 0; i2 < companys[i1].d.length; i2++) {
                        subListHtml += '<option value="' + companys[i1].d[i2].id + '">' + companys[i1].d[i2].name + '-' + companys[i1].d[i2].title + '</option>';
                    }
                }
            }
        }
        $('#companySub').html(subListHtml);

        //return _subCompanyNum;

    },

    //---------------------------
    // 取得 companyIds
    getCompanyIds: function (data) {
        var mainSiteId = $('#mainSite').val();
        var value = '';
        if (mainSiteId == 'all') {
            for (var i1 = 0; i1 < data.length; i1++) {

                for (var i2 = 0; i2 < data[i1].d.length; i2++) {
                    value = value + data[i1].d[i2].id + ',';
                }
            }
            value = value.slice(0, -1);
        } else {
            $('[type="checkbox"][name="companyIds"]:checked').each(function () {
                value = value + this.value + ',';
            });
            value = value.slice(0, -1);
        }
        return value;
    },
}

var dropDownListView = {
    // ----------------------------------------
    // * fieldName 下拉選單欄位 name="" , 必須
    // * data 陣列 , 必須
    //    var sort = [
    //        { "id": "1", "name": "XXX" },
    //        { "id": "2", "name": "OOO" }
    //    ]
    //   defaultVal    預設選取值 , 可不設
    //   hasAll        true/false
    //   hasSelectTip  true/false
    //   viewLang      若 hasAll 或 hasSelectTip => 必須傳語系進來
    // -----------------------------------------------------------
    renderHtml: function (fieldName, data, defaultVal, hasAll, hasSelectTip, viewLang) {
        var html = '';
        html +=
            '<select class="filterForm form select" name="' + fieldName + '">';

        if (hasAll && hasAll == true) {
            html += '<option value="">' + viewLang.ALL + '</option>';
        }
        if (hasSelectTip && hasSelectTip == true) {
            html += '<option value="" selected disabled>' + viewLang.SELECT_TIP + '</option>';
        }

        for (var i = 0; i < data.length; i++) {
            html +=
                    '<option value="' + data[i].id + '"' + ((defaultVal !== undefined && data[i].id == defaultVal) ? ' selected' : '') + '>' +
                        data[i].name +
                    '</option>';
        }
        html +=
            '</select>';

        return html;

    },
    setSelectedItem: function (fieldName, value) {
        $('select[name="' + fieldName + '"] option').each(function () {
            if ($(this).val() == value) {
                $(this).prop('selected', true);
            }
        });
    },
    renderBankListHtml: function (dataBanks) {
        var html = '';
        html += '<option value="" selected="" disabled="">' + lang.SELECT_TIP + '</option>';
        for (var i = 0; i < dataBanks.length; i++) {
            html += '<option value="' + dataBanks[i].id + '">' + dataBanks[i].id + ' - ' + dataBanks[i].name + '</option>';
        }
        return html;
    },
    renderBankListWithoutIdHtml: function (dataBanks) {
        var html = '';
        html += '<option value="" selected="" disabled="">' + lang.SELECT_TIP + '</option>';
        for (var i = 0; i < dataBanks.length; i++) {
            html += '<option value="' + dataBanks[i].id + '">' + dataBanks[i].name + '</option>';
        }
        return html;
    },
    renderNationNumberListHtml: function (nationNumber, hasTip, viewLang) {
        var html = '';
        if (hasTip == true) {
            html += '<option value="" disabled>' + viewLang.SELECT_TIP + '</option>';
        }
        for (var i = 0; i < nationNumber.length; i++) {
            html += '<option value="' + nationNumber[i].id + '">' + nationNumber[i].name + ' (' + nationNumber[i].id + ')</option>';
        }
        return html;
    },
    renderGroupListHtml: function (companyAccountGroup) {
        var html = '';
        html += '<option value="" selected disabled >' + lang.SELECT_TIP + '</option>';
        for (i = 0; i < companyAccountGroup.length; i++) {
            var d = companyAccountGroup[i];
            html += '<option value="' + d.id + '">' + d.name + '</option>';
        }
        return html;
    },
}

var radioBtnListView = {
    //若 hasAll 為 true, 要多傳語系 viewLang
    renderHtml: function (fieldName, data, defaultVal, hasAll, viewLang) {

        var html = '';
        html += '<div>';
        if (hasAll == true) {
            html += '<input type="radio" name="' + fieldName + '" id="' + fieldName + '_all' + '" value="" checked /><label for="' + fieldName + '_all' + '">' + viewLang.ALL + '</label>';
        }
        for (var i = 0; i < data.length; i++) {
            html +=
            '<input type="radio" name="' + fieldName + '" id="' + fieldName + '_' + i + '" value="' + data[i].id + '" class="filterForm" ' +
                ((hasAll == false && data[i].id == defaultVal) ? 'checked' : '') + ' />' +
            '<label for="' + fieldName + '_' + i + '">' + data[i].name + '</label>';
        }
        html += '</div>';

        return html;

    },
    setSelectedItem: function (fieldName, value) {
    },
}

var checkboxListView = {
    renderHtml: function (fieldName, data, defaultData) {
        var html = '';
        html += '<div>';
        for (var i = 0; i < data.length; i++) {
            html +=
            '<input type="checkbox" name="' + fieldName + '" id="' + fieldName + '_' + i + '" value="' + data[i].id + '" class="filterForm" ' +
                 ' />' +
            '<label for="' + fieldName + '_' + i + '">' + data[i].name + '</label>';
        }
        html += '</div>';

        return html;
    },
    setSelectedItem: function (fieldName, arr) {
    },
}

// 資料處理
var dataHandler = {
    // 將原資料 originalData 排除掉某些資料 excludeData ，以產生新的資料 newData
    excludeData_newData: function (originalData, excludeData) {
        var excludeList = Object.keys(excludeData).map(function (num) {
            return String(num);
        });
        return originalData.filter(function (item) {
            return excludeList.indexOf(item.id) === -1;
        });
    },
    // 依據指定key(groupingByKey)來重新群組資料(data) => 產生新資料物件 { 'groupingByKey': 'data' }
    groupingJSONData: function (data, groupingByKey) {

        var groups = {};

        $.each(data, function (i, item) {
            var groupKey = item[groupingByKey];

            if (groups[groupKey]) {
                groups[groupKey].push(item);
            } else {
                groups[groupKey] = [item];
            }
        });

        var newData = $.map(groups, function (group, key) {
            var obj = {};
            obj[key] = group;
            return obj;
        });

        return newData;
    },
    groupingJSONDataToObj: function (data, groupingByKey) {

        var groups = {};

        $.each(data, function (i, item) {
            var groupKey = item[groupingByKey];

            if (groups[groupKey]) {
                groups[groupKey].push(item);
            } else {
                groups[groupKey] = [item];
            }
        });

        return groups;
    },
    amountPosNeg: function (_amount) {
        _amount = _amount.toString();

        if (_amount.includes("-") == true) {
            return '<span class="red bold">' + thousandsView.formatNumber(_amount) + '</span>';
        }
        else {
            return '<span class="green bold"> + ' + thousandsView.formatNumber(_amount) + '</span>';
        }
    },
    includes: function (container, value) {
        var returnValue = false;
        var pos = container.indexOf(value);
        if (pos >= 0) {
            returnValue = true;
        }
        return returnValue;
    },
    doesNotInclude: function (container, value) {
        var returnValue = false;
        var pos = container.indexOf(value);
        if (pos < 0) {
            returnValue = true;
        }
        return returnValue;
    },
}

var sortView = {
    // ----------------------------------------
    // * fieldName1 , 下拉選單欄位 name="" , 必須
    //
    // * fieldName2 , 升降冪 name="" , 必須
    //
    // * dom
    //
    // * data 陣列 , 必須
    //      var sort = [
    //          { "id": "1", "name": "XXX" },
    //          { "id": "2", "name": "OOO" }
    //      ]
    //
    // * sortLang , 語系, 資料寫在view
    //
    //   defaultVal 預設選取值 , 可不設
    //
    //   descAsc    升降冪 , 可不設 , 預設 -1 降冪
    //     1 升冪
    //    -1 降冪
    // ----------------------------------------
    renderSortByListHtml: function (fieldName1, fieldName2, data, sortLang, defaultVal, descAsc) {
        var html = '';
        html +=
            '<div class="mui-textfield">' +
                '<select class="select order filterForm" name="' + fieldName1 + '">';

        for (var i = 0; i < data.length; i++) {
            html +=
                        '<option value="' + data[i].id + '"' + ((defaultVal !== undefined && data[i].id == defaultVal) ? ' selected' : '') + '>' +
                            sortLang[data[i].langKey] +
                        '</option>';
        }
        html +=
                '</select>' +
                '&nbsp;&nbsp;&nbsp;' +
                '<div id="desc_asc" class="inline noSelect">' +
                    '<input type="radio" name="' + fieldName2 + '" id="desc" value="desc" ' + ((descAsc == undefined || descAsc == -1) ? ' checked' : '') + ' class="filterForm"><label for="desc" class="quickDateItem"><i class="icon-sort-alt-down"></i> ' + sortLang.DESC + '</label>' +
                    '<input type="radio" name="' + fieldName2 + '" id="asc" value="asc" ' + ((descAsc !== undefined && descAsc == 1) ? ' checked' : '') + ' class="filterForm"><label for="asc" class="quickDateItem"><i class="icon-sort-alt-up"></i> ' + sortLang.ASC + '</label>' +
                '</div>' +
            '</div>';

        return html;
    }
}

var dateView = {
    time: {
        week: 0,
        h: 0,
        m: 0
    },
    // ----------------------------------------
    // * beginName, 起始日期時間欄位 name=""
    // * endName  , 結束日期時間欄位 name=""
    //
    // * dom      , 將產出的code => 指定置入於 View 的哪個 ID 內
    //            View 必須備妥 id="" 供置入
    //
    // * dateLang , 語系, 資料寫在view
    //
    // * hasTime 
    //      true  日期 + 時分秒
    //      false 僅日期
    //
    //   beginVal , 預設起始時間, 可不設
    //   endVal   , 預設結束時間, 可不設
    // ----------------------------------------
    renderDatePickerQuickSetHtml: function (beginName, endName, domId, dateLang, hasTime, beginVal, endVal) {
        var html = '';
        html =
        '<div class="' + ((hasTime == true) ? 'setDateTime' : 'setDate') + '">' +
            '<div class="mui-textfield">' +
                '<div class="inline input">' +
                    '<input id="' + beginName + '" type="text" name="' + beginName + '" placeholder="' + dateLang.FROM + '" class="filterForm ' + ((hasTime == true) ? 'dateTime' : 'date') + ' dateFrom" maxlength="10" data-dom="' + domId + '">' +
                    '<input id="' + endName + '" type="text" name="' + endName + '" placeholder="' + dateLang.TO + '" class="filterForm ' + ((hasTime == true) ? 'dateTime' : 'date') + ' dateTo" maxlength="10" data-dom="' + domId + '">' +
                '</div>' +
                '&nbsp;&nbsp;&nbsp;' +
                '<div id="quickOption" class="quickOption inline noSelect">' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo1"><label for="' + domId + '_rdo1" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickDayItem today" data-day="1">' + dateLang.TODAY + '</label>' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo2"><label for="' + domId + '_rdo2" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickDayItem" data-day="2">' + dateLang.YESTERDAY + '</label>' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo3"><label for="' + domId + '_rdo3" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickWeekItem" data-week="1">' + dateLang.THIS_WEEK + '</label>' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo4"><label for="' + domId + '_rdo4" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickWeekItem" data-week="2">' + dateLang.LAST_WEEK + '</label>' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo5"><label for="' + domId + '_rdo5" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickMonthItem" data-month="0">' + dateLang.THIS_MONTH + '</label>' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo6"><label for="' + domId + '_rdo6" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickMonthItem" data-month="1">' + dateLang.LAST_MONTH + '</label>' +
                    '<input type="radio" name="date' + domId + '" id="' + domId + '_rdo7"><label for="' + domId + '_rdo7" data-bName="' + beginName + '" data-eName="' + endName + '" class="quickDateItem quickOneMonthItem">' + dateLang.THIS_ONE_MONTH + '</label>' +
                    '<a href="#" class="clearDate clearDate-js" data-dom="' + domId + '"><i class="icon-cancel-circled"></i></a>' +
                '</div>' +
            '</div>' +
        '</div>';
        $('#' + domId).html(html);

        if (hasTime == true) {
            dateView.bindEvent_DateTime(beginName, endName);
        } else {
            dateView.bindEvent_Date(beginName, endName);
        }

    },
    bindEvent_Date: function (beginName, endName) {
        $('.date').datepicker({
            dateFormat: 'yy/mm/dd',
        });
        $('.setDate').on('click', '.quickDayItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                day = $(this).attr('data-day'),
                nowDate = model_global_global.getNowDate(),
                dayRange = model_global_global.getDayRange(day, nowDate, dateView.time.h, dateView.time.m);
            $('#' + beginName).val(dateView.displayDateCalc(dayRange['from'], 0));
            $('#' + endName).val(dateView.displayDateCalc(dayRange['to'], 0));
        });
        $('.setDate').on('click', '.quickWeekItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                week = $(this).attr('data-week'),
                nowDate = model_global_global.getNowDate(),
                weekRange = model_global_global.getWeekRange(week, nowDate, dateView.time.week, dateView.time.h, dateView.time.m);
            $('#' + beginName).val(dateView.displayDateCalc(weekRange['from'], 0));
            $('#' + endName).val(dateView.displayDate(weekRange['to']));
        });

        $('.setDate').on('click', '.quickMonthItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                month = $(this).attr('data-month'),
                nowDate = model_global_global.getNowDate(),
                weekRange = model_global_global.getMonthRange(month, nowDate, dateView.time.h, dateView.time.m);

            $('#' + beginName).val(dateView.displayDate(weekRange['from']));
            $('#' + endName).val(dateView.displayEndDate(weekRange['to']));
        });

        $('.setDate').on('click', '.quickOneMonthItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                weekRange = model_global_global.getOneMonthRang();

            $('#' + beginName).val(dateView.displayDate(weekRange['from']));
            $('#' + endName).val(dateView.displayEndDate(weekRange['to']));
        });

        // UX: 自訂日期時，快速選擇日期取消highlight
        $('.setDate').on('change', '.dateFrom, .dateTo', function () {
            var dom = $(this).attr('data-dom');
            $('[id^=' + dom + ']').prop("checked", false);
        });

        $('.setDate').on('click', '.clearDate-js', function () {
            var domId = $(this).attr('data-dom');
            dateView.clearDate(domId);
        });

    },
    bindEvent_DateTime: function (beginName, endName) {

        $('.dateTime').datetimepicker({
            dateFormat: 'yy/mm/dd',
            showSecond: true,
            timeFormat: 'HH:mm:ss'
        });

        $('.setDateTime').on('click', '.quickDayItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                day = $(this).attr('data-day'),
                nowDate = model_global_global.getNowDate(),
                dayRange = model_global_global.getDayRange(day, nowDate, dateView.time.h, dateView.time.m);
            $('#' + beginName).val(dayRange['from']);
            $('#' + endName).val(dayRange['to']);
        });
        $('.setDateTime').on('click', '.quickWeekItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                week = $(this).attr('data-week'),
                nowDate = model_global_global.getNowDate(),
                weekRange = model_global_global.getWeekRange(week, nowDate, dateView.time.week, dateView.time.h, dateView.time.m);
            $('#' + beginName).val(weekRange['from']);
            $('#' + endName).val(weekRange['to']);
        });

        $('.setDateTime').on('click', '.quickMonthItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                month = $(this).attr('data-month'),
                nowDate = model_global_global.getNowDate(),
                weekRange = model_global_global.getMonthRange(month, nowDate, dateView.time.h, dateView.time.m);
            $('#' + beginName).val(weekRange['from']);
            $('#' + endName).val(weekRange['to']);
        });

        $('.setDateTime').on('click', '.quickOneMonthItem', function () {
            var beginName = $(this).attr('data-bName'),
                endName = $(this).attr('data-eName'),
                weekRange = model_global_global.getOneMonthRang();
            $('#' + beginName).val(weekRange['from']);
            $('#' + endName).val(weekRange['to']);
        });


        // UX: 自訂日期時，快速選擇日期取消highlight
        $('.setDateTime').on('change', '.dateFrom, .dateTo', function () {
            var domId = $(this).attr('data-dom');
            $('[id^=' + domId + ']').prop("checked", false);
        });

        $('.setDateTime').on('click', '.clearDate-js', function () {
            var domId = $(this).attr('data-dom');
            dateView.clearDate(domId);
        });

    },
    clearDate: function (domId) {
        $('input[data-dom^=' + domId + ']').val('');
        $('[id^=' + domId + ']').prop("checked", false);
    },
    displayDateCalc: function (to, day) {
        to = model_global_global.getDatetimeByUnixTime(Date.parse(to) + (86400000 * day));
        return dateView.displayDate(to);
    },
    displayEndDate: function (to) {
        to = model_global_global.getDatetimeByUnixTime(Date.parse(to));
        return dateView.displayDate(to);
    },
    displayDate: function (dateTime) {
        return dateTime.split(' ')[0];
    },
    convStrToDate: function (dateStr) {
        var parseDateObj = dateView.parseDate(dateStr); //.replace(/-/g,"/");
        var convDate = new Date(Date.parse(parseDateObj));
        return convDate;
    },
    parseDate: function (dateStr) {
        var a = $.map(dateStr.split(/[^0-9]/), function (s) {
            return parseInt(s, 10)
        });
        return new Date(a[0], a[1] - 1 || 0, a[2] || 1, a[3] || 0, a[4] || 0, a[5] || 0, a[6] || 0);
    },

}
