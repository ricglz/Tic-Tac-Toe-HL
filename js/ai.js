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

var hasLessX = function(firstBox, secondBox){
    var firstBigBoxPos = $boxes.eq(firstBox).attr('id');
    var secondBigBoxPos = $boxes.eq(secondBox).attr('id');
    return xQuantitys[firstBigBoxPos] < xQuantitys[secondBigBoxPos];
};

var different = function(boxArray){
    var min = xQuantitys[$boxes.eq(boxArray[0]).attr('id')],
        erasePos = 1;
    while(erasePos < boxArray.length && min == xQuantitys[$boxes.eq(boxArray[erasePos]).attr('id')]){
        erasePos++;
    }
    return erasePos;
};

var print = function(boxArray){
    for(var x = 0; x < boxArray.length; x++){
        console.log(xQuantitys[$boxes.eq(boxArray[x]).attr('id')]);
    }
}

var deleteElements = function(boxArray){
    if(boxArray.length==1) return boxArray;
    if(boxArray.length==2){
        if(hasLessX(boxArray[0], boxArray[1])) return boxArray[0];
        return boxArray[1];
    }
    boxArray.sort(function(a, b){
        if(hasLessX(a, b)) return -1;
        if(hasLessX(b, a)) return 1;
        return 0;
    });
    var erasePos = different(boxArray);
    if(erasePos < boxArray.length){
        boxArray.splice(erasePos, boxArray.length-erasePos);
    }
    //print(boxArray);
    return boxArray;
};

var decide = function(){
    var boxArray = [];
    for(var x = 0 + bigBoxPos*9; x < 9 + bigBoxPos*9; x++){
        if($boxes.eq(x).text()===""){
            boxArray.push(x);
        }
    }
    boxArray = deleteElements(boxArray);
    return boxArray[Math.floor(Math.random() * boxArray.length)];
}

var move = function(){
    var cell = decide();
    apply($boxes.eq(cell));
};