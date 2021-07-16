import { rest } from 'msw';
import { equipmentServiceURL } from 'src/main/data/urls';
import { nanoid } from 'nanoid';

export const handlers = [
   rest.get(
      `${equipmentServiceURL}/timetable/equipment/:equipmentId/reservation`,
      (req, res, ctx) => {
         const { equipmentId } = req.params;
         const startDate = req.url.searchParams.get('startDate');
         const endDate = req.url.searchParams.get('endDate');

         if (startDate === '2021-07-19' && endDate === '2021-07-25')
            return res(
               ctx.status(200),
               ctx.delay(1500),
               ctx.json([
                  {
                     id: nanoid(),
                     startDate: '2021-07-20T09:45',
                     endDate: '2021-07-20T11:00',
                     allDay: false,
                     equipment: {
                        id: equipmentId,
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                     participants: [
                        {
                           userId: nanoid(),
                           name: 'Redford',
                           surname: 'Bowdry',
                           avatar:
                              'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
                        },
                     ],
                  },
                  {
                     id: nanoid(),
                     startDate: '2021-07-21T13:00',
                     endDate: '2021-07-21T15:30',
                     allDay: false,
                     equipment: {
                        id: equipmentId,
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                     participants: [
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
                     startDate: '2021-07-23T14:00',
                     endDate: '2021-07-23T15:00',
                     allDay: false,
                     equipment: {
                        id: equipmentId,
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                     participants: [
                        {
                           userId: nanoid(),
                           name: 'Amery',
                           surname: 'Picarello',
                           avatar:
                              'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
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
               ]),
            );

         if (startDate === '2021-07-26' && endDate === '2021-08-01')
            return res(
               ctx.status(404),
               ctx.delay(),
               ctx.json({ message: 'Brak rezerwacji sprzętu' }),
            );

         if (startDate === '2021-07-12' && endDate === '2021-07-18')
            return res(
               ctx.status(200),
               ctx.delay(2000),
               ctx.json([
                  {
                     id: nanoid(),
                     startDate: '2021-07-12T09:45',
                     endDate: '2021-07-12T11:00',
                     allDay: false,
                     equipment: {
                        id: equipmentId,
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                     participants: [
                        {
                           userId: nanoid(),
                           name: 'Redford',
                           surname: 'Bowdry',
                           avatar:
                              'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
                        },
                     ],
                  },
                  {
                     id: nanoid(),
                     startDate: '2021-07-14T13:00',
                     endDate: '2021-07-14T15:30',
                     allDay: false,
                     equipment: {
                        id: equipmentId,
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                     participants: [
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
                     startDate: '2021-07-16T14:00',
                     endDate: '2021-07-16T15:00',
                     allDay: false,
                     equipment: {
                        id: equipmentId,
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                     participants: [
                        {
                           userId: nanoid(),
                           name: 'Amery',
                           surname: 'Picarello',
                           avatar:
                              'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
                        },
                     ],
                  },
               ]),
            );

         return res(
            ctx.status(403),
            ctx.delay(),
            ctx.json({ message: 'Brak dostępu' }),
         );
      },
   ),
   rest.get(
      `${equipmentServiceURL}/timetable/user/:userId/reservation`,
      (req, res, ctx) => {
         const startDate = req.url.searchParams.get('startDate');
         const endDate = req.url.searchParams.get('endDate');

         if (startDate === '2021-07-19' && endDate === '2021-07-25')
            return res(
               ctx.status(200),
               ctx.delay(1500),
               ctx.json([
                  {
                     id: nanoid(),
                     title: 'Rower stacjonarny',
                     startDate: '2021-07-20T09:45',
                     endDate: '2021-07-20T11:00',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'Rower stacjonarny',
                        rating: 4.5,
                     },
                  },
                  {
                     id: nanoid(),
                     title: 'Wiosła',
                     startDate: '2021-07-22T09:45',
                     endDate: '2021-07-22T11:00',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'Wiosła',
                        rating: 4.0,
                     },
                  },
                  {
                     id: nanoid(),
                     title: 'TRX',
                     startDate: '2021-07-21T13:00',
                     endDate: '2021-07-21T15:30',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'TRX',
                        rating: 3.5,
                     },
                  },
                  {
                     id: nanoid(),
                     title: 'Brama',
                     startDate: '2021-07-23T14:00',
                     endDate: '2021-07-23T15:00',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'Brama',
                        rating: 3.5,
                     },
                  },
               ]),
            );

         if (startDate === '2021-07-26' && endDate === '2021-08-01')
            return res(
               ctx.status(404),
               ctx.delay(),
               ctx.json({ message: 'Brak rezerwacji sprzętu' }),
            );

         if (startDate === '2021-07-12' && endDate === '2021-07-18')
            return res(
               ctx.status(200),
               ctx.delay(2000),
               ctx.json([
                  {
                     id: nanoid(),
                     title: 'Wiosła',
                     startDate: '2021-07-16T09:45',
                     endDate: '2021-07-16T11:00',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'Wiosła',
                        rating: 4.0,
                     },
                  },
                  {
                     id: nanoid(),
                     title: 'TRX',
                     startDate: '2021-07-16T13:00',
                     endDate: '2021-07-16T15:30',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'TRX',
                        rating: 3.5,
                     },
                  },
                  {
                     id: nanoid(),
                     title: 'Brama',
                     startDate: '2021-07-14T14:00',
                     endDate: '2021-07-14T15:00',
                     allDay: false,
                     equipment: {
                        id: nanoid(),
                        name: 'Brama',
                        rating: 3.5,
                     },
                  },
               ]),
            );

         return res(
            ctx.status(403),
            ctx.delay(),
            ctx.json({ message: 'Brak dostępu' }),
         );
      },
   ),
];
