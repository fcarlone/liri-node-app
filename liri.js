const methods = require('./liri-methods.js');
const instructions = require('./instructions.js')
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
    methods.handleConcert(userSearch, methods.handleLog);
    break;
  case 'spotify-this-song':
    methods.handleSong(userSearch);
    break;
  case 'movie-this':
    methods.handleMovie(userSearch, methods.handleLog);
    break;
  case 'do-what-it-says':
    methods.handleRandomText();
    break;
  // case 'print-log':
  //   **Print Log method**
  //   break;
  default:
    console.log("Sorry.  Incorrect command.")
}

