// Youtube Video --------------------------------------------------------------------

// 2. This code loads the IFrame Player API code asynchronously.    

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//MyScript for video size


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 0,
        width: 0,
        videoId: '_62DNuOQIu8',
        //videoId: 'RguEm8j-UZ0',
        playerVars: {
            rel: 0,
            showinfo: 0,
            controls: 0,
            start: 349,
            //start: 408, // for test
            end: 412
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onFinish': onPlayerStateChange[0]
        }
    });
}

// 4. The API will call this function when the video player is ready.

function onPlayerReady(event) {
    $(".spinner").fadeOut(500);
    //$("#cover").delay(1500).fadeOut(3000);
    event.target.playVideo();
    player.unMute();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

var done = false;
function onPlayerStateChange(event) {
    // When Video Start
    if (event.data == YT.PlayerState.PLAYING && !done) {
        $(".spinner").fadeOut(500);
        $("#simple_control").show();
        $("#cover").css({ 'background-color': 'rgba(105,153,102, .2)' });
        done = true;
    }
    // When Video End
    if (event.data == 0) {
        //event.target.playVideo();
        event.target.playVideo();
    }
}
function stopVideo() {
    player.stopVideo();
}

/* 影片控制: 暫停 or 播放 */
$("#pause").click(function () {
    var pause = $(this).attr('pause');
    pause *= -1;
    $(this).attr('pause', pause);
    switch (pause) {
        case 1:
            player.pauseVideo();
            $(this).html("<span class='glyphicon glyphicon-play' aria-hidden='true'></span>");
            break;
        case -1:
            player.playVideo();
            $(this).html("<span class='glyphicon glyphicon-pause' aria-hidden='true'></span>");
            break;
    }
});
/* 影片控制: 靜音 */
$("#mute").click(function () {
    var mute = $(this).attr('mute');
    mute *= -1;
    $(this).attr('mute', mute);
    switch (mute) {
        case 1:
            player.mute();
            $(this).html("<span class='glyphicon glyphicon-volume-off' aria-hidden='true'></span>");
            break;
        case -1:
            player.unMute();
            $(this).html("<span class='glyphicon glyphicon-volume-up' aria-hidden='true'></span>");
            break;
    }
});

