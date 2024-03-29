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

const userIndividualReservationAdapter = createEntityAdapter({});

const initialState = userIndividualReservationAdapter.getInitialState({
   fetchedDates: {},
   status: STATUS.IDLE,
   notistack: NOTISTACK.SUCCESS,
   message: null,
   error: null,
});

const getNotistackVariant = (error) => {
   const { status = 500 } = error?.response?.data;
   let notistack = NOTISTACK.ERROR;
   if (status === 403) notistack = NOTISTACK.WARNING;
   if (status === 404) notistack = NOTISTACK.INFO;
   return notistack;
};

export const fetchUserIndividualReservation = createAsyncThunk(
   'userIndividualReservation/fetchUserIndividualReservation',
   async ({ startOfWeek, endOfWeek, userId, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/individual/user/${userId}?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, {
            headers: {
               'Accept-Language': 'pl',
               Authorization: token,
            },
         });
         const { data = {} } = response;
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

export const addUserIndividualReservation = createAsyncThunk(
   'userIndividualReservation/addUserIndividualReservation',
   async (
      { trainerId, userId, token, startDateTime, endDateTime },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/individual/user/${userId}`;

      const body = {
         trainerId,
         startDateTime,
         endDateTime,
         remarks: '',
      };

      try {
         const response = await axios.post(url, body, config(token));
         const { message = null, training = {} } = response?.data;
         return { message, training };
      } catch (error) {
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const cancelUserIndividualReservation = createAsyncThunk(
   'userIndividualReservation/cancelUserIndividualReservation',
   async ({ trainingId, userId, token, locale }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/individual/user/${userId}/training/${trainingId}`;

      try {
         const response = await axios.delete(url, config(token, locale));
         const { message = null, training = {} } = response?.data || {};
         const { id = '' } = training;
         return { message, id };
      } catch (error) {
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

// TODO
export const rateUserIndividualEvent = createAsyncThunk(
   'userIndividualReservation/rateUserIndividualEvent',
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
            error: error?.response?.data,
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
         state.notistack = NOTISTACK.SUCCESS;
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
         state.notistack = action.payload.notistack;
      },

      [addUserIndividualReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [addUserIndividualReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         userIndividualReservationAdapter.upsertOne(
            state,
            action.payload.training,
         );
         state.message = action.payload.message;
         state.error = null;
      },
      [addUserIndividualReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
         state.notistack = action.payload.notistack;
      },

      [cancelUserIndividualReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [cancelUserIndividualReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         userIndividualReservationAdapter.removeOne(state, action.payload.id);
         state.message = action.payload.message;
         state.error = null;
      },
      [cancelUserIndividualReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
         state.notistack = action.payload.notistack;
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
         state.notistack = action.payload.notistack;
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
export const selectNotistack = (state) => state.notifications.notistack;

export default userIndividualReservationSlice.reducer;
