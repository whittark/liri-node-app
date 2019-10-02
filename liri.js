require("dotenv").config();

// VARS
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
//vars to capture user inputs.
var userOption = process.argv[2]; 
var inputParameter = process.argv[3];

// IMDB FUNCTION
function showMovieInfo(inputParameter){
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=b3c0b435";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var movies = JSON.parse(body);
        console.log("**********MOVIE INFO*********");  
        fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
        console.log("Title: " + movies.Title);
        fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
        console.log("Release Year: " + movies.Year);
        fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
        console.log("Language: " + movies.Language);
        fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
        console.log("Plot: " + movies.Plot);
        fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
        console.log("Actors: " + movies.Actors);
        fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
        console.log("*****************************");  
        fs.appendFileSync("log.txt", "*****************************\n");
    } else{
      console.log('Error occurred.');
    }

});}

// DO WHAT IT SAYS TXT READ
var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        
        var dataArr = data.split(',');

        if (dataArr.length ==2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length ==1) {
            pick(dataArr[0]);
        }  
    });
}

// TWITTER FUNCTION
var getMyTweets = function() {
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'tarkina3'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        //console.log(tweets);
        for(var i=0; i<tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(' ');
            console.log(tweets[i].text);
        }
    }
  });
}

// SPOTIFY FUNCTION
var getArtistNames = function(artist) {
    return artist.name;
}
var getMeSpotify = function(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: '+ songs[i].preview_url);
            console.log('album: '+ songs[i].album.name);
            console.log('=====================================');
        }
    });
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            showMovieInfo(functionData);
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log('Liri did not understand. Enter a valid command.');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);