//Constructor for the aiAction object. aiAction has the attributes of the box, its id 
//and the value or weight of that action. The bigger the weight it is more probable to 
//be chosen as the action to make
function aiAction(pos){

    //Atributes
    this.$box = $boxes.eq(pos);
    this.id = this.$box.attr('id');
    this.value = howMuchValue(this.id);
};

//Identifies which letter are the one near it and if it would be more valuable to do the move or not
var whatAreBoth = function(column1, column2){
    var text1 = board[bigBoxPos][column1]  
        text2 = board[bigBoxPos][column2];
    if(text1===text2){
        if(text1==="X") return 50;
        if(text2==="O") return 9000;
    }
    var value = 0;
    if((text1 === "X" && !isOccupied(text2)) || (text2 === "X" && !isOccupied(text1)))  value+=15;
    if((text1 === "O" && !isOccupied(text2)) || (text2 === "O" && !isOccupied(text1))) value+=40;
    return value;
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win in diagonal
var extraValueDiagonal = function(div, pos){
    if(pos === 1 || pos === 3 || pos === 5 || pos === 7) return 0;
    if(pos == 4) return whatAreBoth(0, 8) || whatAreBoth(2, 6);
    if(div!=0){
        if(pos == 8) return whatAreBoth(0, 4);
        return whatAreBoth(2, 4);
    }
    if(pos == 0) return whatAreBoth(4, 8);
    return whatAreBoth(4, 6);
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win in a row
var extraValueRow = function(div, mod){
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
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win in a column
var extraValueColumn = function(div, mod){
    switch(mod){
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
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win
var extraValue = function(pos){
    var div = Math.floor(pos/3),
        mod = pos%3;
    return extraValueColumn(div, mod) + extraValueRow(div, mod) + extraValueDiagonal(div, pos);
}

//Checks if the chosen pos could allow the other player to play in the same box.
//Ex. while it is in the middle big-box, it is avaible the middle box as an action
var valueRecursive = function(pos){
    if(pos === bigBoxPos) return 20;
    return 0;
};

//Determine much is the value of the action
var howMuchValue = function(pos){
    return extraValue(pos) - amountOccupied[pos] - dontTouchBigBox[pos] - valueRecursive(pos);
};

//Checks which are the more factible actions to play
var different = function(actionArray){
    var min = actionArray[0].value,
        erasePos = 1;
    while(erasePos < actionArray.length && min == actionArray[erasePos].value){
        erasePos++;
    }
    return erasePos;
};

//Prints the value of x
var print = function(actionArray){
    for(var x = 0; x < actionArray.length; x++){
        console.log(actionArray[x].id + ": " + actionArray[x].value);
    }
};

//Delete the elements with less value than the rest
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

//Create an array which contains aiActions
var createActionArray = function(){
    var actionArray = [];
    var aux = bigBoxPos*9;
    for( var x = 0 + aux; x < 9 + aux; x++){
        if($boxes.eq(x).text()===""){
            actionArray.push(new aiAction(x));
        }
    }
    return actionArray;
};

//Decide which action to take
var decide = function(){
    var actionArray = createActionArray();
    actionArray = deleteElements(actionArray);
    return actionArray[Math.floor(Math.random() * actionArray.length)].$box;
};

//Makes a move
var move = function(){
    var $box = decide();
    apply($box);
};