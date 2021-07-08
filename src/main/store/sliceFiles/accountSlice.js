/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { STATUS } from '../status';

const loadAuthData = () => {
   const token = localStorage.getItem('token');
   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
   const { userId } = userInfo;

   return { token, userId };
};

const initialState = {
   userInfo: { id: null, name: null, surname: null, email: null, phone: null },
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchUserInfo = createAsyncThunk(
   'acount/fetchUserInfo',
   async (_, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      const url = `${accountServiceURL}/${userId}`;

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

export const setUserInfo = createAsyncThunk(
   'acount/setUserInfo',
   async ({ name, surname, email, phone }, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      const url = `${accountServiceURL}/changeUserData/${userId}`;

      const requestData = {
         name,
         surname,
         email,
         phoneNumber: phone,
      };

      try {
         const response = await axios.patch(url, requestData, config);
         const { data } = response;
         return {
            userInfo: {
               id: data?.id,
               name: data?.name,
               surname: data?.surname,
               phone: data?.phone,
               email: data?.email,
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

export const accountSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {
      clearMessage(state, actions) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserInfo.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserInfo.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.userInfo = action.payload;
         state.error = null;
      },
      [fetchUserInfo.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
      [setUserInfo.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [setUserInfo.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.userInfo = action.payload.userInfo;
         state.message = action.payload.message;
         state.error = null;
      },
      [setUserInfo.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default accountSlice.reducer;

export const { clearMessage } = accountSlice.actions;

export const selectUserInfo = (state) => state.account.userInfo;
export const selectStatus = (state) => state.account.status;
export const selectMessage = (state) => state.account.message;
