import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { todoReducer } from "./reducers/todoReducer"
import { TodoType } from "./reducers/todoReducer"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface IStore {
    todoReducer: {
        todo: TodoType[]
    }
}

const persistConfig = {
    key: 'todo-tasks',
    storage
}

const rootReducer = combineReducers({
    todoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)
