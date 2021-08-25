/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';
import { NOTISTACK } from '../notistack';

const locationListAdapter = createEntityAdapter({
   selectId: (entity) => entity.locationId,
});

const initialState = locationListAdapter.getInitialState({
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

export const fetchLocationList = createAsyncThunk(
   'locationList/fetchLocationList',
   async ({ search = '' }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/location${search}`;

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
            notistack: getNotistackVariant(error),
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

const locationListSlice = createSlice({
   name: 'locationList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchLocationList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchLocationList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         locationListAdapter.setAll(state, action.payload);
         state.error = null;
      },
      [fetchLocationList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default locationListSlice.reducer;

export const { clearMessage } = locationListSlice.actions;

export const { selectAll } = locationListAdapter.getSelectors(
   (state) => state.locationList,
);

export const selectMessage = (state) => state.locationList.message;
export const selectStatus = (state) => state.locationList.status;
export const selectError = (state) => state.locationList.error;
export const selectNotistack = (state) => state.locationList.notistack;
