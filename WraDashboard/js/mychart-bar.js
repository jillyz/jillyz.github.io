// define(function() {

// 只有一家廠商投標
setBarWidth('chartOneCompany');
// 有遴聘委員
setBarWidth('chartHasCommittee');

function setBarWidth(domId) {
    var chartDom = document.getElementById(domId);
    chartDom.width = (chartDom.getAttribute('data-value') / chartDom.getAttribute('data-total')) * 100;
    chartDom.style.width = chartDom.width + '%';

    function roundNumber(val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }
    chartDom.title = (roundNumber(chartDom.width, 2)) + '%';
}
// });