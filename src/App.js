import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';



var config = {
  apiKey: "AIzaSyCBeSwO1FDo9dkzU-1VdxnXWi0XspQps7c",
  authDomain: "bloc-chat-579c2.firebaseapp.com",
  databaseURL: "https://bloc-chat-579c2.firebaseio.com",
  projectId: "bloc-chat-579c2",
  storageBucket: "bloc-chat-579c2.appspot.com",
  messagingSenderId: "465863862380"
};
firebase.initializeApp(config);

class App extends Component {
  // Initialize Firebase
  //console.log(this.firebase.database());


  render() {
    return (
        <div className="container-full">
          <div className = "row">
            <div className ="col-md-2" id="nav">
            <h2>Bloc Chat</h2>
            < RoomList firebase={firebase}/>
            </div>
            <div className ="col-md-10 bg-light" id="chat">
            testing!
            </div>
          </div>
        </div>

    );
  }
}

export default App;
