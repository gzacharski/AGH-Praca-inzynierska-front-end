/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { gymPassServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../../status';
import { NOTISTACK } from '../../notistack';

const managerGympassAdapter = createEntityAdapter({
   selectId: (entity) => entity.documentId,
});

const initialState = managerGympassAdapter.getInitialState({
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

export const fetchManagerGympassList = createAsyncThunk(
   'managerGympassList/fetchGympassList',
   async ({ token = '' }, { rejectWithValue }) => {
      const url = `${gymPassServiceURL}/offer`;

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
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

const managerGympassListSlice = createSlice({
   name: 'managerGympassList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchManagerGympassList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchManagerGympassList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         managerGympassAdapter.setAll(state, action.payload);
         state.error = null;
      },
      [fetchManagerGympassList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default managerGympassListSlice.reducer;

export const { clearMessage } = managerGympassListSlice.actions;

export const { selectAll, selectById } = managerGympassAdapter.getSelectors(
   (state) => state.managerGympassList,
);

export const selectMessage = (state) => state.managerGympassList.message;
export const selectStatus = (state) => state.managerGympassList.status;
export const selectError = (state) => state.managerGympassList.error;
export const selectNotistack = (state) => state.managerGympassList.notistack;
