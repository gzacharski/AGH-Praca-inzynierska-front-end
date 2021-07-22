/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';

const workoutListAdapter = createEntityAdapter({
   selectId: (entity) => entity.trainingTypeId,
});

const initialState = workoutListAdapter.getInitialState({
   status: STATUS.IDLE,
   message: null,
   error: null,
});

export const fetchWorkoutList = createAsyncThunk(
   'workoutList/fetchWorkoutList',
   async ({ search }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/trainingType${search}`;

      try {
         const response = await axios.get(url, config());
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

const workoutListSlice = createSlice({
   name: 'workoutList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchWorkoutList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchWorkoutList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         workoutListAdapter.setAll(state, action.payload);
         state.error = null;
      },
      [fetchWorkoutList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default workoutListSlice.reducer;

export const { clearMessage } = workoutListSlice.actions;

export const { selectAll: selectWorkouts } = workoutListAdapter.getSelectors(
   (state) => state.workoutList,
);

export const selectMessage = (state) => state.workoutList.message;
export const selectStatus = (state) => state.workoutList.status;
export const selectError = (state) => state.workoutList.error;
