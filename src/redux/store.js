import { configureStore } from '@reduxjs/toolkit'

import teamsReducer from 'redux/reducers/teams'
import errorReducer from 'redux/reducers/error'
import playersReducer from 'redux/reducers/players'

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    error: errorReducer,
    players: playersReducer
  }
})
