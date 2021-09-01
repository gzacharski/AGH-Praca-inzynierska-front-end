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

export const addUserEquipmentReservation = createAsyncThunk(
   'userEquipmentReservation/addUserEquipmentReservation',
   async (
      { equipmentId, userId, token, startDateTime, endDateTime },
      { rejectWithValue },
   ) => {
      const url = `${equipmentServiceURL}/user/${userId}/equipment/${equipmentId}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`;

      try {
         const response = await axios.post(url, config(token));
         const { message = null, reservation = {} } = response?.data;
         return { message, reservation };
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const cancelUserEquipmentReservation = createAsyncThunk(
   'userEquipmentReservation/cancelUserEquipmentReservation',
   async ({ eventId, userId, token }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}/user/${userId}/event/${eventId}`;

      try {
         const response = await axios.delete(url, config(token));
         const { message = null } = response?.data;
         return { message, eventId };
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const rateUserEquipmentEvent = createAsyncThunk(
   'userEquipmentReservation/rateUserEquipmentEvent',
   async ({ eventId, rating, userId, token }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}/user/${userId}/event/${eventId}/rate?rating=${rating}`;

      try {
         const response = await axios.post(url, config(token));
         const { message = null } = response?.data;
         return { message };
      } catch (error) {
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
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

      [addUserEquipmentReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [addUserEquipmentReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         userEquipmentReservationAdapter.upsertOne(
            state,
            action.payload.reservation,
         );
      },
      [addUserEquipmentReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.message = action.payload.message;
      },

      [cancelUserEquipmentReservation.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [cancelUserEquipmentReservation.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         userEquipmentReservationAdapter.removeOne(
            state,
            action.payload.eventId,
         );
         state.message = action.payload.message;
         state.error = null;
      },
      [cancelUserEquipmentReservation.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [rateUserEquipmentEvent.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [rateUserEquipmentEvent.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.message = action.payload.message;
         state.error = null;
      },
      [rateUserEquipmentEvent.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
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
