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