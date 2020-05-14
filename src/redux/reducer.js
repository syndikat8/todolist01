export const ADD_TODOLIST = "todolist/reducer/ADD_TODOLIST"
export const ADD_TASK = "todolist/reducer/ADD_TASK"
export const SET_TASKS = "todolist/reducer/SET_TASKS"
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"
export const SET_TODOLIST = "todolist/reducer/SET_TODOLIST"


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
    case  CHANGE_TASK:
      newTasks = state.todolists.map(todo => {
        if (todo.id !== action.todolistId) {
          return todo
        } else {
          return {
            ...todo, tasks: [...todo.tasks.map(task => {
              if (task.id != action.taskId) {
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
      return {...state, todolists: state.todolists.filter(el => el.id != action.todolistId)}
    case DELETE_TASK:
      return {
        ...state,
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


export const setTodoListAC = (todolists) => ({type: SET_TODOLIST, todolists})
export const addTodoListAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist})
export const addTaskAC = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId})
export const setTasksAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId})
export const changeTaskAC = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj})
export const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId})
export const deleteTaskAC = (taskId, todolistId) => ({type: DELETE_TASK, taskId, todolistId})


export default reducer;