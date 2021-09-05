import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teams: {},
};

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload.standard
                .filter(team => team.isNBAFranchise)
                .reduce((acc, curr) => {
                    acc[curr.divName]
                        ? acc[curr.divName].push(curr)
                        : (acc[curr.divName] = [curr]);
                    return acc;
                }, {});
        },
    },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
