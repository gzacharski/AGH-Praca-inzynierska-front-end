/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { equipmentServiceURL } from 'src/main/data/urls';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../../status';

const userEquipmentReservationAdapter = createEntityAdapter({});

const initialState = userEquipmentReservationAdapter.getInitialState({
   fetchedDates: {},
   status: STATUS.IDLE,
   message: null,
});

export const fetchUserEquipmentReservation = createAsyncThunk(
   'userEquipmentReservation/fetchUserEquipmentReservation',
   async ({ userId, startOfWeek, endOfWeek, token }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}/timetable/user/${userId}/reservation?startDate=${startOfWeek}&endDate=${endOfWeek}`;

      try {
         const response = await axios.get(url, config(token));
         const { data = [] } = response;
         return { data, startOfWeek, endOfWeek };
      } catch (error) {
         const { message = null } = error?.response?.data;
         return rejectWithValue({ message });
      }
   },
);

export const userEquipmentReservationSlice = createSlice({
   name: 'userEquipmentReservation',
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
         userEquipmentReservationAdapter.upsertMany(state, action.payload.data);
         state.fetchedDates = {
            ...state.fetchedDates,
            [action.payload.startOfWeek]: action.payload.endOfWeek,
         };
      },
      [fetchUserEquipmentReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.message = action.payload.message;
      },
   },
});

export const { clearMessage } = userEquipmentReservationSlice.actions;

export const { selectAll: selectData } =
   userEquipmentReservationAdapter.getSelectors(
      (state) => state.userEquipmentReservation,
   );

export const selectStatus = (state) => state.userEquipmentReservation.status;
export const selectMessage = (state) => state.userEquipmentReservation.message;
export const selectFetchedDates = (state) =>
   state.userEquipmentReservation.fetchedDates;

export default userEquipmentReservationSlice.reducer;
