import React from 'react';


class TodoListHeader extends React.Component {


  state = {
    error: false,
    title: "",
  };


  onAddTaskClick = () => {
    let newTitle = this.state.title;
    this.setState({title: ""});
    if (newTitle === "") {
      this.setState({error: true})
    } else {
      this.setState({error: false})
    }
    this.props.addTask(newTitle)
  };

  onTitleChanged = (e) => {
    this.setState({
      error: false,
      title: e.currentTarget.value
    })
  };

  onKeyPress = (e) => {
  this.setState({eror: false});
    if(e.key === "Enter") {
      this.onAddTaskClick()
    }

  };


  render = () => {

    let classNameInput = this.state.error ? "error" : "";

    return (
      <div className="todoList-header">
        <h3 className="todoList-header__title">What to Learn</h3>
        <div className="todoList-newTaskForm">
          <input
                 type="text"
                 placeholder="New task name"
                 className={classNameInput}
                 onChange={this.onTitleChanged}
                 onKeyPress={this.onKeyPress}
                 value={this.state.title}
          />
          <button onClick={this.onAddTaskClick}>Add</button>
        </div>
      </div>
    );
  }
}

export default TodoListHeader;

