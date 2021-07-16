/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { equipmentServiceURL } from 'src/main/data/urls';
import { STATUS } from '../../status';

const initialState = {
   data: [],
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const fetchUserEquipmentReservation = createAsyncThunk(
   'equipmentReservation/fetchUserEquipmentReservation',
   async ({ userId, startOfWeek, endOfWeek }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}/timetable/user/${userId}/reservation?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
         },
      };

      try {
         const response = await axios.get(url, config);
         const { data = [] } = response;
         return { data, startOfWeek, endOfWeek };
      } catch (error) {
         return rejectWithValue({
            error: error?.response,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const equipmentReservationSlice = createSlice({
   name: 'equipmentReservation',
   initialState,
   reducers: {
      clearMessage(state) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchUserEquipmentReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchUserEquipmentReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.data.push(...action.payload.data);
         state.error = null;
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchUserEquipmentReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = equipmentReservationSlice.actions;

export const selectData = (state) => state.equipmentReservation.data;
export const selectStatus = (state) => state.equipmentReservation.status;
export const selectMessage = (state) => state.equipmentReservation.message;
export const selectFetchedDates = (state) =>
   state.equipmentReservation.fetchedDates;

export default equipmentReservationSlice.reducer;
