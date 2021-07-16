/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { gymPassServiceURL } from 'src/main/data/urls';
import { STATUS } from '../status';

const initialState = {
   data: [],
   status: STATUS.IDLE,
   message: null,
   errro: null,
};

const fetchPriceList = createAsyncThunk(
   'priceList/fetchPriceList',
   async (_, { rejectWithValue }) => {
      const config = {
         'Accept-Language': 'pl',
      };
      const url = `${gymPassServiceURL}/offer`;

      try {
         const response = await axios.get(url, config);
         return response.data;
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

const priceListSlice = createSlice({
   name: 'priceList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchPriceList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchPriceList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data = action.payload;
         state.error = null;
      },
      [fetchPriceList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default priceListSlice.reducer;

export const { clearMessage } = priceListSlice.actions;

export const selectMessage = (state) => state.priceList.message;
export const selectStatus = (state) => state.priceList.status;
export const selectPriceList = (state) => state.priceList.data;
