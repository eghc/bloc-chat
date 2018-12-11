import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

class RoomList extends Component {

  render(){
    //console.log(this.state.rooms);

    return(
      <List>
          {this.props.rooms.map((room, index) =>
            <ListItem button  key={index}  >
              <Button onClick={this.props.selectRoom} value={index}>
              <ListItemText value={index} primary={room.name}/>
              </Button>
            </ListItem>
          )}
      </List>
    );
  }
}


export default RoomList;
