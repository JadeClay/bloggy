import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: { value: {user: null, token: null} },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {login} = userSlice.actions;

export default userSlice.reducer;