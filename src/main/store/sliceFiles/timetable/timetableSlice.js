/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../../status';
import { NOTISTACK } from '../../notistack';

const timetableAdapter = createEntityAdapter({
   selectId: (entity) => entity.id,
});

const initialState = timetableAdapter.getInitialState({
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

export const fetchPublicTimetableData = createAsyncThunk(
   'timetable/fetchPublicTimetableData',
   async ({ startOfWeek, endOfWeek }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/group/public?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config());
         const { data = [] } = response || {};
         return { data, startOfWeek, endOfWeek };
      } catch (error) {
         const { data = {}, status = 0 } = error?.response;
         const { message = null } = data;
         return rejectWithValue({
            error: { data, status },
            message,
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
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         const { data = {}, status = 0 } = error?.response || {};
         const { message = null } = data;
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: { data, status },
            message,
         });
      }
   },
);

export const createGroupTraining = createAsyncThunk(
   'timetable/createGroupTraining',
   async (
      {
         trainingTypeId = '',
         trainerIds = [],
         startDate = '',
         endDate = '',
         locationId = '',
         limit = 10,
         token = '',
      },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/group`;

      const body = {
         trainingTypeId,
         trainerIds,
         startDate,
         endDate,
         locationId,
         limit,
      };

      try {
         const response = await axios.post(url, body, {
            headers: {
               'Accept-Language': 'pl',
               'Content-Type': 'application/json',
               Authorization: token,
            },
         });
         const { message = null, training = {} } = response?.data || {};
         return { message, training };
      } catch (error) {
         if (error?.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const enrollToGroupTraining = createAsyncThunk(
   'timetable/enrollToGroupTraining',
   async (
      { trainingId = '', userId = '', token = '' },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/group/${trainingId}/enroll?clientId=${userId}`;

      try {
         const response = await axios.post(url, {}, config(token));
         const { message = null, training = {} } = response?.data || {};
         return { message, training };
      } catch (error) {
         if (error?.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
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
         state.notistack = NOTISTACK.SUCCESS;
         timetableAdapter.upsertMany(state, action.payload.data);
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchPublicTimetableData.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [fetchPrivateTimetableData.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchPrivateTimetableData.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         timetableAdapter.upsertMany(state, action.payload.data);
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchPrivateTimetableData.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [enrollToGroupTraining.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [enrollToGroupTraining.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         timetableAdapter.upsertOne(state, action.payload.training);
         state.error = null;
      },
      [enrollToGroupTraining.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [createGroupTraining.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [createGroupTraining.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         timetableAdapter.upsertOne(state, action.payload.training);
         state.message = action.payload.message;
         state.error = null;
      },
      [createGroupTraining.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
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
export const selectError = (state) => state.timetable.error;
export const selectNotistack = (state) => state.timetable.notistack;

export default timetableSlice.reducer;
