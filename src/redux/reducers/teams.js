import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teams: []
}

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      console.log("SET TEAMS")
      state.teams = action.payload.filter(team => team.isNBAFranchise)
    }
  }
})

export const { setTeams } = teamsSlice.actions

export default teamsSlice.reducer
