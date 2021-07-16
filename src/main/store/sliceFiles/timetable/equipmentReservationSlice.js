/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../status';

const initialState = {
   data: [
      {
         id: 'testid',
         title: 'Rower stacjonarny',
         startDate: '2021-07-17T09:45',
         endDate: '2021-07-17T11:00',
         allDay: false,
      },
      {
         id: 'testid3',
         title: 'Wiosła',
         startDate: '2021-07-16T13:00',
         endDate: '2021-07-16T15:30',
         allDay: false,
      },
      {
         id: 'testid4',
         title: 'TRX',
         startDate: '2021-07-14T14:00',
         endDate: '2021-07-14T15:00',
         allDay: false,
      },
   ],
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const equipmentReservationSlice = createSlice({
   name: 'equipmentReservation',
   initialState,
   reducers: {
      addReservation(state, action) {
         state.data.push(action.payload);
      },
      clearMessage(state) {
         state.message = null;
      },
   },
});

export const { addReservation, clearMessage } =
   equipmentReservationSlice.actions;

export const selectData = (state) => state.equipmentReservation.data;
export const selectStatus = (state) => state.equipmentReservation.status;
export const selectMessage = (state) => state.equipmentReservation.message;

export default equipmentReservationSlice.reducer;
