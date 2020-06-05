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

    return (
      <div className="todoList-header-title">
        <div>
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
        </div>
        <div>
          <button className="delit" onClick={this.props.deleteTodolist}>X</button>
        </div>

      </div>
    )
  }
}

export default TodoListTitle;

