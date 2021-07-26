/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { equipmentServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';

const initialState = {
   data: [],
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchEquipmentList = createAsyncThunk(
   'equipmentList/fetchEquipmentList',
   async ({ search = '' }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}${search}`;

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

const equipmentListSlice = createSlice({
   name: 'equipmentList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchEquipmentList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchEquipmentList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data = action.payload;
         state.error = null;
      },
      [fetchEquipmentList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default equipmentListSlice.reducer;

export const { clearMessage } = equipmentListSlice.actions;

export const selectMessage = (state) => state.equipmentList.message;
export const selectStatus = (state) => state.equipmentList.status;
export const selectEquipment = (state) => state.equipmentList.data;
export const selectError = (state) => state.equipmentList.error;
