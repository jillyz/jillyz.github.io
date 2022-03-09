//-------------- Common Function -------------------

//---陣列中最長字串--- for 圖表廠商Top5的廠商名寬度
function long_string(arr) {
    let longest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length > longest.length) {
            longest = arr[i];
        }
    }
    return longest;
}

// ---------------------

function setTableColumnToggle(dom) {
    var element = document.querySelector(dom);

    function checkChk(element) {
        var className = element.getAttribute("data-toggleClass");
        var arr = document.querySelectorAll('.' + className);
        if (element.checked == true) {
            //有選取
            arr.forEach(function(item, i) {
                item.style.display = "table-cell";
            });
        } else {
            //未選取
            arr.forEach(function(item, i) {
                item.style.display = "none";
            });
        }
    }

    element.addEventListener('change', function() {
        checkChk(this);
    });
    checkChk(element);
}

function setLargeTableView(dom) {
    var element = document.querySelector(dom);

    function checkChk(element) {
        var grid = document.querySelector('.grid');
        if (element.checked == true) {
            //有選取
            grid.classList.add('no-grid');
        } else {
            //未選取
            grid.classList.remove('no-grid');
        }
    }

    element.addEventListener('change', function() {
        checkChk(this);
    });
    checkChk(element);
}