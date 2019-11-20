import React, { Component } from "react";
import logo from "./logo.svg";
import * as $ from "jquery";
import "./App.css";

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "52cc7d2e170d4b14a74b474ccca03428";
const redirectUri = "http://localhost:3000/callback";
const scopes = [
  "user-top-read",
];





class App extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      artists: []
    }
    this.getTopArtists = this.getTopArtists.bind(this);
  };
  componentDidMount() {
    // Set token
    let _token = this.getUrlVars()["access_token"];
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
    
    this.getTopArtists(_token);
  }
  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[#&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  getTopArtists(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log(data);
        var artistsArr = data.items;
        var artistsFinalArr = []
        for (var i = 0; i < artistsArr.length; i++){
          var artistImage = artistsArr[i]["images"][0]["url"];
          var artistName = artistsArr[i]["name"];
          artistsFinalArr.push({image: artistImage, name: artistName});
          if (artistsFinalArr.length == artistsArr.length){
            this.setState({
              artists: artistsFinalArr
            });
          }
          
        }
      }
    });
  }


  render() {
    
    return (
      <div className="App">
        {!this.state.token && (
          <div class="modal" id="rankings-modal">
            <div class="modal-box">
              <div class="modal-header">
                  <h1 class="logo">News<span>ic</span></h1>
              </div>
            <div class="modal-body">
              <a className="login-link"
              href={`https://accounts.spotify.com/authorize?client_id=52cc7d2e170d4b14a74b474ccca03428&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-top-read&response_type=token&show_dialog=true`}>
                <div class="login">Connect With Spotify</div>
              </a>
            </div>
          </div>
        </div>
      )}
        
        <div class="navigation">
		      <div><h3 class="logo">News<span>ic</span></h3></div>
	      </div>
        <div class="container">
          <div class="newsFeedWrapper">
            <div class="titleWrapper"><h3>News Feed</h3></div>
            <div class="newsContent">
              <div class="spacer"></div>
              <div class="newsArticle">
                <img class="newsImage" src="http://via.placeholder.com/640x360"/>
                <div class="newsDetail">
                  <a>NY Times</a>
                  <h2>Title title title title title</h2>
                  <p>Kanye West</p>
                </div>
              </div>
              <div class="newsArticle"></div>
            </div>
          </div>
          <div class="topArtistWrapper">
            <div class="titleWrapper" id="artistsTitleWrapper"><h3 class="favoriteArtists">Favorite Artists</h3></div>
            <div class="list-group">
              {this.state.artists.map(function(item, index){
                return <div className="list-group-item"><img class="artistImage" src={item.image}/><h4>{item.name}</h4></div>;
              })}
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
