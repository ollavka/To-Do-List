import React, { useRef, createRef, RefObject } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IStore } from '../redux/store'
import { TodoType } from '../redux/reducers/todoReducer'
import { removeTaskAction, completeTaskAction, changeTaskAction } from '../redux/actions/actionCreators'
import { Icon } from './Icon'

interface ITask {
    id: string
    titleRef: RefObject<HTMLDivElement> 
    descriptionRef: RefObject<HTMLDivElement>
}

const Tasks = () => {
    const tasks = useSelector((state: IStore) => {
        const { todoReducer } = state
        return todoReducer.todo
    })

    const dispatch = useDispatch()

    const taskRefs = useRef<ITask[]>([])    
    
    const handlerCompleteTask = (id: string) => dispatch(completeTaskAction(id))
    
    const handlerChangeTask = (task: TodoType, index: number) => {
        const payload: TodoType = {
            id: task.id,
            title: taskRefs.current[index].titleRef.current?.textContent as string,
            description: taskRefs.current[index].descriptionRef.current?.textContent as string,
            change: task.change,
            completed: task.completed
        }

        dispatch(changeTaskAction(payload))
    }

    const handlerRemoveTask = (id: string) => {
        dispatch(removeTaskAction(id))
        taskRefs.current = taskRefs.current.filter(task => task.id !== id)
    }

    return (
        <main className="to-do__main">
            <div className="to-do__list list">
                {
                    tasks.map((task, index) => {
                        const currentTaskTitleRef = createRef<HTMLDivElement>()
                        const currentTaskDescriptionRef = createRef<HTMLDivElement>()
                        
                        const taskData: ITask = {
                            id: task.id,
                            titleRef: currentTaskTitleRef,
                            descriptionRef: currentTaskDescriptionRef
                        }
                        
                        taskRefs.current[index] = taskData
                        
                        return (
                            <div key={task.id} className={`list__item list-item${task.completed ? ' completed' : ''}`}>
                                <div className="list-item__top">
                                    <button onClick={() => handlerCompleteTask(task.id)} className="list-item__checker">
                                        <img src="./icons/check-circle1.svg" alt="check1" />
                                        <img src="./icons/check-circle2.svg" alt="check2" />
                                    </button>
                                    <div ref={currentTaskTitleRef} className={`list-item__title${task.change ? ' change' : ''}`} contentEditable={task.change} suppressContentEditableWarning>{task.title}</div>
                                    <div className="list-item__buttons">
                                        <button onClick={() => handlerChangeTask(task, index)} className="list-item__change-task">
                                            <Icon>drive_file_rename_outline</Icon>
                                        </button>
                                        <button onClick={() => handlerRemoveTask(task.id)} className="list-item__remove-task">
                                            <Icon>delete</Icon>
                                        </button>
                                    </div>
                                </div>
                                <div className="list-item__line"></div>
                                <div className="list-item__bottom">
                                    <div ref={currentTaskDescriptionRef} className={`list-item__description${task.change ? ' change' : ''}`} contentEditable={task.change} suppressContentEditableWarning>{task.description}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Tasks