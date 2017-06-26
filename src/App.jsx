import React, { Component } from 'react';
import './App.css';
import  Profile from './Profile';
import  Gallery from './Gallery';
import {FormGroup, FormControl,InputGroup,Glyphicon} from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query:'',
      artist: null,
      tracks: []
    }
  }
 
 searchArtist(){
   console.log("this.state",this.state);
   const BASE_URL = 'https://api.spotify.com/v1/search?';
   let FETCH_URL = BASE_URL + 'q=' + this.state.query
                    + '&type=artist&limit=1';
   const ALBUM_URL = 'https://api.spotify.com/v1/artists';
   var myHeaders = new Headers();
   myHeaders.append("Authorization", "Bearer BQDQQ4TpmMLLEfwAh5ipfCh1B_IW0cfzU5XiONe4rBCsTKa3uEptBnVFrEe2nrhRGGuybKvGQCoqGOS1QvC1aZfx6L_GJV_dj5_8hrxMOqNrERJQeGkKGxMN7VZSguTfngj2pX_3c5CrRODzAuTmMGT2qQag");
   fetch(FETCH_URL, {
     method: 'GET',
     headers: myHeaders
   })
  .then(response => response.json())
  .then (json => {
    const artist = json.artists.items[0];
    this.setState({artist});
    FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
    fetch(FETCH_URL, {
     method: 'GET',
     headers: myHeaders
   })
   .then(response => response.json())
   .then (json => {
     const { tracks } = json;
     this.setState({tracks});
  })
  });
 }

  render() {
    return (
      <div className="App">
        <div className="App-title" >
         Music Master
        </div>
        <FormGroup>
          <InputGroup>  
            <FormControl
             type="text"
             placeholder="Search for an Artist"
             value={this.state.query}
             onChange={event=>{this.setState({query: event.target.value})}}
             onKeyPress = {event=>{
                  if (event.key === 'Enter')
                    this.searchArtist();
             }}
            />
            <InputGroup.Addon onClick={()=>this.searchArtist()}>
               <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup> 
         {
            this.state.artist !== null
            ?
            <div>
            <Profile
              artist={this.state.artist}
            />
            <div className="Gallery"> 
             <Gallery
                tracks={this.state.tracks}
              />
            </div>  
            </div>
            : <div></div>
         }
      </div>
    );
  }
}

export default App;
