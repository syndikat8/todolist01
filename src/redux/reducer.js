import api from "../api/api";

export const ADD_TODOLIST = "todolist/reducer/ADD_TODOLIST"
export const ADD_TASK = "todolist/reducer/ADD_TASK"
export const SET_TASKS = "todolist/reducer/SET_TASKS"
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"
export const SET_TODOLIST = "todolist/reducer/SET_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "todolist/reducer/CHANGE_TODOLIST_TITLE"


const initialState = {
  todolists: [
    // {
    //   id: 1, title: "Gym", tasks: [
    //     {id: 0, title: "JS", isDone: true, priority: "low"},
    //   ]
    // },
    // {
    //   id: 2, title: "IT", tasks: [
    //     {id: 0, title: "JS", isDone: true, priority: "low"},
    //     {id: 1, title: "CSS", isDone: true, priority: "low"},
    //   ]
    // },
    // {
    //   id: 3, title: "Every Day", tasks: [
    //     {id: 3, title: "React", isDone: false, priority: "low"},
    //     {id: 4, title: "Sass", isDone: false, priority: "low"},
    //     {id: 5, title: "Redux", isDone: false, priority: "low"}
    //   ]
    // },
    // {
    //   id: 4, title: "Boss", tasks: [
    //     {id: 0, title: "JS", isDone: true, priority: "low"},
    //     {id: 1, title: "CSS", isDone: true, priority: "low"},
    //
    //   ]
    // },
  ]
}

const reducer = (state = initialState, action) => {
  let newTasks
  switch (action.type) {
    case SET_TODOLIST:
      return {
        ...state,
        todolists: action.todolists.map(tl => ({...tl, tasks: []}))
      }
    case SET_TASKS:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id !== action.todolistId) return tl;
          else return {
            ...tl,
            tasks: action.tasks
          }
        })
      }
    case ADD_TODOLIST:
      return {
        ...state,
        todolists: [{...action.newTodolist, tasks: []}, ...state.todolists]
      }
    case  ADD_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {...tl, tasks: [...tl.tasks, action.newTask]}
          } else {
            return tl
          }
        })
      }
    case CHANGE_TODOLIST_TITLE:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
            if (tl.id === action.todolistId) {
              return {
                ...tl,
                title: action.newTitle,
                tasks: []
              }
            } else {
              return tl
            }
          }
        )
      }
    case  CHANGE_TASK:
      newTasks = state.todolists.map(todo => {
        if (todo.id !== action.todolistId) {
          return todo
        } else {
          return {
            ...todo, tasks: [...todo.tasks.map(task => {
              if (task.id !== action.taskId) {
                return task
              } else {
                return {...task, ...action.obj}
              }
            })]
          }
        }
      })
      return {...state, todolists: newTasks}
    case DELETE_TODOLIST:
      return {...state, todolists: state.todolists.filter(el => el.id !== action.todolistId)}
    case DELETE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id !== action.todolistId) return tl;
          else return {
            ...tl,
            tasks: tl.tasks.filter(t => t.id !== action.taskId)
          }

        })
      }
  }
  return state;
}

export const setTodoList = (todolists) => ({type: SET_TODOLIST, todolists})
export const addTodoList = (newTodolist) => ({type: ADD_TODOLIST, newTodolist})
export const deleteTodolist = (todolistId) => ({type: DELETE_TODOLIST, todolistId})
export const changeTodolistTitle = (todolistId,newTitle) => ({type: CHANGE_TODOLIST_TITLE, newTitle, todolistId})

export const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId})
export const addTask = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId})
export const deleteTask = (taskId, todolistId) => ({type: DELETE_TASK, taskId, todolistId})
export const changeTask = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj})


export const getTodolist = () => (dispatch) => {
  api.getTodolist()
    .then(res => {
      dispatch(setTodoList(res.data));
    });
}
export const addTodolist = (title) => (dispatch) => {
  api.createTodolist(title)
    .then(response => {
    if (response.data.resultCode === 0) {
      dispatch(addTodoList(response.data.data.item))
    }
  } )
}
export const deleteTodo = (todolistId) => (dispatch) => {
  api.deleteTodo(todolistId)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(deleteTodolist(todolistId))
      }
    })
}
export const updateTodolistTitle = (taskId, newTitle) => (dispatch) => {
  api.updateTodolistTitle(taskId,newTitle)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(changeTodolistTitle(newTitle, taskId))
      }
    })
}

export const getTasks = (taskId) => (dispatch) => {
  api.getTasks(taskId)
    .then(response => {
      dispatch(setTasks(response.data.items, taskId))
    })
}
export const addTsk = (newTitle,taskId) => (dispatch) => {
  api.createTask(taskId, newTitle)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(addTask(response.data.data.item, taskId))
      }
    })
}
export const deletaTask = (todolistId,taskId) => (dispatch) => {
  api.deleteTask(todolistId, taskId)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(deleteTask(taskId, todolistId))
      }
    })
}
export const changeStatus = (todolistId, task, status) => (dispatch) => {
  api.changeStatus(todolistId, task, status)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(changeTask(todolistId, task.id, {status}))
      }
    })
}
export const changeTitle = (taskId, task, newTitle) => (dispatch) => {
  debugger
  api.changeTitle(taskId, task, newTitle)
    .then(response => {
      debugger
      if (response.data.resultCode === 0) {
        dispatch(changeTask(taskId, task.id, {title: newTitle}))
      }
    })
}

export default reducer;