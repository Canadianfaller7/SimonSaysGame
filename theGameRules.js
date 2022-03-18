$(function() {
    var colors = $('#colors li').animate({
        left: '250px',
        opacity: '0.5',
        height: '100px',
        width: '100px'});
    var mainColor = $('#main');
    var start = $('#start')
    var gameState = 'waiting';
    var gameSequence = new Array();
    var level = 1;
    var t;
    var flashNo;
    var clickedNo;
    var setupLightSequence = function() {
        var randomNum = Math.floor(Math.random() * 4);
        gameSequence[level-1] = randomNum;
        showLightSequence();
    };
    var lightOn = function(no) {
        colors.eq(gameSequence[no]).addClass('on');
    };
    var lightOff = function() {
        colors.removeClass('on');
    };
    var showLightSequence = function() {
        lightOff();

        if(flashNo < level) {
            var on = setTimeout(function() {
                var off = setTimeout(function() {
                    showLightSequence();
                    flashNo++;
                }, 500);
                lightOn(flashNo);
            }, 500);
        }
        else {
            gameState = 'playing';
            $('body').addClass('playing');
            start.text('Your turn...');
            clearTimeout(on);
        }
    };
    colors.click(function() {
        if(gameState == 'playing') {
            var selectedSquare = $(this).index();
            var selectedColor = $(this).css('background-color');
            $(this).fadeTo("slow", 0.25);
            $(this).fadeTo("slow", 1);

            if(gameSequence[clickedNo] == selectedSquare) {
                if(clickedNo == level-1) {
                    gameState = 'waiting';
                    $('body').removeClass('playing');
                    start.text('Well Done! Go to the next level > ');
                    level++;
                }
                lightOn(clickedNo);
                var off = setTimeout(function() {
                lightOff();
                clickedNo++;
                });
            }
            else {
                gameState = 'waiting';
                $('body').removeClass('playing');
                start.text('GAME OVER. Try again?');
                $('body').removeClass('playing').addClass('game-over');
                gameSequence = new Array();
    
                level = 1
            }
        }
    });
    var init = function() {
        $('#level').text('Level ' + level);
        flashNo = 0;
        clickedNo = 0;
        $(this).text('Simon says...');
        $('body').removeClass('game-over');
        setupLightSequence();
    }
    start.click(init);
});