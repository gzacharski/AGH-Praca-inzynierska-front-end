/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { STATUS } from '../../status';
import { NOTISTACK } from '../../notistack';

const initialState = {
   data: [],
   status: STATUS.IDLE,
   notistack: NOTISTACK.SUCCESS,
   message: null,
   error: null,
};

const getNotistackVariant = (error) => {
   const { status = 500 } = error?.response?.data;
   let notistack = NOTISTACK.ERROR;
   if (status === 403) notistack = NOTISTACK.WARNING;
   if (status === 404) notistack = NOTISTACK.INFO;
   return notistack;
};

export const fetchUserStats = createAsyncThunk(
   'adminStats/fetchUserStats',
   async ({ token = '' }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/admin/stats`;

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

const adminStatsSlice = createSlice({
   name: 'adminStats',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserStats.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserStats.fulfilled]: (state, action) => {
         state.data = action.payload;
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.error = null;
      },
      [fetchUserStats.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default adminStatsSlice.reducer;

export const { clearMessage } = adminStatsSlice.actions;

export const selectMessage = (state) => state.adminStats.message;
export const selectStatus = (state) => state.adminStats.status;
export const selectError = (state) => state.adminStats.error;
export const selectNotistack = (state) => state.adminStats.notistack;
export const selectData = (state) => state.adminStats.data;
