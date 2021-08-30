import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    players: [],
};

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload.standard.map(e => ({
                ...e,
                temporaryDisplayName: e.temporaryDisplayName
                    .split(', ')
                    .reverse()
                    .join(' '),
            }));
        },
    },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
