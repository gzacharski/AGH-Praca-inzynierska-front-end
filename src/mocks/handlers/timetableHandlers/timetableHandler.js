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
            ctx.json([
               {
                  id: nanoid(),
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
               },
               {
                  id: nanoid(),
                  title: 'Pilates',
                  startDate: '2021-07-23T12:00',
                  endDate: '2021-07-23T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: nanoid(),
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

      if (startDate === '2021-08-02' && endDate === '2021-08-08')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: nanoid(),
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
                  id: nanoid(),
                  title: 'Pilates',
                  startDate: '2021-08-07T12:00',
                  endDate: '2021-08-07T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: nanoid(),
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
                  id: nanoid(),
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
   rest.get(`${trainingsServiceURL}/group`, (req, res, ctx) => {
      const startDate = req.url.searchParams.get('startDate');
      const endDate = req.url.searchParams.get('endDate');

      if (startDate === '2021-07-19' && endDate === '2021-07-25')
         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
               {
                  id: nanoid(),
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
                  partipants: {
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
                  id: nanoid(),
                  title: 'Pilates',
                  startDate: '2021-07-23T12:00',
                  endDate: '2021-07-23T13:30',
                  location: 'Sala nr 2',
                  allDay: false,
               },
               {
                  id: nanoid(),
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
                  id: nanoid(),
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
                  partipants: {
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
                  partipants: {
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
                  id: nanoid(),
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
