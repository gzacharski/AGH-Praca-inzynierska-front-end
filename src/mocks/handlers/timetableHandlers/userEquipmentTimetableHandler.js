import { rest } from 'msw';
import { equipmentServiceURL } from 'src/main/data/urls';
import { nanoid } from 'nanoid';

export const userEquipmentTimetableHandlers = [
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
                     id: '2e29ab24-400e-48dc-b7d3-b871b3a58b8c',
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
                     id: '89df73d9-7aad-4977-b9ee-fb425b5e9a1c',
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
                     id: '773614ad-c22d-4227-9fb8-dd118760507f',
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
                     id: 'd51a645b-9b4a-4d9f-8e39-31a747ee5c2f',
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
                     id: 'edbe6a93-dafa-480e-9696-51e3a9cf9578',
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
                     id: 'ecf66f85-6d69-411f-91b1-1e571bbc1f12',
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
                     id: 'd6be9eda-d515-4246-a65a-4c962208921c',
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
                     id: 'da55a367-cad5-4a8d-afc2-628e2e1d6244',
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
                     id: '343eafe9-0505-4a5a-9e50-8c03f338f240',
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
                     id: '672c68f7-799b-42af-877d-2c092bfd3404',
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
                     id: '99d5dfd7-9745-48c0-8927-c7d6b041f3c1',
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
                     id: '1d2701c5-4376-4378-b902-2a427162c5bb',
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
                     id: '206eeb84-2dfe-4dbf-8f28-a7d90618f662',
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
