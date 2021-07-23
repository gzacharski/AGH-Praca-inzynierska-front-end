/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';

const loadAuthData = () => {
   const token = localStorage.getItem('token');
   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
   const { userId } = userInfo;

   return { token, userId };
};

const url = (userId) => `${accountServiceURL}/${userId}/privacy`;

const initialState = {
   data: {
      regulation: null,
      training: null,
      avatar: null,
      stats: null,
   },
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchAgreements = createAsyncThunk(
   'agreements/fetchAgreements',
   async (_, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      try {
         const response = await axios.get(url(userId), config(token));
         const { data } = response;
         return {
            regulation: data?.regulationsAccepted,
            training: data?.allowShowingTrainingsParticipation,
            stats: data?.allowShowingUserStatistics,
            avatar: data?.allowShowingAvatar,
         };
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const setAgreements = createAsyncThunk(
   'agreements/setAgreements',
   async ({ regulation, training, avatar, stats }, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      const requestData = {
         regulationsAccepted: regulation,
         allowShowingTrainingsParticipation: training,
         allowShowingUserStatistics: stats,
         allowShowingAvatar: avatar,
      };

      try {
         const response = await axios.put(
            url(userId),
            requestData,
            config(token),
         );
         const { data } = response;
         return {
            data: {
               regulation: data?.regulationsAccepted,
               training: data?.allowShowingTrainingsParticipation,
               stats: data?.allowShowingUserStatistics,
               avatar: data?.allowShowingAvatar,
            },
            message: data?.message,
         };
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const agreementSlice = createSlice({
   name: 'agreements',
   initialState,
   reducers: {
      clearMessage(state, actions) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchAgreements.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchAgreements.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data = action.payload;
         state.error = null;
      },
      [fetchAgreements.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
      [setAgreements.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [setAgreements.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data = action.payload.data;
         state.message = action.payload.message;
         state.error = null;
      },
      [setAgreements.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default agreementSlice.reducer;

export const { clearMessage } = agreementSlice.actions;

export const selectAgreements = (state) => state.agreements.data;
export const selectStatus = (state) => state.agreements.status;
export const selectMessage = (state) => state.agreements.message;
