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
import { STATUS } from '../status';

const trainerListAdapter = createEntityAdapter({
   selectId: (entity) => entity.userId,
});

const initialState = trainerListAdapter.getInitialState({
   status: STATUS.IDLE,
   message: null,
   error: null,
});

export const fetchTrainerList = createAsyncThunk(
   'trainerList/fetchTrainerList',
   async ({ search }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/trainers${search}`;

      try {
         const response = await axios.get(url, config());
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

const trainerListSlice = createSlice({
   name: 'trainerList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchTrainerList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchTrainerList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.error = null;
         trainerListAdapter.setAll(state, action.payload);
      },
      [fetchTrainerList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default trainerListSlice.reducer;

export const { clearMessage } = trainerListSlice.actions;

export const { selectAll: selectTrainers } = trainerListAdapter.getSelectors(
   (state) => state.trainerList,
);

export const selectMessage = (state) => state.trainerList.message;
export const selectStatus = (state) => state.trainerList.status;
export const selectError = (state) => state.trainerList.error;
