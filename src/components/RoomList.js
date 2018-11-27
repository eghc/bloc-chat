import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    //console.log(this.state.rooms);
    return(
      <div>
        <ul className="nav nav-pills flex-column">
          {this.props.rooms.map((room, index) =>
            <li className="nav-item" key={index} >
            <button className="btn btn-outline-secondary btn-lg btn-block" onClick={this.props.selectRoom} value={index}>{room.name}</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
