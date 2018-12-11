import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import CreateRoom from './components/CreateRoom';
import MessageList from './components/MessageList';
import User from './components/User';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

// <div className="container-full" >
//   <div className = "row">
//     <div className ="col-md-2" id="nav">
//     <h2>Bloc Chat</h2>
//     <User setUser={(e)=>this.setUser(e)} removeUser={()=>this.removeUser()} user={this.state.user}/>
//     <RoomList rooms={this.state.rooms} selectRoom={(e)=>this.selectRoom(e)} />
//     {this.state.user !== null ?
//       <button className="btn btn-outline-danger btn-lg btn-block" onClick={() => this.createRoomAlert()}>New Room</button>
//       : <p></p>
//     }
//     </div>
//     <div className ="col-md-10 bg-light" id="chat">
//       {content}
//     </div>
//   </div>
// </div>

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
});

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
      roomsRef: null,
      currRoom: null,
      newRoom: false,
      user: null,
      mobileOpen: false
    };
    this.state.roomsRef = firebase.database().ref('rooms');
  }

  handleDrawerToggle () {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  createRoomAlert(){
    this.setState({newRoom: true});
    this.setState({currRoom:null});
    //console.log(this.state.newRoom);
  }

  doneCreatingRoom(e){
    console.log(e.currentTarget.value);
    //console.log(e.target.name.value);
    this.setState({newRoom: false});
    if(e.currentTarget.value !== ""){
      this.state.roomsRef.push({
        name: e.currentTarget.value
      });
    }

  }

  selectRoom(e){
    this.setState({newRoom: false});
    const index = e.currentTarget.value;
    //this.setState({viewRoom: true});
    this.setState({currRoom: this.state.rooms[index]});
    console.log(e.currentTarget.value);
  }

  setUser(user){
    this.setState({user: user});
  }

  removeUser(){
    this.setState({user:null});
    firebase.auth().signOut();
    console.log("remove");
  }


  componentDidMount() {
    //let {rooms} = this.state;
    this.state.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      //rooms.push({...room});
      this.setState({rooms: this.state.rooms.concat(room)});
    });
    //console.log(rooms);
    //this.setState({rooms: rooms});
    //console.log(this.state.rooms);
  }

  handleTest(){
    console.log("test clicked!");
  }


  render() {
    const { classes, theme } = this.props;

    let content;
    if(this.state.newRoom){
      content = <CreateRoom done={(e) => this.doneCreatingRoom(e)}/>;
    }
    else if(this.state.currRoom != null){
      //content = <p>Test</p>;
      content = <MessageList user={this.state.user} currRoom={this.state.currRoom}/>;
    }

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <User setUser={(e)=>this.setUser(e)} removeUser={()=>this.removeUser()} user={this.state.user}/>
        <Divider />
          <RoomList rooms={this.state.rooms} selectRoom={(e)=>this.selectRoom(e)} />
          <Divider />
          <List>
            {this.state.user !== null ?
            <ListItem button onClick={() => this.createRoomAlert()}>
              <ListItemText primary="Add a Room" />
            </ListItem> :
            <p></p>
            }
        </List>
      <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

              {this.state.currRoom !== null?
                <Typography variant="h6" color="inherit">{this.state.currRoom.name.toUpperCase()}</Typography> :
                <Typography variant="h6" color="inherit">Bloc Chat</Typography>
              }

          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {content}
        </main>
      </div>
      );

  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
