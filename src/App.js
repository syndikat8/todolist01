import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter/TodoListFooter";


class App extends React.Component {

  state = {
    tasks: [
      {title: "JS", isDone: true, priority: "low"},
      {title: "CSS", isDone: true, priority: "low"},
      {title: "HTML", isDone: true, priority: "low"},
      {title: "React", isDone: false, priority: "low"},
      {title: "Sass", isDone: false, priority: "low"},
      {title: "Redux", isDone: false, priority: "low"}
    ],
    filterValue: "Completed"
  };


  addTask = (newTitle) => {
    let newTask = {
      title: newTitle,
      isDone: true,
      priority: "low"
    };
    let newTasks = [...this.state.tasks, newTask];
    this.setState({
      tasks: newTasks
    })
  };


  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    })
  };

  changeStatus = (task, isDone) => {
    let newTasks = this.state.tasks.map(t => {
      if (t !== task) {
        return t;
      } else {
        return {...t, isDone: isDone}
      }
    });
    this.setState({
      tasks: newTasks
    })
  };

  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader addTask={this.addTask}/>
          <TodoListTasks
            changeStatus={this.changeStatus}
            tasks={this.state.tasks.filter(t => {
              switch (this.state.filterValue) {
                case "All": return true;
                case "Completed": return t.isDone;
                case "Active": return !t.isDone;
              }})}/>
          <TodoListFooter filterValue={this.state.filterValue}
                          changeFilter={this.changeFilter}
          />
        </div>
      </div>
    );
  }
}

export default App;

