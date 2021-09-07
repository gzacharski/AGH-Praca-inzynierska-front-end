import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { tasksServiceURL } from 'src/main/data/urls';

export const taskHandler = [
   rest.get(`${tasksServiceURL}/page`, (req, res, ctx) => {
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
            ctx.json({ message: 'Brak przypisanych zadań' }),
         );
      }

      return res(
         ctx.status(200),
         ctx.delay(),
         ctx.json([
            {
               taskId: nanoid(),
               assignedBy: {
                  userId: nanoid(),
                  name: 'Grzegorz',
                  surname: 'Zacharski',
                  avatar: 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
               },
               assignedTo: {
                  userId: nanoid(),
                  name: 'Wojciech',
                  surname: 'Zacharski',
                  avatar: 'https://fwcdn.pl/fph/90/46/119046/235875_1.2.jpg',
               },
               title: 'Nowe zadanie',
               description: 'Opis zadania',
               creationDate: '2021-09-04T10:00',
               executionDate: '2021-09-10T20:00',
               priority: 'HIGH',
            },
            {
               taskId: nanoid(),
               assignedBy: {
                  userId: nanoid(),
                  name: 'Grzegorz',
                  surname: 'Zacharski',
                  avatar: 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
               },
               assignedTo: {
                  userId: nanoid(),
                  name: 'Wojciech',
                  surname: 'Zacharski',
                  avatar: 'https://fwcdn.pl/fph/90/46/119046/235875_1.2.jpg',
               },
               title: 'Nowe zadanie',
               description: 'Opis zadania',
               creationDate: '2021-09-04T10:00',
               executionDate: '2021-09-10T20:00',
               priority: 'MEDIUM',
            },
         ]),
      );
   }),
   rest.post(`${tasksServiceURL}/manager/:id`, (req, res, ctx) => {
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
            ctx.json({ message: 'Brak przypisanych zadań' }),
         );
      }

      return res(
         ctx.status(200),
         ctx.delay(),
         ctx.json({
            message: 'Zadanie zostało stworzone',
            task: {
               taskId: nanoid(),
               assignedBy: {
                  userId: nanoid(),
                  name: 'Grzegorz',
                  surname: 'Zacharski',
                  avatar: 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
               },
               assignedTo: {
                  userId: nanoid(),
                  name: 'Wojciech',
                  surname: 'Zacharski',
                  avatar: 'https://fwcdn.pl/fph/90/46/119046/235875_1.2.jpg',
               },
               title: 'Nowe zadanie',
               description: 'Opis zadania',
               creationDate: '2021-09-04T10:00',
               executionDate: '2021-09-10T20:00',
               priority: 'HIGH',
            },
         }),
      );
   }),
];
