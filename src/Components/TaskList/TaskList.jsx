import React from 'react'
import './TaskList.css'

const TaskList = ({ task, setTask }) => {
    const handlerRemoveTask = event => {
        const id = +event.currentTarget.dataset.id
        setTask(task.filter((value, index) => index !== id))
    }

    const handlerTaskIsDone = event => {
        const id = +event.currentTarget.dataset.id
        setTask(task.map((item, index) => index === id ? {...item, done: !item.done} : item))
    }

    const handlerChangeTask = event => {
        const id = +event.currentTarget.dataset.id
        setTask(task.map((item, index) => index === id ? {...item, changeTask: !item.changeTask} : item))
    }

    const handlerChangeTitle = event => {
        const id = +event.currentTarget.dataset.id
        setTask(task.map((item, index) => index === id ? {...item, title: event.target.textContent} : item))
    }

    const handlerChangeDescription = event => {
        const id = +event.currentTarget.dataset.id
        setTask(task.map((item, index) => index === id ? {...item, description: event.target.textContent} : item))
    }

    const displayTaskList = () => {
        return task.map((myTask, index) => {
            const myClassName = myTask.title.length >= 61 ? 'list-item__title indent' : 'list-item__title'
            return (
                <div key={index} className={myTask.done ? 'list__item list-item done' : 'list__item list-item'}>
                    <div className="list-item__block1">
                        <button onClick={handlerTaskIsDone} className="list-item__checker" data-id={index}>
                            <img src="./img/check-circle1.svg" alt="check1"/>
                            <img src="./img/check-circle2.svg" alt="check2"/>
                        </button>
                        <div onBlur={handlerChangeTitle} className={myClassName} contentEditable={myTask.changeTask ? 'true' : 'false'}
                             suppressContentEditableWarning={true} data-id={index}>{myTask.title}</div>
                        <div className="list-item__buttons">
                            <button onClick={handlerChangeTask} className="list-item__change" data-id={index}>
                                <img src="./img/pencil.svg" alt="pencil"/>
                            </button>
                            <button onClick={handlerRemoveTask} className="list-item__remove" data-id={index}>
                                <img src="./img/trash-red.svg" alt="trash"/>
                            </button>
                        </div>
                    </div>
                    <div className="list-item__line"></div>
                    <div className="list-item__block2">
                        <div onBlur={handlerChangeDescription} className="list-item__description" contentEditable={myTask.changeTask ? 'true' : 'false'}
                             suppressContentEditableWarning={true} data-id={index}>{myTask.description}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="to-do__list list">
            {displayTaskList()}
        </div>
    )
}

export default TaskList