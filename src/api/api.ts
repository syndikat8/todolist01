import axios from "axios";
import {TaskType, TodoType} from "../types/entities";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {"API-KEY": "a4868654-1346-4601-9c9f-2bf29679e35a"}
});


type CommonApiType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}


const api = {
    createTodolist(title: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>("", {title})
    },
    getTodolist() {
        return instance.get<Array<TodoType>>("")
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonApiType<{}>>(`${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put<CommonApiType<{}>>(`${todolistId}`,
            {title: newTitle}
        )
    },
    getTasks(taskId: string) {
        return instance.get<{ items: Array<TaskType> }>(`${taskId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonApiType<{}>>(`${todolistId}/tasks/${taskId}`)
    },
    createTask(taskId: string, newTitle: string) {
        return instance.post<CommonApiType<{ item: TaskType }>>(`${taskId}/tasks`,
            {title: newTitle}
        )
    },
    changeStatus(todolistId: string, task: TaskType, status: number) {
        let newTask = {...task, status}
        return instance.put<CommonApiType<{ item: TaskType }>>(`${todolistId}/tasks/${task.id}`, newTask)
    },
    changeTitle(todolistId: string, task: TaskType, title: string) {
        let newTask = {...task, title}
        return instance.put<CommonApiType<{ item: TaskType }>>(`${todolistId}/tasks/${task.id}`, newTask)
    }


}
export default api;