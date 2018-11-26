import React, {Component} from 'react';

class CreateRoom extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="card border-success mb-3" >
        <div className="card-body">
          <h4 className="card-title">Create a New Room</h4>
          <form onSubmit={this.props.done}>
            Name: <input type="text" name="name" ></input>
            <input type="submit" value="Done"/>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateRoom;
