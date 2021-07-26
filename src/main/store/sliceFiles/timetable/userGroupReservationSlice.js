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

const userGroupReservationAdapter = createEntityAdapter({});

const initialState = userGroupReservationAdapter.getInitialState({
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
});

export const fetchUserGroupReservation = createAsyncThunk(
   'userGroupReservation/fetchUserGroupReservation',
   async ({ userId, startOfWeek, endOfWeek, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/timetable/${userId}/groupWorkouts?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config(token));
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

export const cancelUserGroupReservation = createAsyncThunk(
   'userGroupReservation/cancelUserGroupReservation',
   async ({ trainingId, userId, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/groupWorkout/${trainingId}/enroll?clientId=${userId}`;

      try {
         const response = await axios.delete(url, config(token));
         const { message = null } = response?.data;
         return { message, trainingId };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const rateUserGroupEvent = createAsyncThunk(
   'userGroupReservation/rateUserGroupEvent',
   async ({ trainingId, rating, userId, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/groupWorkout/${trainingId}/rate?clientId=${userId}&rating=${rating}`;

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
         userGroupReservationAdapter.upsertMany(state, action.payload.data);
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

      [cancelUserGroupReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [cancelUserGroupReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         userGroupReservationAdapter.removeOne(
            state,
            action.payload.trainingId,
         );
         state.message = action.payload.message;
         state.error = null;
      },
      [cancelUserGroupReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [rateUserGroupEvent.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [rateUserGroupEvent.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.message = action.payload.message;
         state.error = null;
      },
      [rateUserGroupEvent.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = userGroupReservationSlice.actions;

export const { selectAll: selectData } =
   userGroupReservationAdapter.getSelectors(
      (state) => state.userGroupReservation,
   );

export const selectStatus = (state) => state.userGroupReservation.status;
export const selectMessage = (state) => state.userGroupReservation.message;
export const selectFetchedDates = (state) =>
   state.userGroupReservation.fetchedDates;

export default userGroupReservationSlice.reducer;
