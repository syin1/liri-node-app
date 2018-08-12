require('dotenv').config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
require('request');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

var getTweets = function() {
  var params = {
    user_id: 'JohnSmi55593341',
    count: 20
  };

  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log('');
      console.log('Here are my last 20 tweets:');
      console.log('---------------------------');
      for (var i = 0; i < tweets.length; i++) {
        var no = i + 1;
        console.log(
          'Tweet ' + no + ':',
          tweets[i].text,
          '(' + tweets[i].created_at + ')'
        );
      }
      console.log('---------------------------');
      console.log('');
    }
  });
};

switch (command) {
  case 'my-tweets':
    getTweets();
    break;
  case 'spotify-this-song':
    console.log('Spotify');
    break;
  case 'movie-this':
    console.log('Movie');
    break;
  case 'do-what-it-says':
    console.log('Do what it says');
    break;
  default:
    console.log('Command Not Supported!');
}
