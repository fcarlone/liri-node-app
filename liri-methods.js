require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const keys = require('./keys');

const handleConcert = (userSearch, callback) => {
  let url = `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`;

  // Axios GET request
  axios.get(url)
    .then(function (response) {
      let concertArray = response.data;

      if (concertArray.length === 0) {
        console.log(`\n${userSearch.toUpperCase()} currently not touring`)
        let logData = `${userSearch.toUpperCase()} currently not touring`;
        console.log(`============================================`);
        callback(userSearch, logData)
      } else {
        // loop through concert data array
        console.log(`${userSearch.toUpperCase()} will be appearing at:`)
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
          let logData = `Venue: ${concertVenueName} - Location: ${concertVenueCity}, ${concertVenueCountry} - Date: ${concertDateFormat}`;
          callback(userSearch, logData)
        })
      }
    }).catch(function (error) {
      console.log(`\n${userSearch} was not found.`)
      console.log(`============================================`);
    })
};

const handleSong = (userSearch, callback) => {
  let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  if (!userSearch) {
    userSearch = 'ace of base the sign';
  };

  spotify
    .search({ type: 'track', query: `${userSearch}`, limit: 5 })
    .then(function (response) {
      let data = response.tracks.items
      if (data.length === 0) {
        console.log(`Cannot find song called ${userSearch}.  Try this song.`)
        spotify
          .search({ type: 'track', query: 'ace of base the sign', limit: 1 })
          .then(function (response) {
            let data = response.tracks.items[0]
            let songArtists = data.album.artists[0].name;
            let songName = data.name;
            let songPreview = data.preview_url ? data.preview_url : "preview not available";
            let songAlbum = data.album.name
            console.log('')
            console.log(`Artist(s): ${songArtists}`);
            console.log(`Song name: ${songName}`);
            console.log(`Song preview: ${songPreview}`);
            console.log(`Song album: ${songAlbum}`);
            console.log(`============================================`);
            let dataLog = `Artists(s):  ${songArtists} - Song name: ${songName} - Song preview: ${songPreview} - Song album: ${songAlbum}`
            callback(userSearch, dataLog)
          })
      } else {
        data.forEach((song) => {
          let songArtists = song.album.artists[0].name;
          let songName = song.name;
          let songPreview = song.preview_url ? song.preview_url : "preview not available";
          let songAlbum = song.album.name
          console.log('')
          console.log(`Artist(s): ${songArtists}`);
          console.log(`Song name: ${songName}`);
          console.log(`Song preview: ${songPreview}`);
          console.log(`Song album: ${songAlbum}`);
          console.log(`============================================`);
          let dataLog = `Artists(s):  ${songArtists} - Song name: ${songName} - Song preview: ${songPreview} - Song album: ${songAlbum}`
          callback(userSearch, dataLog)
        })
      }
    })
    .catch(function (err) {
      console.log('Error:', err);
    });
};

const handleMovie = (userSearch, callback) => {
  let url = `https://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`;

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
      let logData = (`Movie title: ${movieTitle} - Movie year: ${movieYear} - IMDB rating: ${movieImdbRating} - Rotten Tomatoes rating: ${movieRottenTomatoesRating} - Country Produced: ${movieProductionCountry} - Language ${movieLanguage} - Movie plot ${moviePlot} - Actors: ${movieActors}`);
      callback(userSearch, logData)
    }).catch(function (err) {
      console.log(`Cannot find movie called ${userSearch}.  Maybe you will enjoy this movie:`)
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
    handleSong(randomTextSong, handleLog);
  });
};

const handleLog = (userSearch, logData) => {
  let date = moment().format('MMMM Do YYYY, h:mm:ss a');
  let data = `Searched on: ${date} | User Search: ${userSearch} | ${logData}\n\n`
  fs.appendFile('./log.txt', data, 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
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

module.exports = {
  handleConcert: handleConcert,
  handleSong: handleSong,
  handleMovie: handleMovie,
  handleRandomText: handleRandomText,
  handleLog: handleLog,
  printLog: printLog,
  deleteLog: deleteLog
};
