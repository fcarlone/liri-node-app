// Require and configure dotenv
require('dotenv').config();
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

// Store user input
let userInput = process.argv;
userInput.splice(0, 2)
// console.log('userInput', userInput)
const userCommand = userInput[0];
const userSearch = userInput.slice(1).join(' ');
console.log(userCommand);
console.log(userSearch);


// Switch statement for user commands
switch (userCommand) {
  case 'concert-this':
    handleConcert();
    break;
  case 'spotify-this-song':
    handleSong();
    break;
  case 'movie-this':
    break;
  case 'do-what-it-says':
    break;
  default:
    console.log("Sorry.  Incorrect command.")
}

function handleConcert() {
  console.log('handle concert invoked')
  let url = `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`;
  console.log('url', url)

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
          let concertVenueName = data.venue.name;
          let concertVenueCity = data.venue.city;
          let concertVenueCountry = data.venue.country;
          let concertDateFormat = moment(data.datetime).format("dddd, MMMM Do YYYY, h:mm a");
          console.log(``)
          console.log(`Venue: ${concertVenueName}`)
          console.log(`Location: ${concertVenueCity}, ${concertVenueCountry}`)
          console.log(`Date: ${concertDateFormat}`)
          console.log(`============================================`)
        })
      }
    }).catch(function (error) {
      console.log('Error:', error);
      return console.log(`${userSearch} was not found.`)
    });
}

function handleSong() {
  console.log('handle song function invoked')
  // Spotify usage with Promises
  let spotify = new Spotify({
    id: '36a4f0394ddb4cb18dd99fbf46bfdc50',
    secret: 'd5677fba7c694356beee03f63e6bd466'
  });

  spotify
    .search({ type: 'track', query: 'love will tear us apart', limit: 5 })
    .then(function (response) {
      console.log(response.tracks);
      console.log(JSON.stringify(response.tracks, null, 2))
    })
    .catch(function (err) {
      console.log(err);
    });
}
