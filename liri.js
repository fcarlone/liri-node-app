const methods = require('./liri-methods.js');
const instructions = require('./instructions.js')
// Store user input
let userInput = process.argv;
userInput.splice(0, 2)
const userCommand = userInput[0];
const userSearch = userInput.slice(1).join(' ');

// Switch statement for user commands
switch (userCommand) {
  case 'concert-this':
    methods.handleConcert(userSearch, methods.handleLog);
    break;
  case 'spotify-this-song':
    methods.handleSong(userSearch, methods.handleLog);
    break;
  case 'movie-this':
    methods.handleMovie(userSearch, methods.handleLog);
    break;
  case 'do-what-it-says':
    methods.handleRandomText();
    break;
  case 'print-log':
    methods.printLog();
    break;
  case 'delete-log':
    methods.deleteLog();
    break;
  case 'instructions':
    instructions.instructions();
    break;
  default:
    console.log("Incorrect command.  Type 'node liri instructions' for a list of available commands.")
}

