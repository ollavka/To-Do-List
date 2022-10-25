import React, { useState } from "react"
import classNames from "classnames"
import TaskList from "../TaskList/TaskList"
import './TodoList.css'

const TodoList = () => {
    const [task, setTask] = useState([])
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)

    const handlerAddTask = () => {
        if (taskTitle && taskDescription) {
            setIsEmpty(false)
            setTask([...task, {title: taskTitle, description: taskDescription, done: false, changeTask: false}])
            setTaskTitle('')
            setTaskDescription('')
        } else {
            setIsEmpty(true)
        }
    }
    const handlerSetTitle = event => setTaskTitle(event.currentTarget.value)
    const handlerSetDescription = event => setTaskDescription(event.currentTarget.value)

    const taskTitleClasses = classNames('to-do__task-title', {'red': isEmpty})
    const taskDescriptionClasses = classNames('to-do__task-description', {'red': isEmpty})

    return (
        <div className="to-do__container _container">
            <header className="to-do__header">
                <h1 className="to-do__title">My Tasks</h1>
                <input onChange={handlerSetTitle} className={taskTitleClasses} value={taskTitle}
                       placeholder={isEmpty ? 'Please add a title!' : 'Title'} required/>
                <input onChange={handlerSetDescription} className={taskDescriptionClasses} value={taskDescription}
                       placeholder={isEmpty ? 'Please add a description!' : 'Description'} required/>
                <button onClick={handlerAddTask} className="to-do__button-add">Add</button>
            </header>
            <main className="to-do__main">
                <TaskList task={task} setTask={setTask}/>
            </main>
            <footer className="to-do__footer"></footer>
        </div>
    )
}

export default TodoList
