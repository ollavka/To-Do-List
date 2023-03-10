import React from 'react'
import Tasks from './Tasks'
import TodoFooter from './TodoFooter'
import TodoHeader from './TodoHeader'

const TodoList = () => {
    return (
        <div className='to-do'>
            <div className="to-do__container _container">
                <TodoHeader />
                <Tasks />
                <TodoFooter />
            </div>
        </div>
    )
}

export default TodoList