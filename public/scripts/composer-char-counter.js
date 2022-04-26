// need to come back and impliment this function using 'this' instead of '.counter'

$(document).ready(function() {
  $("textarea").keyup(onKeyUp);
});

const onKeyUp = function() {
  const tweetLength = $("textarea").val().length;
  const remainingChar = 140 - tweetLength;
  $(".counter").html(remainingChar);
  if (remainingChar < 0) {
    //css color red
    $(".counter").css("color", "red");
  } else {
    //css color black
    $(".counter").css("color", "#3a3832");
  }
};