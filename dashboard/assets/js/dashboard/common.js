//for demo ( fake menu toggle )

// function toggleMenu() {
//     var dom = document.getElementsByClassName('page');
//     var isOpen = dom[0].dataset.menu == "open";
//     if (isOpen) {
//         dom[0].dataset.menu = 'close';
//     } else {
//         dom[0].dataset.menu = 'open';
//     }
// }

// function toggleDOM(domId1, domId2) {
//     var dom1 = document.getElementById(domId1);
//     var dom2 = document.getElementById(domId2);
//     dom1.classList.toggle('demo-show');
//     dom1.classList.toggle('demo-hide');
//     dom2.classList.toggle('demo-show');
//     dom2.classList.toggle('demo-hide');
// }

//-------------- Common Function -------------------

// function changeUnit() {
//     var sel = document.getElementById('unitType');
//     if (sel.value == 1) {
//         // renderChartFunds21();
//         renderChartFunds31();
//         setUnitName('本署');
//     }
//     if (sel.value == 2) {
//         // renderChartFunds22();
//         renderChartFunds32();
//         setUnitName('所屬機關');
//     }
// }

// function setUnitName(name) {
//     var n = document.getElementById('unitName');
//     n.innerText = name;
// }

//---啟用 Bootstrap5 的 Tooltip ------------- 
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

//---陣列中最長字串--- for 橫向長條圖取得Label名稱字串長（以便設定圖表Left距離）
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

// function setTableColumnToggle(dom) {
//     var element = document.querySelector(dom);
//     if (element) {
//         function checkChk(element) {
//             var className = element.getAttribute("data-toggleClass");
//             var arr = document.querySelectorAll('.' + className);
//             if (element.checked == true) {
//                 //有選取
//                 arr.forEach(function(item, i) {
//                     item.style.display = "table-cell";
//                 });
//             } else {
//                 //未選取
//                 arr.forEach(function(item, i) {
//                     item.style.display = "none";
//                 });
//             }
//         }
//         element.addEventListener('change', function() {
//             checkChk(this);
//         });
//         checkChk(element);
//     }

// }

// function setLargeTableView(dom) {
//     var element = document.querySelector(dom);
//     if (element) {
//         function checkChk(element) {
//             var grid = document.querySelector('.grid');
//             if (element.checked == true) {
//                 //有選取
//                 grid.classList.add('no-grid');
//             } else {
//                 //未選取
//                 grid.classList.remove('no-grid');
//             }
//         }
//         element.addEventListener('change', function() {
//             checkChk(this);
//         });
//         checkChk(element);
//     }
// }

// setTableColumnToggle('#chkMore');
// setTableColumnToggle('#chkLate');
// setLargeTableView('#chkFullTable');