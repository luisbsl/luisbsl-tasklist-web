import React from 'react'
import axios from 'axios'

import Container from '../components/Container'
import AddTask from '../components/AddTaks'
import AlertMessage from '../components/AlertMessage'
import AlertDialog from '../components/AlertDialog'
import TaskEditModal from '../components/TaskEditModal'

import TaskList from '../components/TaskList'

const taskURL = 'https://luisbsl-tasklist-back.herokuapp.com/tasks'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      titulo: '',
      openAlertMessage: false,
      openAlertDialog: false,
      openTaskEditModal: false,
      alertMessageText: '',
      alertDialogQuestion: '',
      alertDialogText: '',
      taskToDelete: {},
      taskToEdit: {}
    };

    this.atualizarNovoTitulo = this.atualizarNovoTitulo.bind(this)
    this.adicionarNotaTarefa = this.adicionarNotaTarefa.bind(this)
    this.verificarTeclaEnter = this.verificarTeclaEnter.bind(this)
    this.closeAlertMessage = this.closeAlertMessage.bind(this)

    this.onButtonCheckClick = this.onButtonCheckClick.bind(this)
    this.onButtonEditClick = this.onButtonEditClick.bind(this)
    this.onButtonDeleteClick = this.onButtonDeleteClick.bind(this)
    this.findAllTasks = this.findAllTasks.bind(this)

    this.closeAlertDialog = this.closeAlertDialog.bind(this)
    this.confirmDeleteTask = this.confirmDeleteTask.bind(this)

    this.onTaskTituloChange = this.onTaskTituloChange.bind(this)
    this.onTaskDescricaoChange = this.onTaskDescricaoChange.bind(this)

    this.onCloseTaskEditModal = this.onCloseTaskEditModal.bind(this)
    this.onTaskEditSave = this.onTaskEditSave.bind(this)
  }

  componentDidMount = () => {
    this.findAllTasks()
  }

  findAllTasks = () => {
    axios.get(taskURL)
      .then(res => {
        this.setState({ tasks: res.data })
      })
  }

  atualizarNovoTitulo = event => {
    this.setState({ titulo: event.target.value })
  }

  adicionarNotaTarefa = () => {
    if (this.state.titulo === '' || this.state.titulo === 'undefined') {
      this.setState({ openAlertMessage: true, alertMessageText: 'O título é obrigatório' })
    } else {
      this.setState({ titulo: '' })

      let task = {}
      task.status = 1
      task.titulo = this.state.titulo

      axios
        .post(taskURL,
          task)
        .then(res => {
          this.findAllTasks()
        })
        .catch(res => {
          console.error(res)
        })
    }

  }

  verificarTeclaEnter = event => {
    if (event.which === 13 || event.keyCode === 13) {
      console.log("Enter clicked")
      this.adicionarNotaTarefa()
    }
  }

  closeAlertMessage = () => {
    this.setState({ openAlertMessage: false, alertMessageText: '' })
  }

  onButtonAdicionarClick = titulo => {
    let task = {}
    task.status = 1
    task.titulo = titulo

    axios
      .post(taskURL,
        task)
      .then(res => {
        this.findAllTasks()
      })
      .catch(res => {
        console.error(res)
      })
  }

  onButtonCheckClick = task => {
    task.conclusao = !task.conclusao
    console.log(JSON.stringify(task))
    axios
      .put(taskURL,
        task)
      .then(res => {
        this.findAllTasks()
      })
      .catch(res => {
        console.error(res)
      })
  }

  onButtonEditClick = task => {
    task.edicao = true
    this.setState({ taskToEdit: task, openTaskEditModal: true })
  }

  onButtonDeleteClick = task => {
    this.setState({ openAlertDialog: true, taskToDelete: task, alertDialogQuestion: 'Tarefa: ' + task.titulo, alertDialogText: 'Tem certeza que deseja excluir a tarefa?' })
  }

  closeAlertDialog = () => {
    this.setState({ taskToDelete: {}, openAlertDialog: false, alertDialogQuestion: '', alertDialogText: '' })
  }

  confirmDeleteTask = () => {
    axios
      .delete(`${taskURL}/${this.state.taskToDelete.id}`)
      .then(res => {
        this.closeAlertDialog()
        this.findAllTasks()
      })
      .catch(res => {
        console.error(res)
      })
  }

  onTaskTituloChange = event => {
    let newTitle = event.target.value
    this.setState(prevState => ({
      taskToEdit: {
        ...prevState.taskToEdit,
        titulo: newTitle
      }
    }))
  }

  onTaskDescricaoChange = event => {
    let newDescription = event.target.value
    this.setState(prevState => ({
      taskToEdit: {
        ...prevState.taskToEdit,
        descricao: newDescription
      }
    }))
  }

  onCloseTaskEditModal = () => {
    this.setState({ taskToEdit: {}, openTaskEditModal: false })
  }

  onTaskEditSave = () => {
    axios
      .put(taskURL,
        this.state.taskToEdit)
      .then(res => {
        this.onCloseTaskEditModal()
        this.findAllTasks()
      })
      .catch(res => {
        console.error(res)
      })
  }

  render() {
    return (
      <Container>
        <AddTask
          inputValue={this.state.titulo}
          onInputChange={this.atualizarNovoTitulo}
          onInputKeyPress={this.verificarTeclaEnter}
          onButtonClick={this.adicionarNotaTarefa} />

        <TaskList
          tasks={this.state.tasks}
          onButtonCheckClick={this.onButtonCheckClick}
          onButtonEditClick={this.onButtonEditClick}
          onButtonDeleteClick={this.onButtonDeleteClick}
          onTaskCheck={this.onTaskCheck}
        />

        <AlertMessage
          open={this.state.openAlertMessage}
          text={this.state.alertMessageText}
          onCloseClick={this.closeAlertMessage} />

        <AlertDialog
          open={this.state.openAlertDialog}
          onCloseClick={this.closeAlertDialog}
          question={this.state.alertDialogQuestion}
          text={this.state.alertDialogText}
          onYesClick={this.confirmDeleteTask}
        />

        <TaskEditModal
          task={this.state.taskToEdit}
          openTaskEditModal={this.state.openTaskEditModal}
          onTaskTituloChange={this.onTaskTituloChange}
          onTaskDescricaoChange={this.onTaskDescricaoChange}
          onCloseTaskEditModal={this.onCloseTaskEditModal}
          onTaskEditSave={this.onTaskEditSave} />
      </Container>
    )
  }
}

export default Home