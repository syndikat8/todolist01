import React from 'react';


class TodoListTitle extends React.Component {

  state = {
    editeMode: false,
    title: this.props.title
  }

  onTitleChange = (e) => {
    this.setState({title: e.currentTarget.value})
  }

  activateEditMode = () => {
    this.setState({editeMode: true})
  }

  deActivateEditMode = () => {
    this.props.changeTodolistTitle(this.state.title)
    this.setState({editeMode: false})
  }
  render = () => {

    return <h3 className="todoList-header__title">

      {this.state.editeMode
        ? <input
          value={this.state.title}
          type="text"
          autoFocus={true}
          onChange={this.onTitleChange}
          onBlur={this.deActivateEditMode}
        />
        : <span onClick={this.activateEditMode}>{this.state.title}</span>
      }
      <button onClick={this.props.deleteTodolist}>Delete</button>
    </h3>
  }
}

export default TodoListTitle;

