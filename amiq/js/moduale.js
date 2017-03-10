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