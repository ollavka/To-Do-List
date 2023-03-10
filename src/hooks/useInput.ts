import { useState, ChangeEvent } from 'react'

type EventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export const useInput = <T>(initialValue: T): [T, (event: EventType) => void, () => void] => {
    const [value, setValue] = useState<T>(initialValue)

    const onChange = (event:EventType) => {
        setValue(event.target.value as T)
    }

    const clearInput = () => {
        setValue('' as T)
    }

    return [value, onChange, clearInput]
}
