/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


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

const renderTweets = function(data) {
  for (let tweet of data) {
    $('.tweet-container').prepend(createTweetElement(tweet));
  }

};

const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "/tweets/",
    success: (response) => {
      renderTweets(response);
    },
  });
};


$(document).ready(function() {
  //renderTweets(tweetData);
  
  $('#new-tweet-submit').submit(function(event) {
    //alert("Handler for .submit() called.");
    event.preventDefault();
    let serialData = $(this).serialize();
    $.post("/tweets",serialData);
    loadTweets();
  });
  
});
