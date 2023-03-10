import { ADD_TASK, REMOVE_TASK, CHANGE_TASK, TASK_COMPLETED } from '../actions/actionTypes'

export type TodoType = {
    id: string
    title: string
    description: string
    completed: boolean
    change: boolean
}

interface IAction {
    type: string,
    payload?: TodoType
}

interface IState {
    todo: TodoType[]
}

const initialState: IState = {
    todo: []
}

export const todoReducer = (state = initialState, action: IAction): IState => {
    switch(action.type) {
        case ADD_TASK: 
            return {
                todo: [action.payload as TodoType, ...state.todo]
            }
        case REMOVE_TASK: 
            return {
                todo: state.todo.filter(task => task.id !== action.payload?.id)
            }
        case TASK_COMPLETED: 
            return {
                todo: state.todo.map(task => task.id === action.payload?.id ? { ...task, completed: !task.completed } : task)
            }
        case CHANGE_TASK: 
            return {
                todo: state.todo.map(task => task.id === action.payload?.id ? { ...task, title: action.payload.title, description: action.payload.description, change: !task.change } : task)
            }
        default:
            return state
    }
}