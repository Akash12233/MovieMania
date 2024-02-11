import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}


export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getAPIConfiguration: (state,action) =>{
        state.url = action.payload;
    },
    getGenres: (state, action) =>{
        state.genres = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getAPIConfiguration, getGenres} = homeSlice.actions

export default homeSlice.reducer