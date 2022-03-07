requirejs([
    'echart-plan-kind-count',
    'echart-plan-kind-funds',
    'echart-plan-eng-count',
    'echart-plan-eng-funds',
    'echart-stage',
]);

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

setTableColumnToggle('#chkMore');
setTableColumnToggle('#chkLate');
setLargeTableView('#chkFullTable');

//set full table
// document.getElementById('chkFullTable').click();