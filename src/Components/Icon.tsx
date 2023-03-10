import React, { ReactNode } from 'react'

interface IProps {
    children: ReactNode
    className?: string
}

export const Icon = ({ children, className }: IProps) => {
    return (
        <span className={`material-symbols-outlined${className ? ' ' + className : ''}`}>
            {children}
        </span>
    )
}