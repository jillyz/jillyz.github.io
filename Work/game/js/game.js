$(function() {

    //----------------------------------------------------------------------------------------------------
    //
    //	Cover Effect					
    //
    //----------------------------------------------------------------------------------------------------


    // 載入完成後顯示遊戲封面 (Loading隱藏)
    window.onload = function() {
        setTimeout(function() {
            $("#loading").fadeOut(300);
        }, 500);
    };

    // PLAY (開始玩)
    $("#play").click(function() {
        //遊戲封面隱藏
        $(".screen,.how,.play").fadeOut(100).hide();
        //標題縮移到右上角
        $(".title").addClass("small");
        //人物左移							
        $(".boy").removeClass("bounce infinite").addClass("left");
        //遊戲主畫面出現
        $("#main").show();
        //卡片翻出								
        $("#card>li>a").addClass("animated flipInX");
        //msg說明規則
        setTimeout(sayRule, 500);
        return false;
    });

    // 再玩一次
    $("#playAgain").click(function() {
        //再玩一次按鈕樣藏
        $(this).fadeOut();
        //題目內容和msg訊息隱藏
        $("#boxWrapper, #msg").hide();
        //顯示題目卡
        $("#card").show();
        //連線隱藏,恢復未連狀態
        $("#line").hide().children("span").removeClass("show");
        //boy人物和msg訊息移除動畫
        $("#msg,.boy").removeClass("animeted").removeClass("bounce").removeClass("infinite").removeClass("bounceIn").removeClass("wobble");
        //題目卡恢復為未答題狀態, 移除動畫
        $("#card>li>a").attr("data-pass", "false").bind("click").removeClass("animated").removeClass("flipInX").addClass("animated flipInX");
        //msg說明規則顯示
        setTimeout(sayRule, 500);
        //開始遊戲啦
        startGame();
    });

    // msg 說明規則
    function sayRule() {
        var msgRule = "連成兩條線即闖關成功，開始吧";
        //人物動畫(跳動)
        $(".boy").addClass("animated bounce");
        //訊息動畫(延遲,淡出,彈出)
        $("#msg").delay(500).text(msgRule).fadeIn().removeClass().addClass("msg rule animated bounceIn");
    }


    //----------------------------------------------------------------------------------------------------
    //
    //	Game Data & Interaction							
    //
    //----------------------------------------------------------------------------------------------------



    // 隨機選題 ------------------------------------------------------------

    var questions = [];
    var questionCount = 9;

    function SetQuestions() {
        var result = [];
        $.getJSON("data.json", function(result) {
            var randomArray = getRandomArray(0, result.length - 1, questionCount);
            for (var j = 0; j < randomArray.length; j++) {
                questions.push(result[randomArray[j]]);
            }
            //console.log(questions);
        });
         questions = result ;
    }

    function getRandomArray(minNum, maxNum, n) { //隨機產生不重覆的n個數字
        var rdmArray = [n]; //儲存產生的陣列

        for (var i = 0; i < n; i++) {
            var rdm = 0; //暫存的亂數

            do {
                var exist = false; //此亂數是否已存在
                rdm = getRandom(minNum, maxNum); //取得亂數

                //檢查亂數是否存在於陣列中，若存在則繼續回圈
                if (rdmArray.indexOf(rdm) != -1) exist = true;

            } while (exist); //產生沒出現過的亂數時離開迴圈

            rdmArray[i] = rdm;
        }
        return rdmArray;
    }

    function getRandom(minNum, maxNum) { //取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }


    // 產生題目卡 -----------------------------------------------------------------

    function genCard() {
        var cardList = "";
        for (var i = 0; i < 9; i++) {
            var n = i + 1;
            cardList += "<li><a href=\"#\" title=\"第 " + n + " 題，挑戰！\" data-pass=\"false\">第" + n + "題，挑戰！</a></li>";
        }
        $("#card").html(cardList);
    }

    // 產生題目卡後，點擊卡片開啟題目內容 -------------------------------------------------

    function startGame() {

        // 產生題目卡 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        SetQuestions(); // 隨機選題
        genCard();  // 產生題目卡

        // 點擊卡片開啟題目內容 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        $("#card>li>a[data-pass=false]").click(function() {

            var cardOrder = $(this).parent("li").index(); // 取得卡片順序 => 對應到讀取的題目順序

            // 效果 -------------------------------------------------------

            $("#msg, #playAgain").hide(); //隱藏訊息和再玩一次按鈕
            $("#card, #line").fadeOut(); //隱藏卡片和連線
            $("#boxWrapper").fadeIn(); //顯示題目內容
            $(".boy").removeClass("animated").removeClass("bounce").removeClass("wobble"); //人物拿掉動畫	

            // 產生題目 ---------------------------------------------------

            function show(data) {
                var html = "";
                html += "<div class=\"question\">";
                html += "<h2 id=\"q\" class=\"q\">" + data[cardOrder].q + "</h2>";
                html += "<ol id=\"q_item\" class=\"q-item\"  data-answer=" + data[cardOrder].answer + ">";
                for (var i = 0; i < data[cardOrder].item.length; i++) {
                    html += "<li><a href=\"#\" class=\"item\" data-selected=\"false\" >" + data[cardOrder].item[i] + "</a></li>";
                }
                html += "<li><a href=\"#\" class=\"item exit\"> 離開本題</a></li>";
                html += "</ol>";
                $("#box").html(html);
            }
            show(questions);

            // User答題 ---------------------------------------------------

            // 1.離開本題不作答

            $(".exit").click(function() {
                $("#boxWrapper").fadeOut(); //隱藏題目
                $("#card , #line").show(); //顯示卡片和連線
                $("#msg").hide(); //隱藏訊息
            });

            // 2.作答後檢查結果

            $("#q_item li").on('click', '[data-selected=false]', function() {

                var nItem = $(this).parent("li").index() + 1,
                    ans = $("#q_item").attr("data-answer"),
                    pass = false,
                    msgPass = "答對了!",
                    msgWrong = "答錯了! 繼續加油~";

                // 效果
                $("#msg").hide();
                $(".boy").removeClass("animated").removeClass("wobble");

                // 檢查：答對 ------------------------------------
                if (nItem == ans) {
                    pass = true;
                    var passCurrentCard = cardOrder;
                    $("#boxWrapper").fadeOut();
                    $("#card , #line").show();
                    $("#card>li:eq(" + passCurrentCard + ")>a").attr("data-pass", "true").attr("title", "挑戰成功!").unbind("click");
                    $("#msg").fadeIn().text(msgPass).removeClass().addClass("msg pass animated bounceIn");
                    $(".boy").addClass("animated bounce");
                    if (pass == true) {
                        $("#card>li:not(:eq(" + passCurrentCard + "))>a").removeClass("animated flipInX");
                        $("#card>li:eq(" + passCurrentCard + ")>a").addClass("animated flipInX");
                    }
                    checkLine();
                }
                // 檢查：答錯 ------------------------------------
                else {
                    pass = false;
                    $(this).addClass("wrong").attr("data-selected", "true");
                    $("#msg").text(msgWrong).removeClass().addClass("msg wrong").fadeIn();
                    $(".boy").addClass("animated wobble");

                }
            });

        });
    }

    // 檢查是否連成兩條線 ? ----------------------------------------------

    function checkLine() {

        var line = 0,
            card0 = $("#card li:eq(0) a"),
            card1 = $("#card li:eq(1) a"),
            card2 = $("#card li:eq(2) a"),
            card3 = $("#card li:eq(3) a"),
            card4 = $("#card li:eq(4) a"),
            card5 = $("#card li:eq(5) a"),
            card6 = $("#card li:eq(6) a"),
            card7 = $("#card li:eq(7) a"),
            card8 = $("#card li:eq(8) a");

        if (card0.attr("data-pass") == "true" && card1.attr("data-pass") == "true" && card2.attr("data-pass") == "true") {
            $(".line-h-1").addClass("show");
            line++;
        }
        if (card3.attr("data-pass") == "true" && card4.attr("data-pass") == "true" && card5.attr("data-pass") == "true") {
            $(".line-h-2").addClass("show");
            line++;
        }
        if (card6.attr("data-pass") == "true" && card7.attr("data-pass") == "true" && card8.attr("data-pass") == "true") {
            $(".line-h-3").addClass("show");
            line++;
        }
        if (card0.attr("data-pass") == "true" && card3.attr("data-pass") == "true" && card6.attr("data-pass") == "true") {
            $(".line-v-1").addClass("show");
            line++;
        }
        if (card1.attr("data-pass") == "true" && card4.attr("data-pass") == "true" && card7.attr("data-pass") == "true") {
            $(".line-v-2").addClass("show");
            line++;
        }
        if (card2.attr("data-pass") == "true" && card5.attr("data-pass") == "true" && card8.attr("data-pass") == "true") {
            $(".line-v-3").addClass("show");
            line++;
        }
        if (card0.attr("data-pass") == "true" && card4.attr("data-pass") == "true" && card8.attr("data-pass") == "true") {;
            $(".line-diagonal-1").addClass("show");
            line++;
        }
        if (card2.attr("data-pass") == "true" && card4.attr("data-pass") == "true" && card6.attr("data-pass") == "true") {
            $(".line-diagonal-2").addClass("show");
            line++;
        }

        if (line >= 2) {
            $("#msg").hide();
            setTimeout(function() {
                var msgWin = "闖關成功！恭喜你成為農村知識王！";
                $("#msg").text(msgWin).fadeIn().removeClass().addClass("msg win animated bounceIn");
                $(".boy").addClass("animated bounce infinite");
                $("#card>li>a").unbind("click").css({
                    "cursor": "default"
                });
                $("#card>li>a[data-pass=false]").removeAttr("title");
                $("#playAgain").fadeIn(1000); // 顯示再玩一次按鈕
            }, 500)

        } else if (line == 1) {
            $("#msg").hide();
            var msgGood = "好棒！再連一條線，加油";
            $("#msg").text(msgGood).fadeIn().removeClass().addClass("msg good animated bounceIn");
        }

    }

    startGame();


});