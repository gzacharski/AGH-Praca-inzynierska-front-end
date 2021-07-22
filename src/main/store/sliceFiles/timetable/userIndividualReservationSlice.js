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

const userIndividualReservationAdapter = createEntityAdapter({});

const initialState = userIndividualReservationAdapter.getInitialState({
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
});

export const fetchUserIndividualReservation = createAsyncThunk(
   'userIndividualReservation/fetchUserIndividualReservation',
   async (
      { startOfWeek, endOfWeek, userId, token, locale },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/timetable/${userId}/individualWorkouts?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config(token, locale));
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

export const cancelUserIndividualReservation = createAsyncThunk(
   'userIndividualReservation/cancelUserGroupReservation',
   async ({ trainingId, userId, token, locale }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/individualWorkout/${trainingId}/enroll?clientId=${userId}`;

      try {
         const response = await axios.delete(url, config(token, locale));
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

export const rateUserIndividualEvent = createAsyncThunk(
   'userIndividualReservation/rateUserGroupEvent',
   async (
      { trainingId, rating, userId, token, locale },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/individualWorkout/${trainingId}/rate?clientId=${userId}&rating=${rating}`;

      try {
         const response = await axios.post(url, config(token, locale));
         const { message = null } = response?.data;
         return { message, training: { id: trainingId, rating } };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const userIndividualReservationSlice = createSlice({
   name: 'userIndividualReservation',
   initialState,
   reducers: {
      clearMessage(state) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserIndividualReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserIndividualReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         userIndividualReservationAdapter.upsertMany(
            state,
            action.payload.data,
         );
         state.message = action.payload.message;
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchUserIndividualReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [cancelUserIndividualReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [cancelUserIndividualReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         userIndividualReservationAdapter.removeOne(
            state,
            action.payload.trainingId,
         );
         state.message = action.payload.message;
         state.error = null;
      },
      [cancelUserIndividualReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [rateUserIndividualEvent.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [rateUserIndividualEvent.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.message = action.payload.message;
         userIndividualReservationAdapter.upsertOne(
            state,
            action.payload.training,
         );
         state.error = null;
      },
      [rateUserIndividualEvent.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = userIndividualReservationSlice.actions;

export const { selectAll: selectData } =
   userIndividualReservationAdapter.getSelectors(
      (state) => state.userIndividualReservation,
   );

export const selectStatus = (state) => state.userIndividualReservation.status;
export const selectMessage = (state) => state.userIndividualReservation.message;
export const selectFetchedDates = (state) =>
   state.userIndividualReservation.fetchedDates;

export default userIndividualReservationSlice.reducer;
