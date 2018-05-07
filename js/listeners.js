var $bigBoxes;
var $boxes;
var $sp;
var $lmp;
var xQuantitys = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var turn = 'X';
var moves = 0;
var bigBoxPos = 0;
var firstTurn = true;


$(document).ready(function() {
    $sp = $('.single-player');
    $lmp = $('.local-multiplayer');
    $boxes = $('.box');
    $bigBoxes = $('.big-box');

    $('#reset').on('click', function(){
        resetGame();
    });
    $('#back').on('click', function(){
        window.location.href = "index.html";
    });

    $boxes.on('click', function(){
        var contains = $.contains($bigBoxes.get(bigBoxPos), $(this).get(0));
        if(($(this).text() === "" && contains) || firstTurn){
            $(this).text(turn);
            $(this).addClass(turn);
            moves+=1;
            if(!firstTurn) xQuantitys[bigBoxPos]++;
            firstTurn = false;
            var winner = getWinner();
            if(winner){
                alert("Player " + winner + " has won.");
                if(winner==="X"){
                    changeScore($('.xScore').eq(0));
                }
                else{
                    changeScore($('.oScore').eq(0));
                }
                resetGame();
            } else if (moves < 81){
                changeColors($(this));
                if($('html').hasClass('ai')){
                    move();
                }
                else{
                    changeTurn();
                }
            }
            else{
                alert("Neither player won.");
                resetGame();
            }
        }
    });

    $sp.on('click', function(){
        window.location.href = "spBoard.html";
    });

    $lmp.on('click', function(){
        window.location.href = "board.html";
    });
});