/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
   name: 'drawer',
   initialState: { isOpen: false, moreInfo: false },
   reducers: {
      toggleDrawer: (state) => {
         state.isOpen = !state.isOpen;
      },
      toggleDrawerMoreInfo: (state) => {
         state.moreInfo = !state.moreInfo;
      },
   },
});

export const { toggleDrawer, toggleDrawerMoreInfo } = drawerSlice.actions;

export const selectDrawer = (state) => state.drawer.isOpen;
export const selectDrawerMoreInfo = (state) => state.drawer.moreInfo;

export default drawerSlice.reducer;
