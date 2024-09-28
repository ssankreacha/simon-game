var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level); // Change title to show level
    nextSequence();
    started = true; // Set game to started
  }
});

// Detect when a button is clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // Get the id of the clicked button
  userClickedPattern.push(userChosenColour); // Add to user's clicked pattern

  playSound(userChosenColour); // Play the corresponding sound
  animatePress(userChosenColour); // Animate the button press

  checkAnswer(userClickedPattern.length - 1); // Check the user's answer
});

// Generate the next sequence
function nextSequence() {
  userClickedPattern = []; // Reset the user's clicked pattern
  level++; // Increase the level each time nextSequence is called
  $("#level-title").text("Level " + level); // Update the h1 to show the level

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // Play sound when sequence advances
}

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // Check if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong"); // Play the wrong sound

    $("body").addClass("game-over"); // Add game-over class to body
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver(); // Restart the game
  }
}

// Play sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate the button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Reset the game variables
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}




