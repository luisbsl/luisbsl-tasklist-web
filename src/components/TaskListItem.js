import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@material-ui/icons'

const TodoListItem = props => (
  <ListItem divider={props.divider}>
    <ListItemText primary={funcTexto(props)} secondary={props.descricao} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Concluir" onClick={props.onButtonCheckClick}>
        <CheckOutlined color={props.conclusao ? 'primary' : 'error'} />
      </IconButton>
      <IconButton aria-label="Editar" onClick={props.onButtonEditClick}>
        <EditOutlined />
      </IconButton>
      <IconButton aria-label="Deletar" onClick={props.onButtonDeleteClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

const formatarData = (dtCriacao) => {
  var data = new Date(dtCriacao),
    dia = data.getDate().toString(),
    diaF = (dia.length === 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = (mes.length === 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

const funcTexto = (task) => {
  if (task.conclusao) {
    return <p style={{ textDecoration: 'line-through' }} >{task.titulo} ({formatarData(task.dtCriacao)})</p>
  }
  else {
    return <p>{task.titulo} (<span style={{ fontWeight: "bold" }}>{formatarData(task.dtCriacao)}</span>)</p>
  }
}

export default TodoListItem