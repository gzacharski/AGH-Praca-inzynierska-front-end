/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createEntityAdapter,
   createSlice,
   createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { tasksServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../../status';
import { NOTISTACK } from '../../notistack';

const taskAdapter = createEntityAdapter({});

const initialState = taskAdapter.getInitialState({
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

export const fetchEmployeeTaskList = createAsyncThunk(
   'taskList/fetchEmployeeTaskList',
   async ({ userId = '', token = '' }, { rejectWithValue }) => {
      const url = `${tasksServiceURL}/employee/${userId}/task`;

      try {
         const response = await axios.get(url, config(token));
         return response?.data || [];
      } catch (error) {
         if (error?.response === undefined) {
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

export const fetchAllTaskList = createAsyncThunk(
   'taskList/fetchAllTaskList',
   async ({ token = '' }, { rejectWithValue }) => {
      const url = `${tasksServiceURL}/page/0`;

      try {
         const response = await axios.get(url, config(token));
         return response?.data || [];
      } catch (error) {
         if (error?.response === undefined) {
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

export const createNewTask = createAsyncThunk(
   'taskList/createNewTask',
   async (
      {
         userId = '',
         employeeId = '',
         priority = '',
         title = '',
         description = '',
         startDate = '',
         token = '',
      },
      { rejectWithValue },
   ) => {
      const url = `${tasksServiceURL}/manager/${userId}`;

      try {
         const response = await axios.post(
            url,
            { title, description, employeeId, dueDate: startDate, priority },
            config(token),
         );
         const { message = '', task = {} } = response?.data || {};
         return { message, task };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data || '',
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

const taskSlice = createSlice({
   initialState,
   name: 'taskList',
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchEmployeeTaskList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchEmployeeTaskList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         taskAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchEmployeeTaskList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [fetchAllTaskList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchAllTaskList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         taskAdapter.upsertMany(state, action.payload);
         state.error = null;
      },
      [fetchAllTaskList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [createNewTask.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [createNewTask.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         taskAdapter.upsertOne(state, action.payload.task);
         state.error = null;
      },
      [createNewTask.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default taskSlice.reducer;

export const { clearMessage } = taskSlice.actions;

export const { selectAll, selectById, selectIds } = taskAdapter.getSelectors(
   (state) => state.taskList,
);

export const selectMessage = (state) => state.taskList.message;
export const selectStatus = (state) => state.taskList.status;
export const selectError = (state) => state.taskList.error;
export const selectNotistack = (state) => state.taskList.notistack;
