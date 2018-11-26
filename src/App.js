import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import CreateRoom from './components/CreateRoom';
import MessageList from './components/MessageList';

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
  //.log(this.firebase.database());
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      roomsRef: [],
      currRoom: null,
      newRoom: false

    };
    this.state.roomsRef = firebase.database().ref('rooms');
  }

  createRoomAlert(){
    this.setState({newRoom: true});
    this.setState({currRoom:null});
    //console.log(this.state.newRoom);
  }

  doneCreatingRoom(e){
    e.preventDefault();
    //console.log(e.target.name.value);
    this.setState({newRoom: false});
    this.state.roomsRef.push({
      name: e.target.name.value
    });
  }

  selectRoom(e){
    this.setState({newRoom: false});
    const index = e.target.value;
    //this.setState({viewRoom: true});
    this.setState({currRoom: this.state.rooms[index]});
  }

  componentDidMount() {
    this.state.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }


  render() {
    let content;

    if(this.state.newRoom){
      content = <CreateRoom done={(e) => this.doneCreatingRoom(e)}/>;
    }
    else if(this.state.currRoom != null){
      content = <MessageList firebase={firebase} currRoom={this.state.currRoom}/>;
    }

    return (
        <div className="container-full" >
          <div className = "row">
            <div className ="col-md-3" id="nav">
            <h2>Bloc Chat</h2>
            <button onClick={() => this.createRoomAlert()}>New Room</button>
            < RoomList rooms={this.state.rooms} selectRoom={(e)=>this.selectRoom(e)} />
            </div>
            <div className ="col-md-9 bg-light" id="chat">
              {content}
            </div>
          </div>
        </div>

    );
  }
}

export default App;
