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

var getSongDetails = function() {
  if (typeof process.argv[3] != 'undefined') {
    var songName = process.argv[3];
  } else {
    var songName = 'The Sign Ace of Base';
  }

  spotify.search({ type: 'track', query: songName, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log('');
    console.log("Here's your search result:");
    console.log('-------------------------');
    console.log('Artist(s):', data.tracks.items[0].artists[0].name);
    console.log('Song:', data.tracks.items[0].name);
    console.log(
      'Spotify Preview Link:',
      data.tracks.items[0].external_urls.spotify
    );
    console.log('Album:', data.tracks.items[0].album.name);
    console.log('-------------------------');
    console.log('');
  });
};

switch (command) {
  case 'my-tweets':
    getTweets();
    break;
  case 'spotify-this-song':
    getSongDetails();
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
