require("dotenv").config();

// VARS
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
//vars to capture user inputs.
var userInput = process.argv[2]; 
var inputParameter = process.argv[3];

// SWITCH STATEMENT
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
        case 'concert-this':
            showConcert(functionData);
            break;
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

// MOVIE-THIS
function showMovieInfo(inputParameter){
    if (inputParameter === undefined || null) {
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
        console.log("Rotten Tomatoes Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + movies.imdbRating + "\n");
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

// DO-WHAT-IT-SAYS
function doWhatItSays() {
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

// CONCERT-THIS
function showConcert(bandQuery) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
  //URL test
   // console.log(queryUrl);
  request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            var concertData = JSON.parse(body);
            var momentDT = moment().format('L');


            console.log("===============================");
            // * Name of the venue
            console.log("Venue Name : " + concertData[0].venue.name +
                // * Venue location
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
                "\nDate of the Event: " + momentDT +
                "\n===============================");
        };
    });
}

// MY-TWEETS
function getMyTweets() {
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

// SPOTIFY-THIS-SONG
function getArtistNames(artist) {
    return artist.name;
}

function getMeSpotify(songName) {
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
