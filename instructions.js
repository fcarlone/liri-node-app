const instructions = () => {
  console.log('')
  console.log('Use Liri to search the following topics:\nconcerts\nsongs\nmovies\n')
  console.log('For example: node liri movie-this Star Wars')
  console.log('\nTo search for concerts, use the command:\nnode liri concert-this [ARTIST NAME]')
  console.log('\nTo search for a song, use the command:\nnode liri spotify-this-song [SONG NAME]')
  console.log('\nTo search for a movie, use the command:\nnode liri movie-this [MOVIE NAME]')
  console.log('\nYou can view your previous searches by using the command:\nnode liri print-log')
  console.log('\nYou can delete your previous searches log by using the command:\nnode liri delete-log')
};

module.exports = {
  instructions: instructions
}
