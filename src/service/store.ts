import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {postsReducer} from "./posts-slice";


const rootReducer = combineReducers({
    postsSlice: postsReducer,
})


export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
