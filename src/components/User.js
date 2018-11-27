import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';

class User extends Component{
  constructor(props){
    super(props);
  }
  handleSignIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      //console.log(user.displayName);
    });
  }



  render(){

    return(
      <div>
      <ReactTooltip />
      {this.props.user === null ?
        <button type="button"
        className="btn btn-outline-success btn-lg btn-block"
        data-tip="Sign In"
        onClick ={() => this.handleSignIn()}>
          Guest
        </button>
        : <button type="button"
        className="btn btn-outline-success btn-lg btn-block"
        data-tip="Sign Out"
        onClick ={this.props.removeUser}>
          {this.props.user.displayName}
        </button>
      }
      </div>

    );
  }
}

export default User;
