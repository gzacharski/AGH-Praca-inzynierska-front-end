/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../status';

const initialState = {
   data: [
      {
         id: 'testid',
         title: 'Joga',
         startDate: '2021-07-17T09:45',
         endDate: '2021-07-17T11:00',
         location: 'Sala nr 1',
         allDay: false,
      },
      {
         id: 'testid2',
         title: 'Pilates',
         startDate: '2021-07-12T12:00',
         endDate: '2021-07-12T13:30',
         location: 'Sala nr 2',
         allDay: false,
      },
      {
         id: 'testid3',
         title: 'Rowery',
         startDate: '2021-07-16T13:00',
         endDate: '2021-07-16T15:30',
         allDay: false,
      },
      {
         id: 'testid4',
         title: 'TRX',
         startDate: '2021-07-14T14:00',
         endDate: '2021-07-14T15:00',
         location: 'Przed budynkiem',
         allDay: false,
      },
   ],
   status: STATUS.IDLE,
   message: null,
   error: null,
};

export const timetableSlice = createSlice({
   name: 'timetable',
   initialState,
   reducers: {
      addAppointment(state, action) {
         state.data.push(action.payload);
      },
      clearMessage(state) {
         state.message = null;
      },
   },
});

export const { addAppointment, clearMessage } = timetableSlice.actions;

export const selectData = (state) => state.timetable.data;
export const selectStatus = (state) => state.timetable.status;
export const selectMessage = (state) => state.timetable.message;

export default timetableSlice.reducer;
