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
import { NOTISTACK } from '../notistack';

const notificationsAdapter = createEntityAdapter({
   selectId: (entity) => entity.notificationId,
   sortComparer: (a, b) => b.created.localeCompare(a.created),
});

const initialState = notificationsAdapter.getInitialState({
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

export const fetchNotifications = createAsyncThunk(
   'notifications/fetchNotifications',
   async (
      { userId = '', pageNumber = 0, pageSize = 10, token = '' },
      { rejectWithValue },
   ) => {
      const url = `${accountServiceURL}/notification/user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const markAsReadNotification = createAsyncThunk(
   'notifications/markAsReadNotification',
   async ({ userId, token, notificationId }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/notification/${notificationId}/user/${userId}`;

      try {
         const response = await axios.post(url, {}, config(token));
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
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

export const deleteNotification = createAsyncThunk(
   'notifications/deleteNotification',
   async ({ userId, token, notificationId }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/notification/${notificationId}/user/${userId}`;

      try {
         const response = await axios.delete(url, config(token));
         const {
            message = 'Usunięto!',
            notification = { notificationId: '' },
         } = response?.data;
         return { message, notification };
      } catch (error) {
         if (error.response === undefined) {
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

const notificationsSlice = createSlice({
   name: 'notifications',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchNotifications.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchNotifications.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         notificationsAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchNotifications.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [markAsReadNotification.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [markAsReadNotification.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         notificationsAdapter.updateOne(state, {
            id: action.payload.notificationId,
            changes: { markAsRead: action.payload.markAsRead },
         });
         state.error = null;
      },
      [markAsReadNotification.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [deleteNotification.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [deleteNotification.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         notificationsAdapter.removeOne(
            state,
            action.payload.notification.notificationId,
         );
         state.error = null;
      },
      [deleteNotification.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default notificationsSlice.reducer;

export const { clearMessage } = notificationsSlice.actions;

export const {
   selectAll: selectNotifications,
   selectIds,
   selectById,
} = notificationsAdapter.getSelectors((state) => state.notifications);

export const selectMessage = (state) => state.notifications.message;
export const selectStatus = (state) => state.notifications.status;
export const selectError = (state) => state.notifications.error;
export const selectNotistack = (state) => state.notifications.notistack;
