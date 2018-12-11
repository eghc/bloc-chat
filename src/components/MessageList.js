import React, {Component} from 'react';
import {Fragment} from 'react';
import * as firebase from 'firebase';
import SendMsg from './SendMsg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = theme => ({
  messageStyle:{
    paddingBottom: 60
  },
})

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      messagesRef:null,
      stopUpdate: false,
      placeholder: ""
    }
    this.state.messagesRef = firebase.database().ref('messages');
  }

  sendMessage(e){

    //e.preventDefault();
    let content = e.currentTarget.value;
    let username =this.props.user !== null ? this.props.user.displayName: "Guest";
    let sentAt = firebase.database.ServerValue.TIMESTAMP;
    // if(this.props.user !== null){
    //   newMsg.username = this.props.user.displayName;
    // }
    //this.setState({messages: this.state.messages.push(newMsg)});
    this.state.messagesRef.child(this.props.currRoom.key).push({
      content: content,
      username: username,
      sentAt: sentAt
    });

    this.setState({placeholder: ""});

  }

  componentDidMount() {
    let messages = [];
    //this.setState({messagesRef: this.state.messagesRef.child(this.props.currRoom.key)});
    this.state.messagesRef.child(this.props.currRoom.key).on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        //console.log(snapshot.val().sentAt);
        let time = new Date(snapshot.val().sentAt);
        message.sentAt = time.toString().split(" ").slice(1,5).join(" ");
        messages.push(message);
        this.setState({messages:messages});
      });
  }

  componentDidUpdate(prevProps){
    //console.log(this.props.)
    if(this.props.currRoom.key !== prevProps.currRoom.key){
      let messages = [];
      //this.setState({messagesRef: this.state.messagesRef.child(this.props.currRoom.key)});
      this.state.messagesRef.child(this.props.currRoom.key).on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          //console.log(snapshot.val().sentAt);
          let time = new Date(snapshot.val().sentAt);
          message.sentAt = time.toString().split(" ").slice(1,5).join(" ");
          messages.push(message);
          this.setState({messages:messages});
        });
      if(messages.length === 0){
        this.setState({messages:[]});
      }
    }
  }

  render(){
    const { classes } = this.props;
    //<Typography paragraph>
    return(
      <div>
      <CssBaseline />
      <List className={classes.messageStyle}>
          {this.state.messages.map((message, index) => (
            <Fragment key={index}>
              <ListItem>
                <ListItemText primary={message.username} secondary={message.content} />
                {message.sentAt}
              </ListItem>
            </Fragment>
          ))}

        </List>
          <SendMsg
          user={this.props.user}
          currRoom={this.props.currRoom}
          sendMessage={(e)=>this.sendMessage(e)}
          placeholder = {this.state.placeholder}
          />
        </div>


    );
  }
}

export default withStyles(styles)(MessageList);
