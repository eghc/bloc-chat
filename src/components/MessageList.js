import React, {Component} from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state ={
      messages: [],
      messagesRef: [],
      stopUpdate: false
    }
    this.state.messagesRef = this.props.firebase.database().ref('messages');
  }

  resetMessages(){
    this.setState({messages:[]});
  }

  componentDidMount() {
    this.state.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        if(message.roomId == this.props.currRoom.key){
          this.setState({ messages: this.state.messages.concat(message) });
        }
      });
  }
  componentDidUpdate(prevProps){
    //console.log(this.props.)
    if(this.props.currRoom.key !== prevProps.currRoom.key){
      this.resetMessages();

      let arr = []
      this.state.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          if(message.roomId == this.props.currRoom.key){
            arr.push(message);
          }
        });
      this.setState({messages: arr});
    }
  }

  render(){
    return(
      <div>
        <h1>{this.props.currRoom.name}</h1>
        <table>
          {this.state.messages.map((message, index) =>
            <tr key={index}>
              <td className="message">
              <h4 >{message.username}</h4>
              {message.content}
              </td>
              <td><i> {message.sentAt}</i></td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default MessageList;
