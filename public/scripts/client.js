/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          ${data.content.text}
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

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function() {
  //renders all tweets
  loadTweets();

  $('#new-tweet-submit').submit(function(event) {
    // stops the regular form post method from firing
    event.preventDefault();

    const textArea = $(this).children("textarea");
    console.log("🚀 ~ file: client.js ~ line 64 ~ $ ~ textArea", textArea);
    const inputText = textArea.val();
    console.log("🚀 ~ file: client.js ~ line 66 ~ $ ~ inputText", inputText);

    if (!inputText) {
      return alert("Go on...type someting!");
    } else if (inputText.length > 140) {
      return alert("Go on...type someting!");
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
