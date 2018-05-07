//Check if the other player can wins
var couldWin = function($firstBox, $secondBox, $thirdBox){
    var sum = 0;
    if($firstBox.text()==="X") sum++;
    else if($firstBox.text==="O") return false;
    if($secondBox.text()==="X") sum++;
    else if($secondBox.text==="O") return false;
    if($thirdBox.text()==="X") sum++;
    else if($thirdBox.text==="O") return false;
    return sum == 2;
};

//Generates the value of winning in a Diagonal
var almostAWinValueDiagonal = function($bigBox){
    var leftDiagonal = couldWin($bigBox.find('#0'), $bigBox.find('#4'), $bigBox.find('#8'));
        rightDiagonal = couldWin($bigBox.find('#2'), $bigBox.find('#4'), $bigBox.find('#6'));
    return leftDiagonal  + rightDiagonal;
};

//Generates the value of winning in a Column
var almostAWinValueColumn = function($bigBox){
    var leftColumn = couldWin($bigBox.find('#0'), $bigBox.find('#3'), $bigBox.find('#6'));
        middleColumn = couldWin($bigBox.find('#1'), $bigBox.find('#4'), $bigBox.find('#7'));
        rightColumn = couldWin($bigBox.find('#2'), $bigBox.find('#5'), $bigBox.find('#8'));
    return (leftColumn + middleColumn) + rightColumn;
}

//Generates the value of winning in a Row
var almostAWinValueRow = function($bigBox){
    var upperRow = couldWin($bigBox.find('#0'), $bigBox.find('#1'), $bigBox.find('#2'));
        middleRow = couldWin($bigBox.find('#3'), $bigBox.find('#4'), $bigBox.find('#5'));
        bottomRow = couldWin($bigBox.find('#6'), $bigBox.find('#7'), $bigBox.find('#8'));
    return (upperRow + middleRow) + bottomRow;
}

//Generates the value of winning
var almostAWinValue = function($bigBox){
    return almostAWinValueDiagonal($bigBox) + almostAWinValueRow($bigBox) + almostAWinValueColumn($bigBox);
};

//Checks if the firstbox has a less pririty than the second, therefore that is less important
var lessPriority = function($firstBox, $secondBox){
    firstBigBoxPos = $firstBox.attr('id');
    secondBigBoxPos = $secondBox.attr('id');
    if(xQuantitys[firstBigBoxPos] > xQuantitys[secondBigBoxPos]){
        return true;
    }
    return almostAWinValue($firstBox) > almostAWinValue($secondBox);
};

//Arrange the values
var arrange = function(pos){
    var change = true;
    for(var i = 0; i < pos.length-1 && change; i++){
        change = false;
        for(var j = 0; j < pos.length-i-1; j++){
            if(lessPriority($boxes.eq(pos[j]), $boxes.eq(pos[j+1]))){
                change = true;
                pos.splice(j, 1);
            }
        }
    }
    return pos;
};

var decide = function(){
    var pos = [];
    for(var x = 0 + bigBoxPos*9; x < 9 + bigBoxPos*9; x++){
        if($boxes.eq(x).text()===""){
            pos.push(x);
        }
    }
    pos = arrange(pos);
    return pos[Math.floor(Math.random() * pos.length)];
    
}

var apply = function($box){
    $box.text("O");
    $box.addClass("O");
    moves+=1;
    var winner = getWinner();
    if(winner){
        changeScore($('.oScore').eq(0));
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