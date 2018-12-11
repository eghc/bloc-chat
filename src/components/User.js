import React, {Component} from 'react';
import * as firebase from 'firebase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class User extends Component{
  handleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      //console.log(user.displayName);
    });
  }

  render(){
    const {user, removeUser} = this.props;

    return(
      <List>
      {user === null ?
        <ListItem button
        data-tip="Sign In"
        onClick ={this.handleSignIn}>
          <ListItemText primary="Guest" />
        </ListItem>
        : <ListItem button
        data-tip="Sign Out"
        onClick ={removeUser}>
          <ListItemText primary={user.displayName} />
        </ListItem>
      }
      </List>

    );
  }
}



export default User;
