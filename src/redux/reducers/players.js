import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    players: [],
};

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload.standard;
        },
    },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
