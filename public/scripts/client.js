/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// prevent Cross-Site Scripting (XSS) with escape function below
const escape2 = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creates tweet template
const createTweetElement = function(data) {
  let $tweet = $(`
  <article>
      <header class="tweet-header">
         <img src = "${data.user.avatars}"></img>
            <p> ${data.user.name} </p>
            <span class ="handle">${data.user.handle}</span>
      </header>
        <div class = "tweet">
          <p>${escape2(data.content.text)}</p>
        </div>
          <footer class="tweet-footer">
            <span> ${timeago.format(data.created_at)}</span>
            <div>
              <span class='social-icons'>
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </span>
            </div>
          </footer>
    </article>`);
    
  return $tweet;

};

// loops through tweets and adds them to '.tweet-container'
const renderTweets = function(data) {
  // clears tweet container to prevent repeat tweets
  $('.tweet-container').empty();
  for (let tweet of data) {
    $('.tweet-container').prepend(createTweetElement(tweet));
  }

};

// ajax GET request function
const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "/tweets/",
    success: (response) => {
      renderTweets(response);
    },
  });
};


// hides .tweet-error div
const errorMessage = $(".tweet-error");
errorMessage.hide();


$(document).ready(function() {


  //renders all tweets
  loadTweets();

  $('#new-tweet-submit').submit(function(event) {
    // stops the regular form post method from firing
    event.preventDefault();
    const textArea = $(this).children("textarea");
    const inputText = textArea.val();
    // tweet validation with jQuery
    if (!inputText) {
      const emptyError = $(".tweet-error").text(`🚀 Go on...no one will retweet nothing! 🚀`);
      emptyError.hide();
      emptyError.css({
        'border-bottom': '1px solid red',
        'display': 'inline-block',
      }).slideDown(1500).fadeOut(5000);
    } else if (inputText.length > 140) {
      const limitError = $(".tweet-error").text(`✂️  Keep it under 140 characters bucko  ✂️`);
      limitError.hide();
      limitError.css({
        'border-bottom': '1px solid red',
        'display': 'inline-block',
      }).slideDown(1500).fadeOut(7000);
    } else {
    // creates a text string in standard URL-encoded notation
      let serialData = $(this).serialize();
      // ajax post request
      $.post("/tweets",serialData)  .done(()=> {
      // ajax get request
        $.get("/tweets", function(data, status) {
        // displays new tweets
          renderTweets(data);
        });

      });
    }
  });
});
