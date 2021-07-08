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
         return rejectWithValue(error.response.data);
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

      const data = {
         name,
         surname,
         email,
         phoneNumber: phone,
      };

      try {
         const response = await axios.patch(url, data, config);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   },
);

export const accountSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {},
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
         state.error = action.payload;
      },
      [setUserInfo.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [setUserInfo.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.userInfo = action.payload;
         state.error = null;
      },
      [setUserInfo.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload;
      },
   },
});

export const selectUserInfo = (state) => state.account.userInfo;
export const selectStatus = (state) => state.account.status;

export default accountSlice.reducer;
