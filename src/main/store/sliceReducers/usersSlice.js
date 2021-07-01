/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: 'users',
   initialState: {
      users: [],
   },
   reducers: {
      addUser: (state, action) => {
         state.users.push(action.payload);
      },
   },
});

export const { addUser } = userSlice.actions;

export const selectUsersFromUser = (state) => state.users.users;

export default userSlice.reducer;
