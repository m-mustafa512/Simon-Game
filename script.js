var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress( function(){
  if (!started ) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var n = Math.random() * 4 ;
    var randomNumber = Math.floor(n);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); 

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     console.log("success");

     if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
     }
  } else {
    console.log("wrong");
    playSound("wrong");
    startOver();

    $("body").addClass("game-over"); 
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}