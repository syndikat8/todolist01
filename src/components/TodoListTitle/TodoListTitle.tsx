import React, {ChangeEvent} from 'react';

type StateType = {
  editeMode: boolean
  title: string
}

type OnPropsType = {
  changeTodolistTitle: (newText: string)=> void
  deleteTodolist: ()=> void
  title: string
}

class TodoListTitle extends React.Component<OnPropsType,StateType> {

  state: StateType = {
    editeMode: false,
    title: this.props.title
  }

  onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

