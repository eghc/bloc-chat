import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    //console.log(this.state.rooms);
    return(
        <ul className="nav navbar-nav">
          {this.props.rooms.map((room, index) =>
            <li key={index}>{room.name}</li>
          )}
        </ul>
    );
  }
}

export default RoomList;
