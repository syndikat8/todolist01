export const ADD_TODOLIST = "todolist/reducer/ADD_TODOLIST"
export const ADD_TASK = "todolist/reducer/ADD_TASK"
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"



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
    case ADD_TODOLIST:
      return {...state, todolists: [...state.todolists, action.newTodolist]}
    case  ADD_TASK:
      newTasks = state.todolists.map(todo => {
        if (todo.id !== action.todolistId) {
          return todo
        } else {
          return {...todo, tasks: [...todo.tasks, action.newTask]}
        }
      })
      return {...state, todolists: newTasks}
    case  CHANGE_TASK:
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
    case DELETE_TODOLIST:
      return {...state, todolists: state.todolists.filter(el => el.id != action.todolistId)}
    case DELETE_TASK:
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


export const addTodoListAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist})
export const addTaskAC = (todolistId, newTask) => ({type: ADD_TASK, todolistId, newTask})
export const changeTaskAC = (todolistId,taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj})
export const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId})
export const deleteTaskAC = (taskId,todolistId) => ({type: DELETE_TASK, taskId,todolistId})






export default reducer;