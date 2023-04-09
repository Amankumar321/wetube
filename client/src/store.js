import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './redux/reducers/index.js'

const store = configureStore({
    reducer: reducers
})

export default store