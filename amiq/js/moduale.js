
//----------------------------------------
// GET RENT DATA
//----------------------------------------

  var getRentData = [];
  var rentData = [];
  var rentBookTimeRagne = [];

$(function() {


    $.get(
        'https://spreadsheets.google.com/feeds/cells/1Hmw4yxk5pVyR7CA2XLsw93ozeFrrWVZB7cep_uyDEc4/1/public/values?alt=json',
        function(res) {
            // console.log([1])
            var cols = 8;
            var data = res.feed.entry;
            var arr = [];
            var size = data.length / cols;

            for (var i = 0; i < size; i++) {
                var obj = {}
                for (var item in data) {
                    var index = parseInt(item / cols);
                    if (item % cols == 0 && index == i) obj['time'] = data[item].content.$t;
                    if (item % cols == 1 && index == i) obj['user'] = data[item].content.$t;
                    if (item % cols == 2 && index == i) obj['fromTime'] = data[item].content.$t;
                    if (item % cols == 3 && index == i) obj['toTime'] = data[item].content.$t;
                    if (item % cols == 4 && index == i) obj['days'] = data[item].content.$t;
                    if (item % cols == 5 && index == i) obj['notBack'] = data[item].content.$t;
                    if (item % cols == 6 && index == i) obj['bookTotal'] = data[item].content.$t;
                    if (item % cols == 7 && index == i) {
                        var arrIds = []
                        var str = data[item].content.$t;
                        arrIds = str.split(', ');
                        obj['bookIds'] = arrIds;
                    }
                }
                arr[i - 1] = obj;
            }
            delete arr[-1];
            getRentData = arr;

            var rentBooksBackTime = get_rentBooksBackTime(getRentData);
            rentBookTimeRagne = get_rentBooksTimeRange(getRentData);
            var tempBooksRent = get_tempBooksRent(getRentData);
            rentData = uniqueArray(tempBooksRent);

            // console.log('getRentData', getRentData)
            // console.log('rentBooksBackTime', rentBooksBackTime)
            // console.log('rentBookTimeRagne', rentBookTimeRagne)

        }
    )

    function get_rentBooksTimeRange(data) {
        var arr = [];
        var index = -1;
        for (var i = 0; i < data.length; i++) {
            var bookIds = data[i].bookIds;
            for (var j = 0; j < bookIds.length; j++) {
                // obj[bookIds][j] = data[i];
                index++;
                var obj = {};

                obj['bookId'] = bookIds[j];
                obj['fromTime'] = data[i].fromTime;
                obj['toTime'] = data[i].toTime;

                // console.log(index, bookIds[j], data[i].fromTime, data[i].toTime)
                arr[index] = obj;
            }
        }

        return arr;
    }

    function get_rentBooksBackTime(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            var bookIds = data[i].bookIds;
            for (var j = 0; j < bookIds.length; j++) {
                obj[bookIds] = data[i];

            }
            arr[i] = obj;
        }
        return arr;
    }

    function get_tempBooksRent(data) {
        var tempBooksRent = [];
        for (var i = 0; i < data.length; i++) {
            var bookIds = data[i].bookIds;
            for (var j = 0; j < bookIds.length; j++) {
                tempBooksRent.push(parseInt(bookIds[j]));
            }
        }
        return tempBooksRent;
    }

    function uniqueArray(array) {
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
            for (var j = i + 1; j < l; j++)
                if (array[i] === array[j]) j = ++i;
            r.push(array[i]);
        }
        return r;
    }


    // console.log(tempBooksRent);

});

//----------------------------------------
// ANIMATION
//----------------------------------------

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}

//----------------------------------------
// SWIPE
//----------------------------------------

function swipe(domId) {
  var touchstartX = 0;
  var touchstartY = 0;
  var touchendX = 0;
  var touchendY = 0;

  var gesuredZone = document.getElementById(domId);

  gesuredZone.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
  }, false);

  gesuredZone.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesure();
  }, false); 

function handleGesure() {
      var swiped = 'swiped: ';
      if (touchendX < touchstartX) {
          // alert(swiped + 'left!');
          return 1;
      }
      if (touchendX > touchstartX) {
          // alert(swiped + 'right!');
          return -1;
      }
      if (touchendY < touchstartY) {
          // alert(swiped + 'down!');
          return 1;
      }
      if (touchendY > touchstartY) {
          // alert(swiped + 'left!');
          return -1;
      }
      if (touchendY == touchstartY) {
          // alert('tap!');
      }
  }
}