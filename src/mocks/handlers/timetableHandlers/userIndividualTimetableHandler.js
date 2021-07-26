import { rest } from 'msw';
import { trainingsServiceURL } from 'src/main/data/urls';
import { nanoid } from 'nanoid';

export const userIndividualTimetableHandler = [
   rest.delete(
      `${trainingsServiceURL}/individualWorkout/:trainingId/enroll`,
      (req, res, ctx) => {
         const { trainingId } = req.params;
         const clientId = req.url.searchParams.get('clientId');

         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
               message: `Anulowano trening personalny o id: ${trainingId} dla klienta o id: ${clientId}`,
            }),
         );
      },
   ),
   rest.post(
      `${trainingsServiceURL}/individualWorkout/:trainingId/rate`,
      (req, res, ctx) => {
         const { trainingId } = req.params;
         const clientId = req.url.searchParams.get('clientId');
         const rating = req.url.searchParams.get('rating');

         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
               message: `Oceniono na ${rating} trening personalny (id: ${trainingId}) przez klienta (id: ${clientId})`,
            }),
         );
      },
   ),
   rest.post(
      `${trainingsServiceURL}/individualWorkout/user/:userId/trainerId/:trainerId`,
      (req, res, ctx) => {
         const { trainingId } = req.params;
         const { userId } = req.params;
         const startDateTime = req.url.searchParams.get('startDateTime');
         const endDateTime = req.url.searchParams.get('endDateTime');

         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
               message: `Wysłano zapytanie o trening personalny (id: ${trainingId}) przez klienta (id: ${userId}).`,
               reservation: {
                  id: 'a52a5aa9-5031-4511-b1e5-92b34b05df3a',
                  title: 'Trening personalny',
                  startDate: startDateTime.substring(0, 16),
                  endDate: endDateTime.substring(0, 16),
                  allDay: false,
                  trainers: [
                     {
                        userId: nanoid(),
                        name: 'Joaquin',
                        surname: 'Phoenix',
                        avatar:
                           'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
                     },
                  ],
                  partipants: {
                     basicList: [
                        {
                           userId,
                           name: 'Grzegorz',
                           surname: 'Zacharski',
                           avatar:
                              'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                        },
                     ],
                     reserveList: [],
                  },
               },
            }),
         );
      },
   ),
   rest.get(
      `${trainingsServiceURL}/timetable/:userId/individualWorkouts`,
      (req, res, ctx) => {
         const { userId } = req.params;
         const startDate = req.url.searchParams.get('startDate');
         const endDate = req.url.searchParams.get('endDate');

         if (startDate === '2021-07-19' && endDate === '2021-07-25') {
            return res(
               ctx.status(200),
               ctx.delay(),
               ctx.json({
                  data: [
                     {
                        id: 'a52a5aa9-5031-4511-b1e5-92b34b05df3a',
                        title: 'Trening personalny',
                        startDate: '2021-07-20T09:45',
                        endDate: '2021-07-20T11:00',
                        allDay: false,
                        trainers: [
                           {
                              userId: nanoid(),
                              name: 'Joaquin',
                              surname: 'Phoenix',
                              avatar:
                                 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
                           },
                        ],
                        partipants: {
                           basicList: [
                              {
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
                           ],
                           reserveList: [],
                        },
                     },
                  ],
               }),
            );
         }

         if (startDate === '2021-07-26' && endDate === '2021-08-01') {
            return res(
               ctx.status(200),
               ctx.delay(),
               ctx.json({
                  data: [
                     {
                        id: '64fbef7b-8109-457b-a8d2-6f0fad39d1f2',
                        title: 'Trening personalny',
                        startDate: '2021-07-26T09:45',
                        endDate: '2021-07-26T11:00',
                        allDay: false,
                        trainers: [
                           {
                              userId: nanoid(),
                              name: 'Joaquin',
                              surname: 'Phoenix',
                              avatar:
                                 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
                           },
                        ],
                        partipants: {
                           basicList: [
                              {
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
                           ],
                           reserveList: [],
                        },
                     },
                     {
                        id: 'de5b837b-2036-41e5-931c-709d6d68db7e',
                        title: 'Trening personalny',
                        startDate: '2021-07-30T13:00',
                        endDate: '2021-07-30T15:30',
                        allDay: false,
                        trainers: [
                           {
                              userId: nanoid(),
                              name: 'Jack',
                              surname: 'Nicholson',
                              avatar:
                                 'https://fwcdn.pl/fph/10/19/1019/409449_2.2.jpg',
                           },
                        ],
                        partipants: {
                           basicList: [
                              {
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
                           ],
                           reserveList: [],
                        },
                     },
                  ],
               }),
            );
         }

         if (startDate === '2021-07-12' && endDate === '2021-07-18') {
            return res(
               ctx.status(200),
               ctx.delay(),
               ctx.json({
                  data: [
                     {
                        id: 'df9ee276-0f30-446b-9f98-5e57eecb20e5',
                        title: 'Trening personalny',
                        startDate: '2021-07-16T09:45',
                        endDate: '2021-07-16T11:00',
                        allDay: false,
                        trainers: [
                           {
                              userId: nanoid(),
                              name: 'Jack',
                              surname: 'Nicholson',
                              avatar:
                                 'https://fwcdn.pl/fph/10/19/1019/409449_2.2.jpg',
                           },
                        ],
                        partipants: {
                           basicList: [
                              {
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
                           ],
                           reserveList: [],
                        },
                     },
                     {
                        id: '360379a3-d5e8-4132-bc95-3157b9a1e30a',
                        title: 'Trening personalny',
                        startDate: '2021-07-16T13:00',
                        endDate: '2021-07-16T15:30',
                        allDay: false,
                        trainers: [
                           {
                              userId: nanoid(),
                              name: 'Aditya',
                              surname: 'Lindel',
                              avatar:
                                 'https://fwcdn.pl/fph/10/75/1075/212753.2.jpg',
                           },
                        ],
                        partipants: {
                           basicList: [
                              {
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
                           ],
                           reserveList: [],
                        },
                     },
                  ],
               }),
            );
         }

         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
               message: 'Brak treningów personalnych we wskazanym tygodniu.',
            }),
         );
      },
   ),
];
