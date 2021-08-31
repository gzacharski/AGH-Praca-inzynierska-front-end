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
import { NOTISTACK } from '../../notistack';

const userGroupReservationAdapter = createEntityAdapter({});

const initialState = userGroupReservationAdapter.getInitialState({
   fetchedDates: {},
   status: STATUS.IDLE,
   notistack: NOTISTACK.SUCCESS,
   message: null,
   error: null,
});

const getNotistackVariant = (error) => {
   const { status = 500 } = error?.response?.data;
   let notistack = NOTISTACK.ERROR;
   if ([400, 404].includes(status)) notistack = NOTISTACK.INFO;
   if (status === 403) notistack = NOTISTACK.WARNING;
   return notistack;
};

export const fetchUserGroupReservation = createAsyncThunk(
   'userGroupReservation/fetchUserGroupReservation',
   async ({ userId, startOfWeek, endOfWeek, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/group/trainings/${userId}?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config(token));
         const { data = [] } = response || {};
         return { data, startOfWeek, endOfWeek };
      } catch (error) {
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const cancelUserGroupReservation = createAsyncThunk(
   'userGroupReservation/cancelUserGroupReservation',
   async ({ trainingId, userId, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/group/${trainingId}/enroll?clientId=${userId}`;

      try {
         const response = await axios.delete(url, config(token));
         const { message = null } = response?.data;
         return { message, trainingId };
      } catch (error) {
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

// TODO link with backend
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
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
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
         state.message = null;
         state.notistack = NOTISTACK.SUCCESS;
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
         state.notistack = action.payload.notistack;
      },

      [cancelUserGroupReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [cancelUserGroupReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
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
         state.notistack = action.payload.notistack;
      },

      [rateUserGroupEvent.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [rateUserGroupEvent.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         state.error = null;
      },
      [rateUserGroupEvent.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
         state.notistack = action.payload.notistack;
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
export const selectNotistack = (state) => state.userGroupReservation.notistack;

export default userGroupReservationSlice.reducer;
