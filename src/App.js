import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
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
                <div class="newsDetail"></div>
              </div>
              <div class="newsArticle"></div>
            </div>
          </div>
          <div class="topArtistWrapper">
            <div class="titleWrapper" id="artistsTitleWrapper"><h3 class="favoriteArtists">Artists</h3></div>
            <div class="list-group">
              <div class="list-group-item"></div>
              <div class="list-group-item"></div>
              <div class="list-group-item"></div>
              <div class="list-group-item"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
