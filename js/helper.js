//Turn the color of all the big-boxes into grey
var greyEverything = function(){
    for(var x = 0; x < 9; x++){
        changeColor($bigBoxes.eq(x), "#999");
    }
};

//Turn the color of all the big-boxes into white
var whiteEverything = function(){
    for(var x = 0; x < 9; x++){
        changeColor($bigBoxes.eq(x), "white");
    }
};

//Helps to create a fadeIn with the objective of showing which was the AI move
function fadeIn($box, time) {
    $box.css('opacity', 0);
    var last = +new Date();
    var tick = function() {
        $box.css('opacity', +$box.css('opacity')+ (new Date() - last) / time);
        last = +new Date();
        if (+$box.css('opacity') < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
  
    tick();
};

//Changes the color of a big-box
var changeColor = function($bigBox, color){
    $bigBox.css("background-color", color);
};

//To turn white the old big-box and turn grey the new one.
var changeColors = function($box){
    changeColor($bigBoxes.eq(bigBoxPos), "#999");
    bigBoxPos =  $box.attr('id');
    changeColor($bigBoxes.eq(bigBoxPos), "white");
};

function constructBoard(){
    for(var i = 0; i < board.length; i++){
        board[i] = new Array(9);
    }
};