# Liri Node Application

## Liri is a clone of Apple’s Siri virtual assistant you can use in your terminal.  Enter a command in your terminal and Liri will return the results of your search.


Use Liri to search the following topics: 
- concerts
- songs
- movies

For example: `node liri movie-this Star Wars`  
![Image](https://user-images.githubusercontent.com/16404148/56218424-f5347d80-6032-11e9-9e9f-f3713f78f0ad.png)

### Install Liri
1. Clone the liri-node-app repository: [link to liri-node-app repository](https://github.com/fcarlone/liri-node-app/)  
2. Install the packages associated with this application  
`npm install`  
3. Open your terminal and type a command to Liri 

  
### Search Commands:  
To search for concerts, use the command:  
`node liri concert-this [ARTIST/BAND NAME]`  
Example: ![Image sytle="height 10px"](https://user-images.githubusercontent.com/16404148/56219826-62e1a900-6035-11e9-8f2b-9912d13838cc.png)

Example: 
<img src="https://user-images.githubusercontent.com/16404148/56219826-62e1a900-6035-11e9-8f2b-9912d13838cc.png" style="height:5px">

To search for a song, use the command:  
`node liri spotify-this-song [SONG NAME]`

To search for a movie, use the command:  
`node liri movie-this [MOVIE NAME]`

  
### View and Delete Your Search Log:
You can view your previous searches by using the command:  
`node liri print-log`  
  
To erase the searches log, use the command:  
`node liri delete-log`  


### Instructions:  
You can view the instructions in the terminal by using the command:  
`node liri instructions`  

