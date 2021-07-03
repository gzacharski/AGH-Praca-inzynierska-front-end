/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
   name: 'account',
   initialState: {
      userInfo: { id: null, name: null, surname: null },
      avatar: { data: null, format: null },
   },
   reducers: {
      setUserInfo: (state, action) => {
         state.userInfo = action.payload;
      },
      setAvatar: (state, action) => {
         state.avatar = action.payload;
      },
   },
});

export const { setAvatar, setUserInfo } = accountSlice.actions;

export const selectAccountUserInfo = (state) => state.account.userInfo;
export const selectAccountAvatar = (state) => state.account.avatar;

export default accountSlice.reducer;
