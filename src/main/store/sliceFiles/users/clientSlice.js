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

const clientsListAdapter = createEntityAdapter({
   selectId: (entity) => entity.userId,
});

const initialState = clientsListAdapter.getInitialState({
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

export const fetchClientsList = createAsyncThunk(
   'clientsList/fetchClientsList',
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
   'clientsList/changeClientRoles',
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

const clientsListSlice = createSlice({
   name: 'clientsList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchClientsList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchClientsList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         clientsListAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchClientsList.rejected]: (state, action) => {
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
         clientsListAdapter.upsertOne(state, action.payload.user);
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

export default clientsListSlice.reducer;

export const { clearMessage } = clientsListSlice.actions;

export const { selectAll, selectById, selectEntities } =
   clientsListAdapter.getSelectors((state) => state.clientsList);

export const selectMessage = (state) => state.clientsList.message;
export const selectStatus = (state) => state.clientsList.status;
export const selectError = (state) => state.clientsList.error;
export const selectNotistack = (state) => state.clientsList.notistack;
