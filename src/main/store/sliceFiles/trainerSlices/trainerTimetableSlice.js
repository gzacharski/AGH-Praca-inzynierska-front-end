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

const trainerTrainingsAdapter = createEntityAdapter({});

const initialState = trainerTrainingsAdapter.getInitialState({
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

export const fetchTrainerTrainings = createAsyncThunk(
   'trainerTrainings/fetchUserGroupReservation',
   async ({ userId, startOfWeek, endOfWeek, token }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/trainer/${userId}/trainings?startDate=${startOfWeek}&endDate=${endOfWeek}`;

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

export const trainerTrainingsSlice = createSlice({
   name: 'trainerTrainings',
   initialState,
   reducers: {
      clearMessage(state) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchTrainerTrainings.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchTrainerTrainings.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         trainerTrainingsAdapter.upsertMany(state, action.payload.data);
         state.message = null;
         state.notistack = NOTISTACK.SUCCESS;
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchTrainerTrainings.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
         state.notistack = action.payload.notistack;
      },
   },
});

export const { clearMessage } = trainerTrainingsSlice.actions;

export const { selectAll } = trainerTrainingsAdapter.getSelectors(
   (state) => state.trainerTrainings,
);

export const selectStatus = (state) => state.trainerTrainings.status;
export const selectMessage = (state) => state.trainerTrainings.message;
export const selectFetchedDates = (state) =>
   state.trainerTrainings.fetchedDates;
export const selectNotistack = (state) => state.trainerTrainings.notistack;

export default trainerTrainingsSlice.reducer;
