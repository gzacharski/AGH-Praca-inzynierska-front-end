/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { STATUS } from '../../status';

const initialState = {
   data: [],
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchUserGroupReservation = createAsyncThunk(
   'userGroupReservation/fetchUserGroupReservation',
   async ({ userId, startOfWeek, endOfWeek }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/timetable/${userId}/groupWorkouts?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
         },
      };

      try {
         const response = await axios.get(url, config);
         const { data = [], message = null } = response?.data;
         return { data, startOfWeek, endOfWeek, message };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const userGroupReservationSlice = createSlice({
   name: 'userGroupReservation',
   initialState,
   reducers: {
      clearMessage(state) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserGroupReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserGroupReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data.push(...action.payload.data);
         state.message = action.payload.message;
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchUserGroupReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = userGroupReservationSlice.actions;

export const selectData = (state) => state.userGroupReservation.data;
export const selectStatus = (state) => state.userGroupReservation.status;
export const selectMessage = (state) => state.userGroupReservation.message;
export const selectFetchedDates = (state) =>
   state.userGroupReservation.fetchedDates;

export default userGroupReservationSlice.reducer;
