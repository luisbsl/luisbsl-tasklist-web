import React from 'react'
import { Paper, List } from '@material-ui/core';
import TaskListItem from './TaskListItem'

const TaskList = props => {
  return (
    props.tasks.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: 'scroll' }}>
          {props.tasks.map((task, idx) => (
            <TaskListItem
              {...task}
              key={`task.${idx}`}
              divider={idx !== props.tasks.length - 1}
              onButtonCheckClick={() => props.onButtonCheckClick(task)}
              onButtonEditClick={() => props.onButtonEditClick(task)}
              onButtonDeleteClick={() => props.onButtonDeleteClick(task)}
              concluida={task.conclusao}
            />
          ))}
        </List>
      </Paper>
    )
  )
}

export default TaskList