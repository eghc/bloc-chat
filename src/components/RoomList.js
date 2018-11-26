import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    //console.log(this.state.rooms);
    return(
      <div className="nav">
        <ul className="nav navbar-nav">
          {this.props.rooms.map((room, index) =>
            <li key={index} onClick={this.props.selectRoom} value={index}>{room.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
