require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
// Import the keys.js file
const keys = require('./keys');

// let spotify = new Spotify(keys.spotify); **** Need to require 'node-spotify-api'

// Spotify Key
const spotifyKey = keys.spotify.id
// Spotify Secrete
const spotifySecrete = keys.spotify.secret
// console.log(spotifyKey, spotifySecrete)


const handleConcert = (userSearch) => {
  let concertVenueName;
  let concertVenueCity;
  let concertVenueCountry;
  let concertDateFormat;
  let logData;

  console.log('handle concert invoked')
  let url = `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`;
  console.log('url', url);

  // Axios GET request
  axios.get(url)
    .then(function (response) {
      // console.log('response', response.data[1])
      let concertArray = response.data;
      console.log('concertArray', concertArray)

      if (concertArray.length === 0) {
        console.log(`${userSearch.toUpperCase()} currently not touring`)
      } else {
        // loop through concert data array
        // console.log(`${userSearch.toUpperCase()} will be appearing at:`)
        concertArray.forEach((data) => {
          concertVenueName = data.venue.name;
          concertVenueCity = data.venue.city;
          concertVenueCountry = data.venue.country;
          concertDateFormat = moment(data.datetime).format("dddd, MMMM Do YYYY, h:mm a");
          console.log(``)
          console.log(`Venue: ${concertVenueName}`);
          console.log(`Location: ${concertVenueCity}, ${concertVenueCountry}`);
          console.log(`Date: ${concertDateFormat}`);
          console.log(`============================================`);
          logData = `Venue: ${concertVenueName} - Location: ${concertVenueCity}, ${concertVenueCountry} - Date: ${concertDateFormat}\n`
          // console.log(logData)
        })
      }
    }).catch(function (error) {
      console.log('Error:', error);
      return console.log(`${userSearch} was not found.`)
    });
};

const handleSong = (userSearch) => {
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
        console.log('data.length equal 0.  Do something with "The Sign" by Ace of Base.', data)
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
      })
    })
    .catch(function (err) {
      console.log(err);
    });
};

const handleMovie = (userSearch) => {
  console.log('handle movie invoked')
  let url = `https://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`;
  console.log('url', url)

  axios.get(url)
    .then(function (response) {
      console.log('movie response', response.data)
      console.log('movie title', response.data.Title)
      console.log('movie year', response.data.Year)
      console.log('movie IMDB Rating', response.data.imdbRating)
      // console.log('movie Rotten Tomatoes Rating', response.data.Ratings[1]["Value"]);
      // console.log('movie Rotten Tomatoes Rating TEST Rating', response.data.Ratings);
      response.data.Ratings.forEach((rating) => {
        // console.log('rating', rating.Source)
        if (rating.Source === "Rotten Tomatoes") {
          console.log('Source Rating Value', rating.Value)
        }
      })
      console.log('movie country of production', response.data.Country)
      console.log('movie language', response.data.Language)
      console.log('movie plot', response.data.Plot)
      console.log('movie actors', response.data.Actors)
    });
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

const handleLog = (logData) => {
  console.log('invoke print log')
  let date = moment().format('MMMM Do YYYY, h:mm:ss a');
  let data = `Log at: ${date}: ${logData}\n`
  fs.appendFile('./log.txt', data, 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`Added to log: ${data}`);
    }
  })
}

module.exports = {
  handleConcert: handleConcert,
  handleSong: handleSong,
  handleMovie: handleMovie,
  handleRandomText: handleRandomText,
  handleLog: handleLog
};
