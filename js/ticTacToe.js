// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function

  //Attributes

  var $boxes = $('.box');
  var $bigBoxes = $('.big-box');
  var turn = 'X';
  var moves = 0;
  var bigBoxPos = 0;
  var firstTurn = true;

  //Helper functions

  var resetGame = function(){
    $boxes.text("");
    $boxes.removeClass("X");
    $boxes.removeClass("O");
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
      console.log(winner);
      if(winner){
        alert("Player " + winner + " has won.");
         resetGame();
      } else if (moves < 81){
        changeTurn();
        bigBoxPos =  $(this).attr('id');
      }
      else{
        alert("Neither player won.");
        resetGame();
      }
    }

  });

});
