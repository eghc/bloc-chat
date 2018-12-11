import React, {Component} from 'react';
import * as firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input:{
    width: '70%'
  }
})

class SendMsg extends Component{
  constructor(props){
    super(props);
    this.state = {
      msg: ""
    }
  }

  handleChange(e){
    this.setState({msg: e.currentTarget.value});
  }

  render(){
    const { classes } = this.props;

    return(
      <AppBar className={classes.appBar} color="inherit" >
      <Toolbar position="fixed" color="inherit"  className={classes.toolbar}>
      <div className={classes.grow} />
        <TextField
          id="outlined-with-placeholder"
          label="Send a message"
          defaultValue={this.props.placeholder}
          margin="normal"
          variant="outlined"
          onChange={(e)=>this.handleChange(e)}
          className={classes.input}
        />
        <Button onClick = {this.props.sendMessage} value={this.state.msg}>
        Send
        </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(SendMsg);
