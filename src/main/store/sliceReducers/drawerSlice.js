/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
   name: 'drawer',
   initialState: { isOpen: false },
   reducers: {
      toggleDrawer: (state) => {
         state.isOpen = !state.isOpen;
      },
   },
});

export const { toggleDrawer } = drawerSlice.actions;

export const selectDrawer = (state) => state.drawer.isOpen;

export default drawerSlice.reducer;
