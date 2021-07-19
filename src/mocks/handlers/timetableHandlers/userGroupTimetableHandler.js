import { rest } from 'msw';
import { trainingsServiceURL } from 'src/main/data/urls';
import { nanoid } from 'nanoid';

export const userGroupTimetableHandlers = [
   rest.delete(
      `${trainingsServiceURL}/groupWorkout/:trainingId/enroll`,
      (req, res, ctx) => {
         const { trainingId } = req.params;
         const clientId = req.url.searchParams.get('clientId');

         return res(
            ctx.status(200),
            ctx.delay(2000),
            ctx.json({
               message: `Anulowano rezerwacje w wydarzeniu o id: ${trainingId} dla klienta o id: ${clientId}`,
            }),
         );
      },
   ),
   rest.post(
      `${trainingsServiceURL}/groupWorkout/:trainingId/rate`,
      (req, res, ctx) => {
         const { trainingId } = req.params;
         const clientId = req.url.searchParams.get('clientId');
         const rating = req.url.searchParams.get('rating');

         return res(
            ctx.status(200),
            ctx.delay(2000),
            ctx.json({
               message: `Oceniono na ${rating} wydarzenie (id: ${trainingId}) przez klienta (id: ${clientId})`,
            }),
         );
      },
   ),
   rest.get(
      `${trainingsServiceURL}/timetable/:userId/groupWorkouts`,
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
                        id: nanoid(),
                        title: 'Joga',
                        startDate: '2021-07-20T09:45',
                        endDate: '2021-07-20T11:00',
                        allDay: false,
                        location: 'Sala nr 1',
                        trainers: [
                           {
                              userId: nanoid(),
                              name: 'Joaquin',
                              surname: 'Phoenix',
                              avatar:
                                 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
                           },
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
                              {
                                 userId: nanoid(),
                                 name: 'Leonardo',
                                 surname: 'DiCaprio',
                                 avatar:
                                    'https://fwcdn.pl/fph/65/97/426597/458437_8.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Al',
                                 surname: 'Pacino',
                                 avatar:
                                    'https://fwcdn.pl/fph/10/90/1090/419293_1.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Clint',
                                 surname: 'Eastwood',
                                 avatar:
                                    'https://fwcdn.pl/fph/12/41/1241/433855_2.2.jpg',
                              },
                           ],
                           reserveList: [
                              {
                                 userId: nanoid(),
                                 name: 'Christoph',
                                 surname: 'Waltz',
                                 avatar:
                                    'https://fwcdn.pl/ppo/95/01/69501/449668.2.jpg',
                              },
                           ],
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
                        title: 'Joga',
                        startDate: '2021-07-26T09:45',
                        endDate: '2021-07-26T11:00',
                        allDay: false,
                        location: 'Sala nr 1',
                        rating: 3.5,
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
                                 name: 'Jack',
                                 surname: 'Nicholson',
                                 avatar:
                                    'https://fwcdn.pl/fph/10/19/1019/409449_2.2.jpg',
                              },
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
                        title: 'Rowery',
                        startDate: '2021-07-30T13:00',
                        endDate: '2021-07-30T15:30',
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
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
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
                              {
                                 userId: nanoid(),
                                 name: 'Redford',
                                 surname: 'Bowdry',
                                 avatar:
                                    'https://fwcdn.pl/fph/10/35/1035/318026_2.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Aditya',
                                 surname: 'Lindel',
                                 avatar:
                                    'https://fwcdn.pl/fph/08/37/837/409380_2.2.jpg',
                              },
                           ],
                           reserveList: [
                              {
                                 userId: nanoid(),
                                 name: 'Jack',
                                 surname: 'Nicholson',
                                 avatar:
                                    'https://fwcdn.pl/fph/10/19/1019/409449_2.2.jpg',
                              },
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
                                    'https://fwcdn.pl/fph/77/47/137747/139588_1.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Aditya',
                                 surname: 'Lindel',
                                 avatar:
                                    'https://fwcdn.pl/fph/97/57/609757/512760_2.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Toddie2',
                                 surname: 'Makuaa2',
                                 avatar:
                                    'https://fwcdn.pl/fph/78/59/657859/436613_2.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Redford',
                                 surname: 'Bowdry',
                                 avatar:
                                    'https://fwcdn.pl/fph/10/65/1065/447322.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Aditya',
                                 surname: 'Lindel',
                                 avatar:
                                    'https://fwcdn.pl/fph/10/75/1075/212753.2.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Toddie2',
                                 surname: 'Makuaa2',
                                 avatar:
                                    'https://fwcdn.pl/ppo/34/09/563409/449652.2.jpg',
                              },
                           ],
                           reserveList: [
                              {
                                 userId,
                                 name: 'Grzegorz',
                                 surname: 'Zacharski',
                                 avatar:
                                    'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/13/Pictures/_67aa6b5c-94d7-11ea-9070-932bbf5d90a5.jpg',
                              },
                              {
                                 userId: nanoid(),
                                 name: 'Amery',
                                 surname: 'Picarello',
                                 avatar:
                                    'https://fwcdn.pl/fph/63/27/116327/172727_1.2.jpg',
                              },
                           ],
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
               message: 'Brak treningów we wskazanym tygodniu.',
            }),
         );
      },
   ),
];
