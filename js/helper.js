//Erases the color of the big-boxes
var whiteEverything = function(){
    for(var x = 0; x < 9; x++){
        changeColor($bigBoxes.eq(x), "white");
    }
}

//Reset the variable for a new game
var resetGame = function(){
    $boxes.text("");
    $boxes.removeClass("X");
    $boxes.removeClass("O");
    whiteEverything();
    turn = 'X';
    moves = 0;
    firstTurn = true;
}

//If is a multiplayer it allows to change the turn
var changeTurn = function(){
    if(turn === 'X'){
        turn = 'O';
    }else{
        turn = 'X';
    }
}

//Changes the color of a big-box
var changeColor = function($bigBox, color){
    $bigBox.css("background-color", color);
}

//To turn white the old big-box and turn grey the new one.
var changeColors = function($box){
    changeColor($bigBoxes.eq(bigBoxPos), "white");
    bigBoxPos =  $box.attr('id');
    changeColor($bigBoxes.eq(bigBoxPos), "#777");
}

//Validate that three boxes has the same element and is not empty
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

//Check if there is a Diagnoal win
var diagonalWin = function(){
    var leftDiagonal = allThree($boxes.eq(0 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(8 + bigBoxPos*9)),
        rightDiagonal = allThree($boxes.eq(2 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(6 + bigBoxPos*9));
    return leftDiagonal || rightDiagonal;
}

//Check if there is a Column win
var columnWin = function(){
    var leftColumn = allThree($boxes.eq(0 + bigBoxPos*9), $boxes.eq(1 + bigBoxPos*9), $boxes.eq(2 + bigBoxPos*9)),
        middleColumn = allThree($boxes.eq(3 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(5 + bigBoxPos*9)),
        rightColumn = allThree($boxes.eq(6 + bigBoxPos*9), $boxes.eq(7 + bigBoxPos*9), $boxes.eq(8 + bigBoxPos*9));
    return leftColumn || (middleColumn || rightColumn);
}

//Check if there is a Row win
var rownWin = function(){
    var upperRow = allThree($boxes.eq(0 + bigBoxPos*9), $boxes.eq(3 + bigBoxPos*9), $boxes.eq(6 + bigBoxPos*9)),
        middleRow = allThree($boxes.eq(1 + bigBoxPos*9), $boxes.eq(4 + bigBoxPos*9), $boxes.eq(7 + bigBoxPos*9)),
        bottomRow = allThree($boxes.eq(2 + bigBoxPos*9), $boxes.eq(5 + bigBoxPos*9), $boxes.eq(8 + bigBoxPos*9));
    return upperRow || (middleRow || bottomRow);
}

//Check if there is a winner
var getWinner = function(){
    return diagonalWin() || (rownWin() || columnWin());
}