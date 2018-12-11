import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CreateRoom extends Component {
  state = {
    open:true,
    name: ""
  };

  handleChange(e){
    this.setState({name: e.target.value});
  }

  render(){
    return(
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.props.done}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add A Room</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              defaultValue=""
              onChange ={(e) => this.handleChange(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.done} color="primary" value="">
              Cancel
            </Button>
            <Button onClick={this.props.done} color="primary" value={this.state.name}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );
  }
}

export default CreateRoom;
