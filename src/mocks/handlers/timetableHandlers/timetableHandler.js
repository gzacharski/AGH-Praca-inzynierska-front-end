import { rest } from 'msw';
import { trainingsServiceURL } from 'src/main/data/urls';
import { nanoid } from 'nanoid';

export const timetableHandlers = [
   rest.get(`${trainingsServiceURL}/group/public`, (req, res, ctx) => {
      const startDate = req.url.searchParams.get('startDate');
      const endDate = req.url.searchParams.get('endDate');

      if (startDate === '2021-07-19' && endDate === '2021-07-25')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({ message: 'Brak treningów do wyświetlenia' }),
         );

      if (startDate === '2021-07-26' && endDate === '2021-08-01')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: 'e47e2b36-183b-4399-981e-2f84a568f1af',
                  title: 'Joga',
                  startDate: '2021-07-27T09:45',
                  endDate: '2021-07-27T11:00',
                  allDay: false,
                  location: 'Sala nr 1',
                  trainers: [
                     {
                        userId: nanoid(),
                        name: 'Toddie',
                        surname: 'Makuaa',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                     {
                        userId: nanoid(),
                        name: 'Toddie2',
                        surname: 'Makuaa2',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                  ],
               },
               {
                  id: '18d83841-0d97-4a91-9a6c-100c5f411ca5',
                  title: 'Pilates',
                  startDate: '2021-07-28T12:00',
                  endDate: '2021-07-28T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: 'a5e50410-082a-4c80-902d-a423ed7f2160',
                  title: 'Rowery',
                  startDate: '2021-07-29T13:00',
                  endDate: '2021-07-29T15:30',
                  allDay: false,
               },
            ]),
         );

      if (startDate === '2021-08-02' && endDate === '2021-08-08')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: 'fb90cd5f-2d33-4c29-aeef-25e6b590b46e',
                  title: 'Joga',
                  startDate: '2021-08-02T09:45',
                  endDate: '2021-08-02T11:00',
                  allDay: false,
                  location: 'Sala nr 1',
                  trainers: [
                     {
                        userId: nanoid(),
                        name: 'Toddie',
                        surname: 'Makuaa',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                     {
                        userId: nanoid(),
                        name: 'Toddie2',
                        surname: 'Makuaa2',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                  ],
               },
               {
                  id: 'fcd8c3ab-f3cd-4fdd-8cdb-451d0421a288',
                  title: 'Pilates',
                  startDate: '2021-08-07T12:00',
                  endDate: '2021-08-07T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: 'cdb8ddc1-3fd1-40fa-8b76-b58138394ca6',
                  title: 'Rowery',
                  startDate: '2021-08-06T13:00',
                  endDate: '2021-08-06T15:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
            ]),
         );

      if (startDate === '2021-07-12' && endDate === '2021-07-18')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: '7e4dc129-6ee9-41a2-9c64-8c09262ae2fe',
                  title: 'Joga',
                  startDate: '2021-07-16T09:45',
                  endDate: '2021-07-16T11:00',
                  allDay: false,
                  location: 'Sala nr 1',
                  trainers: [
                     {
                        userId: nanoid(),
                        name: 'Toddie',
                        surname: 'Makuaa',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                     {
                        userId: nanoid(),
                        name: 'Toddie2',
                        surname: 'Makuaa2',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                  ],
               },
               {
                  id: '4648b0e3-d1c8-4c3b-8a29-ca62166e3f39',
                  title: 'Pilates',
                  startDate: '2021-07-12T12:00',
                  endDate: '2021-07-12T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: 'de158f2f-5621-404b-8b1b-cb71c9b2b111',
                  title: 'Rowery',
                  startDate: '2021-07-16T13:00',
                  endDate: '2021-07-16T15:30',
                  allDay: false,
               },
               {
                  id: 'ef250a94-43b8-4469-97cb-c82878907fe9',
                  title: 'TRX',
                  startDate: '2021-07-14T14:00',
                  endDate: '2021-07-14T15:00',
                  location: 'Przed budynkiem',
                  allDay: false,
               },
            ]),
         );

      return res(
         ctx.status(200),
         ctx.delay(),
         ctx.json({ message: 'Brak dostępnej oferty' }),
      );
   }),
   rest.get(`${trainingsServiceURL}/group`, (req, res, ctx) => {
      const startDate = req.url.searchParams.get('startDate');
      const endDate = req.url.searchParams.get('endDate');

      if (startDate === '2021-07-19' && endDate === '2021-07-25')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: 'e1a471eb-3762-4f54-b242-fdf994815b28',
                  title: 'Joga',
                  startDate: '2021-07-20T09:45',
                  endDate: '2021-07-20T11:00',
                  allDay: false,
                  location: 'Sala nr 1',
                  trainers: [
                     {
                        userId: nanoid(),
                        name: 'Toddie',
                        surname: 'Makuaa',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                     {
                        userId: nanoid(),
                        name: 'Toddie2',
                        surname: 'Makuaa2',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                  ],
                  participants: {
                     basicList: [
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
                     reserveList: [
                        {
                           userId: nanoid(),
                           name: 'Amery',
                           surname: 'Picarello',
                           avatar:
                              'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
                        },
                     ],
                  },
               },
               {
                  id: 'df470c41-81d5-4b68-94ee-aa2e8e2a0e51',
                  title: 'Pilates',
                  startDate: '2021-07-23T12:00',
                  endDate: '2021-07-23T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: '0cdf57c7-257e-434b-8466-54172e435d07',
                  title: 'Rowery',
                  startDate: '2021-07-24T13:00',
                  endDate: '2021-07-24T15:30',
                  allDay: false,
               },
            ]),
         );

      if (startDate === '2021-07-26' && endDate === '2021-08-01')
         return res(
            ctx.status(404),
            ctx.delay(),
            ctx.json({ message: 'Brak treningów do wyświetlenia' }),
         );

      if (startDate === '2021-07-12' && endDate === '2021-07-18')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: 'e0345046-e53e-4701-9622-ad0e29133878',
                  title: 'Joga',
                  startDate: '2021-07-16T09:45',
                  endDate: '2021-07-16T11:00',
                  allDay: false,
                  location: 'Sala nr 1',
                  rating: 3.5,
                  trainers: [
                     {
                        userId: nanoid(),
                        name: 'Toddie',
                        surname: 'Makuaa',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                     {
                        userId: nanoid(),
                        name: 'Toddie2',
                        surname: 'Makuaa2',
                        avatar:
                           'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                     },
                  ],
                  participants: {
                     basicList: [
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
                     reserveList: [
                        {
                           userId: nanoid(),
                           name: 'Amery',
                           surname: 'Picarello',
                           avatar:
                              'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
                        },
                     ],
                  },
               },
               {
                  id: 'dcc65ef9-4687-46ba-b41e-40c0b2c9e52c',
                  title: 'Pilates',
                  startDate: '2021-07-12T12:00',
                  endDate: '2021-07-12T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: 'f4d851f5-ea4d-4dd2-ac28-7fc700f516f9',
                  title: 'Rowery',
                  startDate: '2021-07-16T13:00',
                  endDate: '2021-07-16T15:30',
                  allDay: false,
                  participants: {
                     basicList: [
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
                        {
                           userId: nanoid(),
                           name: 'Toddie2',
                           surname: 'Makuaa2',
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
                        {
                           userId: nanoid(),
                           name: 'Toddie2',
                           surname: 'Makuaa2',
                           avatar:
                              'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
                        },
                     ],
                     reserveList: [
                        {
                           userId: nanoid(),
                           name: 'Amery',
                           surname: 'Picarello',
                           avatar:
                              'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
                        },
                     ],
                  },
               },
               {
                  id: '0864b600-f9ab-41f5-ae95-5feb0bd36318',
                  title: 'TRX',
                  startDate: '2021-07-14T14:00',
                  endDate: '2021-07-14T15:00',
                  location: 'Przed budynkiem',
                  allDay: false,
               },
            ]),
         );

      return res(
         ctx.status(404),
         ctx.delay(),
         ctx.json({ message: 'Brak dostępnej oferty' }),
      );
   }),
];
