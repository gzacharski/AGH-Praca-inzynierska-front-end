/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../../status';
import { NOTISTACK } from '../../notistack';

const trainerListAdapter = createEntityAdapter({
   selectId: (entity) => entity.userId,
});

const initialState = trainerListAdapter.getInitialState({
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

export const fetchTrainersList = createAsyncThunk(
   'trainersList/fetchTrainersList',
   async (
      { pageNumber = 0, pageSize = 10, token = '' },
      { rejectWithValue },
   ) => {
      const url = `${accountServiceURL}/admin/trainers?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      try {
         const response = await axios.get(url, config(token));
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

const trainersListSlice = createSlice({
   name: 'trainersList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchTrainersList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchTrainersList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         trainerListAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchTrainersList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default trainersListSlice.reducer;

export const { clearMessage } = trainersListSlice.actions;

export const { selectAll, selectById, selectEntities } =
   trainerListAdapter.getSelectors((state) => state.trainersList);

export const selectMessage = (state) => state.trainersList.message;
export const selectStatus = (state) => state.trainersList.status;
export const selectError = (state) => state.trainersList.error;
export const selectNotistack = (state) => state.trainersList.notistack;
