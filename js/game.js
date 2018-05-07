var Game = function(value){

    //Attributes
    var $boxes = $('.box');
    var xQuantitys = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var $bigBoxes = $('.big-box');
    var turn = 'X';
    var moves = 0;
    var bigBoxPos = 0;
    var firstTurn = true;
    var singlePlayer = value;

    //Helper functions

    //Human functions

    var whiteEverything = function(){
        for(var x = 0; x < 9; x++){
            changeColor($bigBoxes.eq(x), "white");
        }
    }

    var resetGame = function(){
        $boxes.text("");
        $boxes.removeClass("X");
        $boxes.removeClass("O");
        whiteEverything();
        turn = 'X';
        moves = 0;
        firstTurn = true;
    }

    var changeTurn = function(){
        if(turn === 'X'){
            turn = 'O';
        }else{
            turn = 'X';
        }
    }

    var changeColor = function($bigBox, color){
        $bigBox.css("background-color", color);
    }

    var changeColors = function($box){
        changeColor($bigBoxes.eq(bigBoxPos), "white");
        bigBoxPos =  $box.attr('id');
        changeColor($bigBoxes.eq(bigBoxPos), "#777");
    }

    var allThree = function($firstBox, $secondBox, $thirdBox){
        var firstText = $firstBox.text(),
            secondText = $secondBox.text(),
            thirdText = $thirdBox.text();
        if((firstText === secondText) && (secondText===thirdText)){
            if(firstText === "X" || firstText === "O"){
            return firstText;
            }
        }
        return null;
    }

    var diagonalWin = function(){
        var leftDiagonal = allThree($boxes.eq(0 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(8 + bigBoxPos*9)),
            rightDiagonal = allThree($boxes.eq(2 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(6 + bigBoxPos*9));
        return leftDiagonal || rightDiagonal;
    }

    var columnWin = function(){
        var leftColumn = allThree($boxes.eq(0 + bigBoxPos*9), $boxes.eq(1 + bigBoxPos*9), $boxes.eq(2 + bigBoxPos*9)),
            middleColumn = allThree($boxes.eq(3 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(5 + bigBoxPos*9)),
            rightColumn = allThree($boxes.eq(6 + bigBoxPos*9), $boxes.eq(7 + bigBoxPos*9), $boxes.eq(8 + bigBoxPos*9));
        return leftColumn || (middleColumn || rightColumn);
    }

    var rownWin = function(){
        var upperRow = allThree($boxes.eq(0 + bigBoxPos*9), $boxes.eq(3 + bigBoxPos*9), $boxes.eq(6 + bigBoxPos*9)),
            middleRow = allThree($boxes.eq(1 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(7 + bigBoxPos*9)),
            bottonRow = allThree($boxes.eq(2 + bigBoxPos*9), $boxes.eq(5 + bigBoxPos*9), $boxes.eq(8 + bigBoxPos*9));
        return upperRow || (middleRow || bottonRow);
    }

    var getWinner = function(){
        return diagonalWin() || (rownWin() || columnWin());
    }

    //AI functions

    var arrange = function(pos){
        var change = true;
        for(var i = 0; i < pos.length-1 && change; i++){
            change = false;
            for(var j = 0; j < pos.length-i-1; j++){
                if(xQuantitys[$boxes.eq(pos[j]).attr('id')] > xQuantitys[$boxes.eq(pos[j+1]).attr('id')]){
                    pos[j]^=pos[j+1];
                    pos[j+1]^=pos[j];
                    pos[j]^=pos[j+1];
                }
            }
        }
    };

    var decide = function(){
        var pos = [];
        for(var x = 0 + bigBoxPos*9; x < 9 + bigBoxPos*9; x++){
            if($boxes.eq(x).text()===""){
                pos.push(x);
            }
        }
        arrange(pos);
        return pos[Math.floor(Math.random() * pos.length)];
    }

    var apply = function($box){
        $box.text("O");
        $box.addClass("O");
        moves+=1;
        var winner = getWinner();
        if(winner){
            alert("Player " + winner + " has won.");
            resetGame();
        } else if (moves < 81){
            changeColors($box);
        }
        else{
            alert("Neither player won.");
            resetGame();
        }
    };

    var move = function(){
        var cell = decide();
        apply($boxes.eq(cell));
    };

    //Event listeners

    $('#reset').on('click', function(){
        resetGame();
    });

    $boxes.on('click', function(){
        var contains = $.contains($bigBoxes.get(bigBoxPos), $(this).get(0));
        if(($(this).text() === "" && contains) || firstTurn){
            if(firstTurn){
                firstTurn = false;
            }
            $(this).text(turn);
            $(this).addClass(turn);
            moves+=1;
            var winner = getWinner();
            if(winner){
                alert("Player " + winner + " has won.");
                resetGame();
            } else if (moves < 81){
                changeColors($(this));
                if(singlePlayer){
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
}