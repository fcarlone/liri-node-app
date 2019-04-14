require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const keys = require('./keys');

// Spotify Key
const spotifyKey = keys.spotify.id
// Spotify Secrete
const spotifySecrete = keys.spotify.secret
// console.log(spotifyKey, spotifySecrete)

const handleConcert = (userSearch, callback) => {
  let url = `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`;
  // console.log('url', url);

  // Axios GET request
  axios.get(url)
    .then(function (response) {
      // console.log('response', response.data[1])
      let concertArray = response.data;
      // console.log('concertArray', concertArray)

      if (concertArray.length === 0) {
        console.log(`\n${userSearch.toUpperCase()} currently not touring`)
        let logData = `${userSearch.toUpperCase()} currently not touring`;
        console.log(`============================================`);
        callback(userSearch, logData)
      } else {
        // loop through concert data array
        // console.log(`${userSearch.toUpperCase()} will be appearing at:`)
        concertArray.forEach((data) => {
          let concertVenueName = data.venue.name;
          let concertVenueCity = data.venue.city;
          let concertVenueCountry = data.venue.country;
          let concertDateFormat = moment(data.datetime).format("dddd, MMMM Do YYYY, h:mm a");
          console.log(``)
          console.log(`Venue: ${concertVenueName}`);
          console.log(`Location: ${concertVenueCity}, ${concertVenueCountry}`);
          console.log(`Date: ${concertDateFormat}`);
          console.log(`============================================`);
          let logData = `Venue: ${concertVenueName} - Location: ${concertVenueCity}, ${concertVenueCountry} - Date: ${concertDateFormat}`
          // console.log(logData)
          callback(userSearch, logData)
        })
      }
    }).catch(function (error) {
      // console.log('Error:', error);
      console.log(`\n${userSearch} was not found.`)
      console.log(`============================================`);
    })
};

const handleSong = (userSearch, callback) => {
  console.log('handle song function invoked')

  // Spotify usage with Promises
  let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  spotify
    .search({ type: 'track', query: `${userSearch}`, limit: 3 })
    .then(function (response) {
      let data = response.tracks.items
      // let dataBody = response.body
      // console.log('data.body', dataBody)

      if (data.length === 0) {
        // console.log('data.length equal 0.  Do something with "The Sign" by Ace of Base.', data)
        // axios.get(`https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE`)
        //   .then(function (response) {
        //     console.log(response)
        //   })

        spotify
          .search({ type: 'track', query: 'ace of base the sign', limit: 1 })
          .then(function (response) {
            let data = response.tracks.items
            console.log(JSON.stringify(data, null, 2))
            // let songArtists = data.album.artists[0].name;
            // let songName = data.name;
            // let songPreview = data.preview_url ? song.preview_url : "preview not available";
            // let songAlbum = data.album.name
            // console.log(` `)
            // console.log(`Artist(s): ${songArtists}`);
            // console.log(`Song name: ${songName}`);
            // console.log(`Song preview: ${songPreview}`);
            // console.log(`Song album: ${songAlbum}`);
            // console.log(`============================================`);
            // let dataLog = `Artists(s):  ${songArtists} - Song name: ${songName} - Song preview: ${songPreview} - Song album: ${songAlbum}`
            // callback(userSearch, dataLog)
          })
      }
      data.forEach((song) => {
        let songArtists = song.album.artists[0].name;
        let songName = song.name;
        let songPreview = song.preview_url ? song.preview_url : "preview not available";
        let songAlbum = song.album.name
        console.log(` `)
        console.log(`Artist(s): ${songArtists}`);
        console.log(`Song name: ${songName}`);
        console.log(`Song preview: ${songPreview}`);
        console.log(`Song album: ${songAlbum}`);
        console.log(`============================================`);
        let dataLog = `Artists(s):  ${songArtists} - Song name: ${songName} - Song preview: ${songPreview} - Song album: ${songAlbum}`
        callback(userSearch, dataLog)
      })
    })
    .catch(function (err) {
      console.log(err);
    });
};

const handleMovie = (userSearch, callback) => {
  console.log('handle movie invoked')
  let url = `https://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`;
  console.log('url', url)

  axios.get(url)
    .then(function (response) {
      let rottenTomatoesRatingValue;

      // Get rating source from Rotten Tomatoes
      response.data.Ratings.forEach((rating) => {
        if (rating.Source === "Rotten Tomatoes") {
          rottenTomatoesRatingValue = rating.Value
        }
      });
      let movieTitle = response.data.Title;
      let movieYear = response.data.Year;
      let movieImdbRating = response.data.imdbRating;
      let movieRottenTomatoesRating = rottenTomatoesRatingValue;
      let movieProductionCountry = response.data.Country;
      let movieLanguage = response.data.Language;
      let moviePlot = response.data.Plot;
      let movieActors = response.data.Actors;
      console.log('');
      console.log(`Movie title: ${movieTitle}`);
      console.log(`Movie year: ${movieYear}`);
      console.log(`IMDB rating: ${movieImdbRating}`);
      console.log(`Rotten Tomatoes rating: ${movieRottenTomatoesRating}`);
      console.log(`Country produced: ${movieProductionCountry}`);
      console.log(`Language: ${movieLanguage}`);
      console.log(`Movie plot: ${moviePlot}`);
      console.log(`Actors: ${movieActors}`);
      console.log(`============================================`);
      let logData = `Movie title: ${movieTitle} - Movie year: ${movieYear} - IMDB rating: ${movieImdbRating} - Rotten Tomatoes rating: ${movieRottenTomatoesRating} - Country Produced: ${movieProductionCountry} - Language ${movieLanguage} - Movie plot ${moviePlot} - Actors: ${movieActors}`
      callback(userSearch, logData)
    }).catch(function (err) {
      // console.log('Error:', err)
      console.log('Cannot find movie.  Maybe you will enjoy this movie:')
      handleMovie(`Mr. Nobody`, handleLog)
    })
};

const handleRandomText = () => {
  fs.readFile('./random.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    };

    let dataArray = data.split(',');
    let randomTextSong = dataArray[1];
    handleSong(randomTextSong);
  });
};

const handleLog = (userSearch, logData) => {
  // console.log('invoke print log', logData)
  let date = moment().format('MMMM Do YYYY, h:mm:ss a');
  let data = `Searched on: ${date} | User Search: ${userSearch} | ${logData}\n\n`
  fs.appendFile('./log.txt', data, 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
    // else {
    //   // console.log(`Added to log: ${data}`);
    // }
  })
};

const printLog = () => {
  fs.readFile('./log.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data)
    }
  })
};

const deleteLog = () => {
  fs.writeFile('./log.txt', '', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('\nLog has been erased.')
    }
  })
};

const instructions = () => {
  console.log('')
  console.log('Use Liri to search the following topics:\nconcerts\nsongs\nmovies\n')
  console.log('For example: node liri movie-this Star Wars')
  console.log('\nTo search for concerts, use the command:\nnode liri concert-this [artist name]')
  console.log('\nTo search for a song, use the command:\nnode liri spotify-this-song [song name]')
  console.log('\nTo search for a movie, use the command:\nnode liri movie-this [movie name]')
  console.log('\nYou can view your previous searches by using the command:\nnode liri print-log')
  console.log('\nYou can delete your previous searches log by using the command:\nnode liri delete-log')
};

module.exports = {
  handleConcert: handleConcert,
  handleSong: handleSong,
  handleMovie: handleMovie,
  handleRandomText: handleRandomText,
  handleLog: handleLog,
  printLog: printLog,
  deleteLog: deleteLog,
  instructions: instructions
};
