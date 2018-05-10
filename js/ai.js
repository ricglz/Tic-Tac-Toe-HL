/*//Check if the other player can wins
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
};

//Generates the value of winning in a Row
var almostAWinValueRow = function($bigBox){
    var upperRow = couldWin($bigBox.find('#0'), $bigBox.find('#1'), $bigBox.find('#2'));
        middleRow = couldWin($bigBox.find('#3'), $bigBox.find('#4'), $bigBox.find('#5'));
        bottomRow = couldWin($bigBox.find('#6'), $bigBox.find('#7'), $bigBox.find('#8'));
    return (upperRow + middleRow) + bottomRow;
};

//Generates the value of winning
var almostAWinValue = function($bigBox){
    return almostAWinValueDiagonal($bigBox) + almostAWinValueRow($bigBox) + almostAWinValueColumn($bigBox);
};*/

function aiAction(pos){

    //Atributes
    this.movePosition = pos;
    this.$box = $boxes.eq(pos);
    this.id = this.$box.attr('id');
    this.value = howMuchValue(this.id);
};

var bothAreOs = function(column1, column2){
    return (board[bigBoxPos][column1]==="O" && board[bigBoxPos][column1]===board[bigBoxPos][column2]);
}

var canIWinDiagonal = function(pos){
    if(pos == 1 || pos == 3 || pos == 5 || pos == 7) return false;
    if(pos == 4){
        return bothAreOs(0, 8) || bothAreOs(2, 6);
    }
    if(Math.floor(pos/3)==0){
        if(pos == 8) return bothAreOs(0, 4);
        return bothAreOs(2, 4);
    }
    if(pos == 0) return bothAreOs(4, 8);
    return bothAreOs(4, 6);
}

var canIWinRow = function(pos){
    var mod = pos%3;
    var div = Math.floor(pos/3);
    switch(div){
        case 0: if(mod==0) return bothAreOs(1, 2);
            if(mod==1) return bothAreOs(0, 2);
            return bothAreOs(0, 1); break;
        case 1: if(mod==0) return bothAreOs(4, 5);
            if(mod==1){
                return bothAreOs(3, 5)
            };
            return bothAreOs(3, 4); break;
        case 2: if(mod==0) return bothAreOs(7, 8);
            if(mod==1) return bothAreOs(6, 8);
            return bothAreOs(6, 7); break;
    }
}

var canIWinColumn = function(pos){
    var div = Math.floor(pos/3);
    var mod = pos%3;
    switch(pos%3){
        case 0: if(div==0) return bothAreOs(3, 6);
            if(div==1) return bothAreOs(0, 6);
            return bothAreOs(0, 3); break;
        case 1: if(div==0) return bothAreOs(4, 7);
            if(div==1) return bothAreOs(1, 7);
            return bothAreOs(1, 4); break;
        case 2: if(div==0) return bothAreOs(5, 8);
            if(div==1) return bothAreOs(2, 8);
            return bothAreOs(2, 5); break;
    }
}

var canIWin = function(pos){
    return (canIWinColumn(pos) || canIWinRow(pos)) || canIWinDiagonal(pos);
}

var howManyX = function(pos){
    return -xQuantitys[pos];
}

var howMuchValue = function(pos){
    var extra = 0;
    if(canIWin(pos)){
        return 100;
    }
    return howManyX(pos) + extra;

}

var different = function(actionArray){
    var min = actionArray[0].value,
        erasePos = 1;
    while(erasePos < actionArray.length && min == actionArray[erasePos].value){
        erasePos++;
    }
    return erasePos;
};

var print = function(actionArray){
    for(var x = 0; x < actionArray.length; x++){
        console.log(actionArray[x].value)
    }
};

var deleteElements = function(actionArray){
    if(actionArray.length > 1){
        actionArray.sort(function(a, b){
            return b.value - a.value;
        });
        var erasePos = different(actionArray);
        if(erasePos < actionArray.length){
            actionArray.splice(erasePos, actionArray.length-erasePos);
        }
    }
    return actionArray;
};

var createactionArray = function(){
    var actionArray = [];
    var aux = bigBoxPos*9;
    for( var x = 0 + aux; x < 9 + aux; x++){
        if($boxes.eq(x).text()===""){
            actionArray.push(new aiAction(x));
        }
    }
    return actionArray;
};

var decide = function(){
    var actionArray = createactionArray();
    actionArray = deleteElements(actionArray);
    return actionArray[Math.floor(Math.random() * actionArray.length)].movePosition;
};

var move = function(){
    var cell = decide();
    apply($boxes.eq(cell));
};