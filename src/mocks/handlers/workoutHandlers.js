import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { trainingsServiceURL } from 'src/main/data/urls';

export const workoutHandlers = [
   rest.get(`${trainingsServiceURL}/trainingType`, (req, res, ctx) => {
      const error = req.url.searchParams.get('error');
      if (error === 'noConnection') {
         return res(
            ctx.status(500),
            ctx.delay(),
            ctx.json({ message: NETWORK_ERROR }),
         );
      }

      const status = req.url.searchParams.get('status');
      if (status === 'noEquipment') {
         return res(
            ctx.status(404),
            ctx.delay(1500),
            ctx.json({ message: 'Brak aktulanej oferty' }),
         );
      }

      return res(
         ctx.status(200),
         ctx.delay(),
         ctx.json([
            {
               trainingTypeId: nanoid(),
               title: 'Rowery',
               image: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               description:
                  'Sed eget velit tortor. Duis vestibulum est in arcu tempus pulvinar. Donec semper rhoncus leo, at pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
               trainer: {
                  userId: nanoid(),
                  name: 'Redford',
                  surname: 'Bowdry',
                  avatar: 'https://fwcdn.pl/ppo/71/04/57104/449672.2.jpg',
               },
               rating: 4.5,
               duration: '01:30:00',
               comments: [
                  {
                     commentId: nanoid(),
                     user: {
                        userId: nanoid(),
                        name: 'Aditya',
                        surname: 'Lindel',
                        avatar: 'https://fwcdn.pl/fph/10/75/1075/212753.2.jpg',
                     },
                     content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non lorem a dolor gravida tincidunt. Duis bibendum ligula at scelerisque pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris scelerisque tortor nec aliquam ultrices. Fusce fermentum sed nulla sed venenatis. Curabitur vehicula tristique odio, in feugiat velit accumsan sed. Ut et fermentum purus, in euismod dui. Vestibulum vehicula mollis enim vitae porttitor. Nam in bibendum nunc. Curabitur suscipit faucibus dolor. Nam a felis mattis, tincidunt libero id, feugiat tellus. Praesent neque neque, aliquet at nisl ut, tristique tincidunt tellus. Phasellus rhoncus felis nec enim malesuada, et eleifend diam vehicula. Sed posuere, leo ac placerat sagittis, augue turpis rutrum sem, at efficitur quam elit ac augue. Sed rhoncus a nibh nec tincidunt.',
                     time: '2020-05-10T10:10:00',
                  },
                  {
                     commentId: nanoid(),
                     user: {
                        userId: nanoid(),
                        name: 'Jack',
                        surname: 'Nicholson',
                        avatar:
                           'https://fwcdn.pl/fph/10/19/1019/409449_2.2.jpg',
                     },
                     content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non lorem a dolor gravida tincidunt. Duis bibendum ligula at scelerisque pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris scelerisque tortor nec aliquam ultrices. Fusce fermentum sed nulla sed venenatis. Curabitur vehicula tristique odio, in feugiat velit accumsan sed. Ut et fermentum purus, in euismod dui. Vestibulum vehicula mollis enim vitae porttitor. Nam in bibendum nunc. Curabitur suscipit faucibus dolor. Nam a felis mattis, tincidunt libero id, feugiat tellus. Praesent neque neque, aliquet at nisl ut, tristique tincidunt tellus. Phasellus rhoncus felis nec enim malesuada, et eleifend diam vehicula. Sed posuere, leo ac placerat sagittis, augue turpis rutrum sem, at efficitur quam elit ac augue. Sed rhoncus a nibh nec tincidunt.',
                     time: '2020-05-15T12:10:00',
                  },
               ],
            },
            {
               trainingTypeId: nanoid(),
               title: 'Sztangi',
               image: 'https://images.unsplash.com/photo-1593505042335-f34c535a9dbe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxmaXRuZXNzJTIwZXF1aXBtZW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               description:
                  'Sed eget velit tortor. Duis vestibulum est in arcu tempus pulvinar. Donec semper rhoncus leo, at pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
               trainer: {
                  userId: nanoid(),
                  name: 'Joaquin',
                  surname: 'Phoenix',
                  avatar: 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
               },
               rating: 3.5,
               duration: '02:30:00',
            },
         ]),
      );
   }),
];
