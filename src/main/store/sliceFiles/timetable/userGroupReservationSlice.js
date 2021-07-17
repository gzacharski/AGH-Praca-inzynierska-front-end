/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { STATUS } from '../../status';

const loadAuthData = () => {
   const token = localStorage.getItem('token');
   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
   const { userId } = userInfo;

   return { token, userId };
};

const initialState = {
   data: [],
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchUserGroupReservation = createAsyncThunk(
   'userGroupReservation/fetchUserGroupReservation',
   async ({ userId, startOfWeek, endOfWeek }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/timetable/${userId}/groupWorkouts?startDate=${startOfWeek}&endDate=${endOfWeek}`;
      const { token } = loadAuthData();

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      try {
         const response = await axios.get(url, config);
         const { data = [], message = null } = response?.data;
         return { data, startOfWeek, endOfWeek, message };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const cancelUserGroupReservation = createAsyncThunk(
   'userGroupReservation/cancelUserGroupReservation',
   async ({ trainingId }, { rejectWithValue }) => {
      const { token, userId } = loadAuthData();
      const url = `${trainingsServiceURL}/groupWorkout/${trainingId}/enroll?clientId=${userId}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      try {
         const response = await axios.delete(url, config);
         const { message = null } = response?.data;
         return { message, trainingId };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const userGroupReservationSlice = createSlice({
   name: 'userGroupReservation',
   initialState,
   reducers: {
      clearMessage(state) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserGroupReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserGroupReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data.push(...action.payload.data);
         state.message = action.payload.message;
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchUserGroupReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
      [cancelUserGroupReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [cancelUserGroupReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data = state.data.filter(
            (workout) => workout.id !== action.payload.trainingId,
         );
         state.message = action.payload.message;
         state.error = null;
      },
      [cancelUserGroupReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = userGroupReservationSlice.actions;

export const selectData = (state) => state.userGroupReservation.data;
export const selectStatus = (state) => state.userGroupReservation.status;
export const selectMessage = (state) => state.userGroupReservation.message;
export const selectFetchedDates = (state) =>
   state.userGroupReservation.fetchedDates;

export default userGroupReservationSlice.reducer;
