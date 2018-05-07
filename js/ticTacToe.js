// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function

  var $sp = $('.single-player');
  var $lmp = $('.local-multiplayer');


  $sp.on('click', function(){
    game = new Game(true);
    window.location.href = "spBoard.html";
  });

  $lmp.on('click', function(){
    game = new Game(false);
    window.location.href = "board.html";
  });

});
