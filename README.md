# Liri CLI node application
Use the liri 

## What is Liri?
Liri is an application that allows you to retrieve music, movie, and concert information from your command line.

For my liri bot, I also included a command feature to pull tweets from my twitter feed.

## App Organization
My liri opens with the variables needed to call supporting packages and files folllowed by user input variables. Then I included a switch statement for each of the user commands. Then there are movie, concert, do-what-it-says (random.txt), twitter, and spotify functions.

## Using Liri
To use liri, clone the app. You'll have to enter your own key and .env information for the bot to work. For the Twitter feature, replace your screen name and api key data.

To run:
1. Access liri.js from your command line.
2. To view movie information, enter node liri movie-this [movie name].
3. For concert data, enter node liri concert-this [band name].
4. For song data from spotify, enter node liri spotify-this-song [song name].
5. For your latest tweets, enter node liri my-tweets.
6. To run a command from random.txt, enter node liri do-what-it-says.

## Packages and APIs
For this project, I'm using the nmp Axios package to pull movie data from IMDB, the NPM node-spotify-api package to retrieve song information, a call to bandsintown for concert information, and the twitter=api package to retrieve recent tweets.

## Video Demo

Watch my video to view the bot in action!

https://youtu.be/Sicn7i1DiE4

## Screenshots
See concert_this.jpg, do_what_it_says.jpg, movie_this.jpg, my_tweets.jpg, and spotify_this_song.jpg images in the file root.

## Development role and resources
I followed the project guidelines and video tutorials for week ten to code Twitter, spotify, movie, and do-what-it-says functions; for concerts I attempted this on my own but referred to other liri repos and what I had developed up to that point for guidance. 

## Release notes
When you perform a search for movie information, movies are returned but an error is also returned. It appears that my code is reading 'venue' from the concerts function and logs an undefined error.

