import { ADD_TASK, REMOVE_TASK, CHANGE_TASK, TASK_COMPLETED } from "./actionTypes"
import { TodoType } from "../reducers/todoReducer"
import { ActionType } from "./actionTypes"

type PayloadType = TodoType | { id: string }

interface IActionCreator {
    type: ActionType
    payload?: PayloadType
}

export const addTaskAction = (payload: TodoType): IActionCreator => {
    return {
        type: ADD_TASK,
        payload
    }
}

export const removeTaskAction = (id: string): IActionCreator => {
    return {
        type: REMOVE_TASK,
        payload: {
            id
        }
    }
}

export const changeTaskAction = (payload: TodoType): IActionCreator => {
    return {
        type: CHANGE_TASK,
        payload
    }
}

export const completeTaskAction = (id: string): IActionCreator => {
    return {
        type: TASK_COMPLETED,
        payload: {
            id
        }
    }
}