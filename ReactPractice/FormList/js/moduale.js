//----------------------------------------
// DATA
//----------------------------------------

function getData(dataName){
  return localStorage.getItem(dataName);
}

function setData(dataName, data){
  return localStorage.setItem(dataName, data);
}

//----------------------------------------
// DATE TIME
//----------------------------------------

function getDateTime(){
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds ();
  let date = year + '/' + this.formatDateTime(month) + '/' + this.formatDateTime(day);
  let time = this.formatDateTime(hh) + ':' + this.formatDateTime(mm) + ':' + this.formatDateTime(ss);
  return date + ' ' + time;
}

function formatDateTime(val) {
  const n = val.toString();
  return n.length == 2 ? n : '0' + n;
}

//----------------------------------------
// SCROLLTO
//----------------------------------------

function scrollToBottom(domId){
  var element = document.getElementById(domId);
  scrollTo(element, element.scrollHeight, 300);
}

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