import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onCloseClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.question}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCloseClick} color="primary">
            Não
          </Button>
          <Button onClick={props.onYesClick} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog