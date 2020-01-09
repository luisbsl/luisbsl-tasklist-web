import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Grid, TextField, Button } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TaskEditModal = props => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.openTaskEditModal}
        onClose={props.onCloseTaskEditModal}
      >
        <Paper style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Editar tarefa</h2>
          <Grid container>
            <Grid xs={12} md={12} item>
              <TextField
                value={props.task.titulo}
                onChange={props.onTaskTituloChange}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={12} item>
              <TextField
                multiline
                rowsMax="4"
                value={props.task.descricao}
                onChange={props.onTaskDescricaoChange}
                fullWidth
              />
            </Grid>
            <Grid xs={2} md={1} item style={{ marginTop: 20 }} >
              <Button
                fullWidth
                color="secondary"
                variant="outlined"
                onClick={props.onTaskEditSave}
              >
                Salvar
                </Button>
            </Grid>
          </Grid>
        </Paper>
        {/* <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Editar tarefa</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div> */}
      </Modal>
    </div>
  );
}

export default TaskEditModal