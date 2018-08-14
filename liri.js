require('dotenv').config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

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

var getMovieDetails = function() {
  // Store all of the arguments in an array
  var nodeArgs = process.argv;

  // default movie
  var movieName = 'Mr.+Nobody';

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + '+' + nodeArgs[i];
    } else {
      movieName = nodeArgs[i];
    }
  }

  // run a request to the OMDB API with the movie specified
  var queryUrl =
    'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';

  // console.log(queryUrl);

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log('');
      console.log("Here's your search result:");
      console.log('-------------------------');
      console.log('Title: ' + JSON.parse(body).Title);
      console.log('Year: ' + JSON.parse(body).Year);
      console.log('IMDB Rating: ' + JSON.parse(body).Ratings[0].Value);
      console.log(
        'Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value
      );
      console.log('Country: ' + JSON.parse(body).Country);
      console.log('Language: ' + JSON.parse(body).Language);
      console.log('Plot: ' + JSON.parse(body).Plot);
      console.log('Actors: ' + JSON.parse(body).Actors);
      console.log('-------------------------');
      console.log('');
    }
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
    getMovieDetails();
    break;
  case 'do-what-it-says':
    console.log('Do what it says');
    break;
  default:
    console.log('Command Not Supported!');
}
