import axios from "axios";


const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
  headers: {"API-KEY": "a4868654-1346-4601-9c9f-2bf29679e35a"}
});


const api = {
  createTodolist(title) {
    return instance.post("", {title})
  },
  getTodolist() {
    return instance.get("")
  },
  deleteTodo(todolistId) {
    return instance.delete(`${todolistId}`)
  },
  updateTodolistTitle(todolistId, newTitle) {
    return instance.put(`${todolistId}`,
      {title: newTitle}
    )
  },
  getTasks(taskId) {
    return instance.get(`${taskId}/tasks`)
  },
  deleteTask(todolistId, taskId) {
    return instance.delete(`${todolistId}/tasks/${taskId}`)
  },
  createTask(taskId, newTitle) {
    return instance.post(`${taskId}/tasks`,
      {title: newTitle}
    )
  },
  changeStatus(todolistId, task, status) {
    let newTask = {...task, status}
    return instance.put(`${todolistId}/tasks/${task.id}`, newTask)
  },
  changeTitle(todolistId, task, title) {
    let newTask = {...task, title}
    debugger
    return instance.put(`${todolistId}/tasks/${task.id}`,newTask)
  }


}
export default api;