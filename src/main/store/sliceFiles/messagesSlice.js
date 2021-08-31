/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';

const messagesAdapter = createEntityAdapter({
   selectId: (entity) => entity.messageId,
   sortComparer: (a, b) => b.created.localeCompare(a.created),
});

const initialState = messagesAdapter.getInitialState({
   status: STATUS.IDLE,
   message: null,
   error: null,
});

export const fetchMessages = createAsyncThunk(
   'messages/fetchMessages',
   async ({ userId = '', search = '', token = '' }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/${userId}/message${search}`;

      try {
         const response = await axios.get(url, config(token));
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const deleteMessage = createAsyncThunk(
   'messages/deleteMessage',
   async ({ userId, token, notificationId }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/${userId}/message/${notificationId}`;

      try {
         const response = await axios.delete(url, config(token));
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

const messagesSlice = createSlice({
   name: 'messages',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchMessages.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchMessages.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         messagesAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchMessages.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [deleteMessage.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [deleteMessage.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         messagesAdapter.removeOne(state, action.payload.notificationId);
         state.error = null;
      },
      [deleteMessage.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default messagesSlice.reducer;

export const { clearMessage } = messagesSlice.actions;

export const {
   selectAll: selectMessages,
   selectIds,
   selectById,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectMessage = (state) => state.messages.message;
export const selectStatus = (state) => state.messages.status;
export const selectError = (state) => state.messages.error;
