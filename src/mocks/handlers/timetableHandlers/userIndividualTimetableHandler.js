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
            ctx.delay(2000),
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
            ctx.delay(2000),
            ctx.json({
               message: `Oceniono na ${rating} trening personalny (id: ${trainingId}) przez klienta (id: ${clientId})`,
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
               ctx.delay(1500),
               ctx.json({
                  data: [
                     {
                        id: nanoid(),
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
                        id: nanoid(),
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
                        id: nanoid(),
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
               ctx.delay(2000),
               ctx.json({
                  data: [
                     {
                        id: nanoid(),
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
                        id: nanoid(),
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
