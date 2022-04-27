/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const createTweetElement = function(userData) {
  let $tweet = $(`
  <article>
      <header class="tweet-header">
         <img src = "${userData.user.avatars}"></img>
            <p> ${userData.user.name} </p>
            <span class ="handle">${userData.user.handle}</span>
      </header>
        <div class = "tweet">
          ${userData.content.text}
        </div>
          <footer class="tweet-footer">
            <span> ${userData.created_at}</span>
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

const renderTweets = function(tweetData) {
  for (let tweet of tweetData) {
    $('.tweet-container').append(createTweetElement(tweet));
  }

};

$(document).ready(function() {
  renderTweets(tweetData);
});