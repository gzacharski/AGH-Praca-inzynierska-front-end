/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { STATUS } from '../status';

const initialState = {
   training: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchUserNextTraining = createAsyncThunk(
   'userNextTraining/fetchUserNextTraining',
   async ({ userId = '', token = '' }, { rejectWithValue }) => {
      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      const url = `${trainingsServiceURL}/user/${userId}/next`;

      try {
         const response = await axios.get(url, config);
         return response?.data || {};
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const nextTrainingSlice = createSlice({
   name: 'userNextTraining',
   initialState,
   reducers: {
      clearMessage(state, actions) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserNextTraining.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserNextTraining.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.training = action.payload;
         state.error = null;
         state.message = null;
      },
      [fetchUserNextTraining.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
         state.training = {};
      },
   },
});

export default nextTrainingSlice.reducer;

export const { clearMessage } = nextTrainingSlice.actions;

export const selectNextTraining = (state) => state.userNextTraining.training;
export const selectStatus = (state) => state.userNextTraining.status;
export const selectMessage = (state) => state.userNextTraining.message;
