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

export const fetchPublicTimetableData = createAsyncThunk(
   'timetable/fetchPublicTimetableData',
   async ({ startOfWeek, endOfWeek }, { rejectWithValue, getState }) => {
      const url = `${trainingsServiceURL}/group/public?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
         },
      };

      try {
         const response = await axios.get(url, config);
         const { data = [] } = response;
         return { data, startOfWeek, endOfWeek };
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const timetableSlice = createSlice({
   name: 'timetable',
   initialState,
   reducers: {
      clearMessage(state) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchPublicTimetableData.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchPublicTimetableData.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data.push(...action.payload.data);
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchPublicTimetableData.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = timetableSlice.actions;

export const selectData = (state) => state.timetable.data;
export const selectStatus = (state) => state.timetable.status;
export const selectMessage = (state) => state.timetable.message;
export const selectFetchedDates = (state) => state.timetable.fetchedDates;

export default timetableSlice.reducer;
