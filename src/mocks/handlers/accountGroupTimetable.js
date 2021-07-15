/* eslint-disable no-unused-vars */
import { rest } from 'msw';
import { trainingsServiceURL } from 'src/main/data/urls';
import { nanoid } from 'nanoid';

export const handlers = [
   rest.get(`${trainingsServiceURL}/test`, (req, res, ctx) => {
      console.log(req);
      return res(ctx.status(200), ctx.delay(), ctx.json({ test: 'hello' }));
   }),
   rest.get(`${trainingsServiceURL}/group/public`, (req, res, ctx) => {
      const startDate = req.url.searchParams.get('startDate');
      const endDate = req.url.searchParams.get('endDate');

      // console.log(startDate);
      // console.log(endDate);

      // if (startDate && endDate) {
      //    return res(
      //       ctx.status(404),
      //       ctx.delay(2000),
      //       ctx.json({
      //          message: 'Nie znaleziono wybranych treningów',
      //          error: 'Test error',
      //          status: 404,
      //          timestamp: Date.now(),
      //       }),
      //    );
      // }

      return res(
         ctx.status(200),
         ctx.delay(2000),
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
   }),
];
