import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskAction } from '../redux/actions/actionCreators'
import { useInput } from '../hooks/useInput'
import uniqid from 'uniqid'
import classNames from 'classnames'


const TodoHeader = () => {
    const dispatch = useDispatch()

    const [taskTitle, changeTaskTitle, clearTaskTitle] = useInput<string>('')
    const [taskDescription, changeTaskDescription, clearTaskDescription] = useInput<string>('')
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    const taskTitleClasses = classNames('to-do__task-title', {'incorrectly': isEmpty})
    const taskDescriptionClasses = classNames('to-do__task-description', {'incorrectly': isEmpty})

    const handlerAddTask = () => {
        if (taskTitle && taskDescription) {
            setIsEmpty(false)
            clearTaskTitle()
            clearTaskDescription()

            const payload = {
                id: uniqid(),
                title: taskTitle,
                description: taskDescription,
                completed: false,
                change: false
            }

            dispatch(addTaskAction(payload))
        } else {
            setIsEmpty(true)
        }
    }

    return (
        <header className="to-do__header">
            <h1 className="to-do__title">My Tasks</h1>
            <input className={taskTitleClasses} value={taskTitle} onChange={changeTaskTitle} placeholder={isEmpty ? 'Please add a title!' : 'Title'} required />
            <textarea className={taskDescriptionClasses} value={taskDescription} onChange={changeTaskDescription} placeholder={isEmpty ? 'Please add a description!' : 'Description'} required />
            <button onClick={handlerAddTask} className="to-do__button-add">Add Task</button>
        </header>
    )
}

export default TodoHeader