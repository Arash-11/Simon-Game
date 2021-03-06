var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 1;

var i = 0;

// ----------  When Clicking A Color Button  ----------

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userChosenColour);
})

// ----------  This Function Compares The Buttons The User Clicks With The One Generated By The Site  ----------

function checkAnswer(chkColor) {

    if (chkColor == gamePattern[i]) {
      if (i < gamePattern.length) {
        userClickedPattern.push(chkColor);
        i++;
      }
      if (userClickedPattern.length == gamePattern.length) {
        level++;
        setTimeout(nextSequence, 500);
      }
    }

    else if (chkColor != gamePattern[i]) {
      playSound("wrong");
      gameOver();
    }
}

function gameOver() {
  $("body").addClass("game-over");

  setTimeout (function() {
    $("body").removeClass("game-over");
  }, 200);

  setTimeout(function() {
    location.reload();
  }, 1000);
}

// ----------  Randomly Generates The Color Sequence  ----------

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  $("h1").text("Level " + level);

  i = 0;
  userClickedPattern = [];
}

// ----------  One Time Function To Start The Game  ----------

$(document).one("keydown", function() {
  nextSequence();
});

// ----------  Functions To Play Sounds And Animate The Buttons  ----------

function playSound(name) {
  var audio = new Audio("https://github.com/Arash-11/Simon-Game/blob/master/" + name + ".mp3?raw=true");
  return audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
