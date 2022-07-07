import { createSlice, current } from '@reduxjs/toolkit'
import {getAllArticles} from '../services/api'


const initialState = {
  allArticlesData: [],
  articleById: {}
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    allArticles: (state, action) => {
      state.allArticlesData = action.payload
    },
    reverse: (state, action) => {
      const current = state.allArticlesData
      state.allArticlesData = current.reverse()
    },
    getArticleById: (state, action) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { allArticles, reverse, getArticleById } = articleSlice.actions

export default articleSlice.reducer