import { createSlice } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    id: string;
}

const initialState: User = {
    name: '',
    email: '',
    id: ''
};

const userSlice = createSlice({
    name: 'CurrentUserInfo',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
