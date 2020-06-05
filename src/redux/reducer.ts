import api from "../api/api";
import {TaskType, TodoType, UpdateTaskType} from "../types/entities";
import {Dispatch} from "redux";


export const ADD_TODOLIST = "todolist/reducer/ADD_TODOLIST"
export const ADD_TASK = "todolist/reducer/ADD_TASK"
export const SET_TASKS = "todolist/reducer/SET_TASKS"
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"
export const SET_TODOLIST = "todolist/reducer/SET_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "todolist/reducer/CHANGE_TODOLIST_TITLE"



type InitialStateType = {
  todolists: Array<TodoType>
}

const initialState: InitialStateType = {
  todolists: []
}



const todolistReducer = (state: InitialStateType = initialState, action:TodoActionTypes): InitialStateType => {
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

export default todolistReducer;

type TodoActionTypes =
    AddTodolistType
    | SetTodolistType
    | DeleteTodolistType
    | ChangeTodolistTitleType
    | SetTasksType
    | AddTaskType
    | DeleteTaskType
    | ChangeTaskType

type AddTodolistType = {
  type: typeof ADD_TODOLIST
  newTodolist: TodoType
}
export const addTodoList = (newTodolist: TodoType): AddTodolistType => ({type: ADD_TODOLIST, newTodolist})

type SetTodolistType = {
  type: typeof SET_TODOLIST
  todolists: Array<TodoType>
}
export const setTodoList = (todolists: Array<TodoType>): SetTodolistType => ({type: SET_TODOLIST, todolists})

type DeleteTodolistType = {
  type: typeof DELETE_TODOLIST
  todolistId: string
}
export const deleteTodolist = (todolistId:string): DeleteTodolistType => ({type: DELETE_TODOLIST, todolistId})

type ChangeTodolistTitleType = {
  type: typeof CHANGE_TODOLIST_TITLE
  todolistId: string
  newTitle: string
}
export const changeTodolistTitle = (todolistId:string, newTitle:string): ChangeTodolistTitleType => ({type: CHANGE_TODOLIST_TITLE, newTitle, todolistId})

type SetTasksType = {
  type: typeof SET_TASKS
  tasks: Array<TaskType>
  todolistId: string
}
export const setTasks = (tasks: Array<TaskType>, todolistId:string): SetTasksType => ({type: SET_TASKS, tasks, todolistId})

type AddTaskType = {
  type: typeof ADD_TASK
  newTask: TaskType
  todolistId: string
}
export const addTask = (newTask: TaskType, todolistId:string): AddTaskType => ({type: ADD_TASK, newTask, todolistId})

type DeleteTaskType = {
  type: typeof DELETE_TASK
  taskId: string
  todolistId: string
}
export const deleteTask = (taskId:string, todolistId:string): DeleteTaskType => ({type: DELETE_TASK, taskId, todolistId})

type ChangeTaskType = {
  type: typeof CHANGE_TASK
  todolistId: string
  taskId: string
  obj: UpdateTaskType
}
export const changeTask = (todolistId:string, taskId:string, obj: UpdateTaskType): ChangeTaskType => ({type: CHANGE_TASK, todolistId, taskId, obj})






export const getTodolist = () => (dispatch: Dispatch<TodoActionTypes>) => {
  api.getTodolist()
    .then(res => {
      dispatch(setTodoList(res.data));
    });
}
export const addTodolist = (title: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.createTodolist(title)
    .then(response => {
    if (response.data.resultCode === 0) {
      dispatch(addTodoList(response.data.data.item))
    }
  } )
}
export const deleteTodo = (todolistId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.deleteTodo(todolistId)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(deleteTodolist(todolistId))
      }
    })
}
export const updateTodolistTitle = (taskId: string, newTitle: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.updateTodolistTitle(taskId,newTitle)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(changeTodolistTitle(newTitle, taskId))
      }
    })
}

export const getTasks = (taskId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.getTasks(taskId)
    .then(response => {
      dispatch(setTasks(response.data.items, taskId))
    })
}
export const addTsk = (newTitle: string,taskId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.createTask(taskId, newTitle)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(addTask(response.data.data.item, taskId))
      }
    })
}
export const deletaTask = (todolistId: string, taskId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.deleteTask(todolistId, taskId)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(deleteTask(taskId, todolistId))
      }
    })
}
export const changeStatus = (todolistId: string, task: TaskType, status: number) => (dispatch: Dispatch<TodoActionTypes>) => {
  api.changeStatus(todolistId, task, status)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(changeTask(todolistId, task.id, {status}))
      }
    })
}
export const changeTitle = (taskId: string, task: TaskType, newTitle: string) => (dispatch: Dispatch<TodoActionTypes>) => {
  debugger
  api.changeTitle(taskId, task, newTitle)
    .then(response => {
      debugger
      if (response.data.resultCode === 0) {
        dispatch(changeTask(taskId, task.id, {title: newTitle}))
      }
    })
}

