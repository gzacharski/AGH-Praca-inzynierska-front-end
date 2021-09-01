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
import { STATUS } from '../../status';
import { NOTISTACK } from '../../notistack';

const adminUsersListAdapter = createEntityAdapter({
   selectId: (entity) => entity.userId,
});

const initialState = adminUsersListAdapter.getInitialState({
   data: [],
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

export const fetchAdminUsersList = createAsyncThunk(
   'adminUsersList/fetchAdminUsersList',
   async (
      { pageNumber = 0, pageSize = 10, token = '' },
      { rejectWithValue },
   ) => {
      const url = `${accountServiceURL}/admin/users?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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

export const changeClientRoles = createAsyncThunk(
   'adminUsersList/changeClientRoles',
   async ({ userId = '', roles = [], token = '' }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/manager/user/${userId}/roles`;

      try {
         const response = await axios.post(url, { roles }, config(token));
         const { user = {}, message = '' } = response?.data || {};
         return { user, message };
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

const adminUsersSlice = createSlice({
   name: 'adminUsersList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchAdminUsersList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchAdminUsersList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         adminUsersListAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchAdminUsersList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [changeClientRoles.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [changeClientRoles.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         adminUsersListAdapter.upsertOne(state, action.payload.user);
         state.message = action.payload.message;
         state.error = null;
      },
      [changeClientRoles.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default adminUsersSlice.reducer;

export const { clearMessage } = adminUsersSlice.actions;

export const { selectAll, selectById } = adminUsersListAdapter.getSelectors(
   (state) => state.adminUsersList,
);

export const selectMessage = (state) => state.adminUsersList.message;
export const selectStatus = (state) => state.adminUsersList.status;
export const selectError = (state) => state.adminUsersList.error;
export const selectNotistack = (state) => state.adminUsersList.notistack;
