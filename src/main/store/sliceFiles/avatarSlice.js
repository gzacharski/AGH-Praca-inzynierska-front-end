/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { STATUS } from '../status';

const url = (userId) => `${accountServiceURL}/photos/${userId}/avatar`;

const loadAuthData = () => {
   const token = localStorage.getItem('token');
   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
   const { userId } = userInfo;
   return { token, userId };
};

const initialState = {
   image: null,
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchAvatar = createAsyncThunk(
   'avatar/fetchAvatar',
   async (_, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      try {
         const response = await axios.get(url(userId), config);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   },
);

export const setAvatar = createAsyncThunk(
   'avatar/setAvatar',
   async (file, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
            'Content-type': 'multipart/form-data',
         },
      };
      const formData = new FormData();
      formData.append('avatar', file);

      try {
         const response = await axios.post(url(userId), formData, config);
         return response.data;
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const removeAvatar = createAsyncThunk(
   'avatar/removeAvatar',
   async (_, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      try {
         const response = await axios.delete(url(userId), config);
         return response.data;
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

const avatarSlice = createSlice({
   name: 'avatar',
   initialState,
   reducers: {
      clearMessage(state, actions) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchAvatar.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchAvatar.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.image = action.payload.avatar;
         state.error = null;
      },
      [fetchAvatar.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
      },
      [setAvatar.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [setAvatar.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.image = action.payload.avatar;
         state.message = action.payload.message;
         state.error = null;
      },
      [setAvatar.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.message = action.payload.message;
         state.error = action.payload.error;
      },
      [removeAvatar.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [removeAvatar.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.image = action.payload.avatar;
         state.message = action.payload.message;
         state.error = null;
      },
      [removeAvatar.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.message = action.payload.message;
         state.error = action.payload.error;
      },
   },
});

export default avatarSlice.reducer;

export const { clearMessage } = avatarSlice.actions;

export const selectAvatar = (state) => state.avatar.image;
export const selectStatus = (state) => state.avatar.status;
export const selectMessage = (state) => state.avatar.message;
