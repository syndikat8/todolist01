import {createStore} from "redux";

const initialState = {
  todolists: [
    {
      id: 1, title: "Gym", tasks: [
        {id: 0, title: "JS", isDone: true, priority: "low"},
      ]
    },
    {
      id: 2, title: "IT", tasks: [
        {id: 0, title: "JS", isDone: true, priority: "low"},
        {id: 1, title: "CSS", isDone: true, priority: "low"},
      ]
    },
    {
      id: 3, title: "Every Day", tasks: [
        {id: 3, title: "React", isDone: false, priority: "low"},
        {id: 4, title: "Sass", isDone: false, priority: "low"},
        {id: 5, title: "Redux", isDone: false, priority: "low"}
      ]
    },
    {
      id: 4, title: "Boss", tasks: [
        {id: 0, title: "JS", isDone: true, priority: "low"},
        {id: 1, title: "CSS", isDone: true, priority: "low"},

      ]
    },
  ]
}


const reducer = (state = initialState, action) => {
  let newTasks
  switch (action.type) {
    case "ADD-TODOLIST":
      return {...state, todolists: [...state.todolists, action.newTodolist]}
    case  "ADD-TASK":
       newTasks = state.todolists.map(todo => {
        if (todo.id !== action.todolistId) {
          return todo
        } else {
          return {...todo, tasks: [...todo.tasks, action.newTask]}
        }
      })
      return {...state, todolists: newTasks}
    case  "CHANGE-TASK":
      newTasks = state.todolists.map(todo => {
        if (todo.id !== action.todolistId) {
          return todo
        } else {
          return {...todo, tasks: [...todo.tasks.map(task => {
            if (task.id != action.taskId){
              return task
            } else {
              return  {...task, ...action.obj}
            }
            })]}
        }
      })
      return {...state, todolists: newTasks}
    case "DELETE-TODOLISTID":
      return {...state, todolists: state.todolists.filter(el => el.id != action.todolistId)}
    case "DELETE-TASK":
      return {...state,
        todolists: state.todolists.map(tl => {
          if (tl.id != action.todolistId) return tl;
          else return {
            ...tl,
            tasks: tl.tasks.filter(t => t.id != action.taskId)
          }

        })
      }
  }
  return state;
}

const store = createStore(reducer);
export default store;