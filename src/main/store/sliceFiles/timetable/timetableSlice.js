/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../../status';

const timetableAdapter = createEntityAdapter({
   selectId: (entity) => entity.id,
});

const initialState = timetableAdapter.getInitialState({
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
});

export const fetchPublicTimetableData = createAsyncThunk(
   'timetable/fetchPublicTimetableData',
   async ({ startOfWeek, endOfWeek }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/group/public?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config());
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

export const fetchPrivateTimetableData = createAsyncThunk(
   'timetable/fetchPrivateTimetableData',
   async ({ startOfWeek, endOfWeek, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/group?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config(token));
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

export const enrollToGroupTraining = createAsyncThunk(
   'timetable/enrollToGroupTraining',
   async ({ trainingId, userId, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/group/${trainingId}/enroll?clientId=${userId}`;

      try {
         const response = await axios.post(url, config(token));
         const { message = null } = response?.data;
         return { message };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
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
      reset(state) {
         timetableAdapter.removeAll(state);
         state.fetchedDates = {};
         state.status = STATUS.IDLE;
         state.message = null;
         state.error = null;
      },
   },
   extraReducers: {
      [fetchPublicTimetableData.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchPublicTimetableData.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         timetableAdapter.upsertMany(state, action.payload.data);
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

      [fetchPrivateTimetableData.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchPrivateTimetableData.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         timetableAdapter.upsertMany(state, action.payload.data);
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchPrivateTimetableData.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [enrollToGroupTraining.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [enrollToGroupTraining.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.message = action.payload.message;
         state.error = null;
      },
      [enrollToGroupTraining.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage, reset } = timetableSlice.actions;

export const { selectAll: selectData } = timetableAdapter.getSelectors(
   (state) => state.timetable,
);

export const selectStatus = (state) => state.timetable.status;
export const selectMessage = (state) => state.timetable.message;
export const selectFetchedDates = (state) => state.timetable.fetchedDates;

export default timetableSlice.reducer;
