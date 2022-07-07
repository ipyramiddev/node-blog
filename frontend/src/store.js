import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './store/articleSlice'

export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
})