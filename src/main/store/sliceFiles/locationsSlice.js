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
   async ({ token = '' }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/location`;

      try {
         const response = await axios.get(url, {
            headers: {
               'Accept-Language': 'pl',
               'Content-Type': 'application/json',
               Authorization: token,
            },
         });
         return response?.data || [];
      } catch (error) {
         if (error?.response === undefined) {
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

export const addLocation = createAsyncThunk(
   'locationList/addLocation',
   async ({ name = '', description = '', token = '' }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/location`;

      try {
         const response = await axios.post(
            url,
            { name, description },
            config(token),
         );
         const { message = '', location = '' } = response?.data || {};
         return { message, location };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data || '',
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

export const updateLocation = createAsyncThunk(
   'locationList/addLocation',
   async (
      { locationId = '', name = '', description = '', token = '' },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/location/${locationId}`;

      try {
         const response = await axios.put(
            url,
            { name, description },
            config(token),
         );
         const { message = '', location = '' } = response?.data || {};
         return { message, location };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data || '',
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

export const deleteLocation = createAsyncThunk(
   'locationList/deleteLocation',
   async ({ locationId = '', token = '' }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/location/${locationId}`;

      try {
         const response = await axios.delete(url, config(token));
         const { message = '', location = '' } = response?.data || {};
         return { message, location };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data || '',
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
         locationListAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchLocationList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [addLocation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [addLocation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         locationListAdapter.upsertOne(state, action.payload.location);
         state.error = null;
      },
      [addLocation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [deleteLocation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [deleteLocation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         locationListAdapter.removeOne(
            state,
            action.payload.location.locationId,
         );
         state.error = null;
      },
      [deleteLocation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default locationListSlice.reducer;

export const { clearMessage } = locationListSlice.actions;

export const { selectAll, selectById } = locationListAdapter.getSelectors(
   (state) => state.locationList,
);

export const selectMessage = (state) => state.locationList.message;
export const selectStatus = (state) => state.locationList.status;
export const selectError = (state) => state.locationList.error;
export const selectNotistack = (state) => state.locationList.notistack;
