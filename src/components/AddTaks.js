import React from 'react'
import { Paper, Grid, TextField, Button } from '@material-ui/core'

const AddTask = (props) => {
  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Título"
            value={props.inputValue}
            onChange={props.onInputChange}
            onKeyPress={props.onInputKeyPress}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={props.onButtonClick}
          >
            Adicionar
        </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AddTask