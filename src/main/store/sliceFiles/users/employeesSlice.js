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

const employeeListAdapter = createEntityAdapter({
   selectId: (entity) => entity.userId,
});

const initialState = employeeListAdapter.getInitialState({
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

export const fetchEmployeesList = createAsyncThunk(
   'employeesList/fetchEmployeesList',
   async (
      { pageNumber = 0, pageSize = 10, token = '' },
      { rejectWithValue },
   ) => {
      const url = `${accountServiceURL}/admin/employees?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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

const employeeListSlice = createSlice({
   name: 'employeesList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchEmployeesList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchEmployeesList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         employeeListAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchEmployeesList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default employeeListSlice.reducer;

export const { clearMessage } = employeeListSlice.actions;

export const { selectAll, selectById } = employeeListAdapter.getSelectors(
   (state) => state.employeesList,
);

export const selectMessage = (state) => state.employeesList.message;
export const selectStatus = (state) => state.employeesList.status;
export const selectError = (state) => state.employeesList.error;
export const selectNotistack = (state) => state.employeesList.notistack;
