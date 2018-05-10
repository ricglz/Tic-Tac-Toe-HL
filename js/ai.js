
function aiAction(pos){

    //Atributes
    this.movePosition = pos;
    this.$box = $boxes.eq(pos);
    this.id = this.$box.attr('id');
    this.value = howMuchValue(this.id);
};

var whatAreBoth = function(column1, column2){
    if(board[bigBoxPos][column1]===board[bigBoxPos][column2]){
        if(board[bigBoxPos][column1]==="X") return 10;
        else if(board[bigBoxPos][column1]==="O") return 1000;
    }
    return 0;
}

var extraValueDiagonal = function(pos){
    if(pos == 1 || pos == 3 || pos == 5 || pos == 7) return 0;
    if(pos == 4){
        return whatAreBoth(0, 8) || whatAreBoth(2, 6);
    }
    if(Math.floor(pos/3)==0){
        if(pos == 8) return whatAreBoth(0, 4);
        return whatAreBoth(2, 4);
    }
    if(pos == 0) return whatAreBoth(4, 8);
    return whatAreBoth(4, 6);
}

var extraValueRow = function(pos){
    var mod = pos%3;
    var div = Math.floor(pos/3);
    switch(div){
        case 0: if(mod==0) return whatAreBoth(1, 2);
            if(mod==1) return whatAreBoth(0, 2);
            return whatAreBoth(0, 1); break;
        case 1: if(mod==0) return whatAreBoth(4, 5);
            if(mod==1){
                return whatAreBoth(3, 5)
            };
            return whatAreBoth(3, 4); break;
        case 2: if(mod==0) return whatAreBoth(7, 8);
            if(mod==1) return whatAreBoth(6, 8);
            return whatAreBoth(6, 7); break;
    }
}

var extraValueColumn = function(pos){
    var div = Math.floor(pos/3);
    var mod = pos%3;
    switch(pos%3){
        case 0: if(div==0) return whatAreBoth(3, 6);
            if(div==1) return whatAreBoth(0, 6);
            return whatAreBoth(0, 3); break;
        case 1: if(div==0) return whatAreBoth(4, 7);
            if(div==1) return whatAreBoth(1, 7);
            return whatAreBoth(1, 4); break;
        case 2: if(div==0) return whatAreBoth(5, 8);
            if(div==1) return whatAreBoth(2, 8);
            return whatAreBoth(2, 5); break;
    }
}

var extraValue = function(pos){
    return (extraValueColumn(pos) + extraValueRow(pos)) + extraValueDiagonal(pos);
}

var valueOccupied = function(pos){
    if(dontTouchBigBox[pos]==="X") return -35;
    else if(dontTouchBigBox[pos]==="O") return -20;
    return 0;
}

var howManyX = function(pos){
    return -xQuantitys[pos];
}

var howMuchValue = function(pos){
    var extra = extraValue(pos);
    extra -= valueOccupied();
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
    console.log('aqui?');
    apply($boxes.eq(cell));
};