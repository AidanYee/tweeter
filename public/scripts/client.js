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
  
  let dateCreated = new Date(userData.created_at);
  let today = new Date();

  let timeDiff = Math.abs(today.getTime() - dateCreated.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  
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
            <span>  ${diffDays === 1 ? `${diffDays} day ago` : `${diffDays} days ago`}</span>
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
    $('.tweet-container').prepend(createTweetElement(tweet));
  }

};

$(document).ready(function() {
  renderTweets(tweetData);

  // $("form").submit(function (event) {
  //   event.preventDefault();
  // });

  
  $('#new-tweet-submit').submit(function(event) {
    alert("Handler for .submit() called.");
    event.preventDefault();
    let serialData = $(this).serialize();
    console.log("🚀 ~ file: client.js ~ line 90 ~ $ ~ serialData", serialData);
    $.post("/tweets",serialData)
      .done(()=> {
        $.get("/tweets", function(data, status) {
          renderTweets(data);
        });

      });
  });

  
});




// add an event listener that listens for the submit event - done

// prevent the default behaviour of the submit event (data submission and page refresh) - done

// create an AJAX POST request in client.js that sends the form data to the server.