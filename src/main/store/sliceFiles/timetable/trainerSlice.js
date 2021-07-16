/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { STATUS } from '../../status';

const initialState = {
   data: [
      {
         id: nanoid(),
         title: 'Joga',
         startDate: '2021-07-17T09:45',
         endDate: '2021-07-17T11:00',
         location: 'Sala nr 1',
         allDay: false,
         participants: [
            {
               userId: nanoid(),
               name: 'Jan',
               surname: 'Kowalski',
               avatar:
                  'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-500w.jpeg',
            },
            {
               userId: nanoid(),
               name: 'Grzegorz',
               surname: 'Zacharski',
               avatar:
                  'http://localhost:8020/account/photos/b05a850c-8827-4805-aecd-3a893d58668b/avatar',
            },
            {
               userId: nanoid(),
               name: 'Amery',
               surname: 'Picarello',
               avatar:
                  'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
            },
            {
               userId: nanoid(),
               name: 'Toddie',
               surname: 'Makua',
               avatar:
                  'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
            },
            {
               userId: nanoid(),
               name: 'Redford',
               surname: 'Bowdry',
               avatar:
                  'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
            },
            {
               userId: nanoid(),
               name: 'Aditya',
               surname: 'Lindel',
               avatar:
                  'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg',
            },
         ],
      },
      {
         id: nanoid(),
         title: 'Pilates',
         startDate: '2021-07-12T12:00',
         endDate: '2021-07-12T13:30',
         location: 'Sala nr 2',
         allDay: false,
      },
      {
         id: nanoid(),
         title: 'Rowery',
         startDate: '2021-07-16T13:00',
         endDate: '2021-07-16T15:30',
         allDay: false,
      },
      {
         id: nanoid(),
         title: 'Trening indywidualny',
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

export const trainerSlice = createSlice({
   name: 'trainer',
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

export const { addAppointment, clearMessage } = trainerSlice.actions;

export const selectData = (state) => state.trainer.data;
export const selectStatus = (state) => state.trainer.status;
export const selectMessage = (state) => state.trainer.message;

export default trainerSlice.reducer;
