$(document).ready(function() {
    $sp = $('.single-player');
    $lmp = $('.local-multiplayer');
    $boxes = $('.box');
    $bigBoxes = $('.big-box');

    for(var i = 0; i < board.length; i++){
        board[i] = new Array(9);
    }

    $('#reset').on('click', function(){
        resetGame();
    });
    $('#back').on('click', function(){
        window.location.href = "index.html";
    });

    $boxes.on('click', function(){
        var contains = $.contains($bigBoxes.get(bigBoxPos), $(this).get(0));
        if(($(this).text() === "" && contains) || firstTurn){
            apply($(this));
        }
    });

    $sp.on('click', function(){
        window.location.href = "spBoard.html";
    });

    $lmp.on('click', function(){
        window.location.href = "board.html";
    });
});