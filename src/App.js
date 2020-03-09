import React from 'react';
import './App.css';


import TodoListHeader from "./components/TodoListHeader/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter/TodoListFooter";


class App extends React.Component {
  tasks = [
    {title: "JS", isDone: true, priority: "low"},
    {title: "CSS", isDone: true, priority: "low"},
    {title: "HTML", isDone: true, priority: "low"},
    {title: "React", isDone: false, priority: "low"},
    {title: "Sass", isDone: false, priority: "low"},
    {title: "Redux", isDone: false, priority: "low"}
  ];

  filterValue ="Active";

  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader/>
          <TodoListTasks tasks={this.tasks}/>
          <TodoListFooter filterValue={this.filterValue}/>
        </div>
      </div>
    );
  }
}

export default App;

