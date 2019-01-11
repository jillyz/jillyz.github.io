//----------------------------------------
// Async Drift Code
//----------------------------------------
/*
function drift_init(){
  !function() {
    var t;
    if (t = window.drift_initt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0, 
    t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
    t.factory = function(e) {
      return function() {
        var n;
        return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
      };
    }, t.methods.forEach(function(e) {
      t[e] = t.factory(e);
    }), t.load = function(t) {
      var e, n, o, i;
      e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"), 
      o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js", 
      n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
    });
  }();
  drift.SNIPPET_VERSION = '0.3.1';
  drift.load('mff3tw3kwyr6');
}
*/


function setScrollIntoView (){
    var element = document.getElementById('top');
    element.scrollIntoView();
}

//----------------------------------------
// URL PARAMETER
//----------------------------------------

function getUrlParameter(url, parameter) {
    parameter = parameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?|&]' + parameter.toLowerCase() + '=([^&#]*)');
    var results = regex.exec('?' + url.toLowerCase().split('?')[1]);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function setUrlParameter(url, key, value) {

    var baseUrl = url.split('?')[0],
        urlQueryString = '?' + url.split('?')[1],
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if (typeof value === 'undefined' || value === null || value === '') { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace(/[&;]$/, "");

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);

        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params === '?' ? '' : params;

    location.href = baseUrl + params;

    // return baseUrl + params;
}

//----------------------------------------
// GET RENT DATA
//----------------------------------------

  var getRentData = [];
  var rentData = [];
  var rentBookTimeRagne = [];

$(function() {

    $.ajax({
      type: 'GET',
      url: 'https://spreadsheets.google.com/feeds/cells/1Hmw4yxk5pVyR7CA2XLsw93ozeFrrWVZB7cep_uyDEc4/1/public/values?alt=json',
      cache: false,
      dataType: 'json',
      success: function(res)
      {
        var cols = 8;
        var data = res.feed.entry;
        var arr = [];
        var size = data.length / cols;

        for (var i = 0; i < size; i++) {
            var obj = {}
            for (var item in data) {
                var index = parseInt(item / cols);
                if (item % cols == 0 && index == i) obj['time'] = data[item].content.$t;
                if (item % cols == 1 && index == i) obj['gmail'] = data[item].content.$t;
                if (item % cols == 2 && index == i) obj['user'] = data[item].content.$t;
                if (item % cols == 3 && index == i) obj['fromTime'] = data[item].content.$t;
                if (item % cols == 4 && index == i) obj['days'] = data[item].content.$t;
                if (item % cols == 5 && index == i) obj['toTime'] = data[item].content.$t;
                if (item % cols == 6 && index == i) obj['bookTotal'] = data[item].content.$t;
                if (item % cols == 7 && index == i) {
                    var arrIds = []
                    var str = data[item].content.$t;
                    arrIds = str.split(', ');
                    obj['bookIds'] = arrIds;
                }
                // if (item % cols == 8 && index == i) obj['location'] = data[item].content.$t;
            }
            arr[i - 1] = obj;
        }
        delete arr[-1];
        getRentData = arr;

        // var rentBooksBackTime = get_rentBooksBackTime(getRentData);
        rentBookTimeRagne = get_rentBooksTimeRange(getRentData);
        var tempBooksRent = get_tempBooksRent(getRentData);
        rentData = uniqueArray(tempBooksRent);
      },
    });

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
Math.easeInOutQuad = function(t, b, c, d) {
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