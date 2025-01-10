import { createSlice } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
}

const initialState: User = {
    name: '',
    email: '',
};

const userSlice = createSlice({
    name: 'CurrentUserInfo',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
