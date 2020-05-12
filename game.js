var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern =[];
var gamePattern = [];
var start = false;
var level = 0;

$(document).keypress(function(){
if(start!=true){
    $("h1").html("Level 0");
    nextSequence();
    start = true
}
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(nextSequence, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
  $("h1").html("Game Over, Press Any Key to Restart");
startOver();
}
}

function nextSequence() {
  userClickedPattern =[];
  level=level+1;

  $("h1").html("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
// animatePress(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
       $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function startOver(){
  level = 0;
  gamePattern=[];
  start =false;
}
