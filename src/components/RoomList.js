import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state ={
      rooms: [],
      roomsRef: []
    };
    this.state.roomsRef = this.props.firebase.database().ref('rooms');

  }
  componentDidMount() {
    this.state.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });

  }

  render(){
    //console.log(this.state.rooms);
    return(
      <ul className="nav navbar-nav">
        {this.state.rooms.map((room, index) =>
          <li key={index}>Room {room.key}</li>
        )}
      </ul>
    );
  }
}

export default RoomList;
