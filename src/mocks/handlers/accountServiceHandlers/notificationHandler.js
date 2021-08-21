import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { accountServiceURL } from 'src/main/data/urls';

export const notificationsHandlers = [
   rest.get(`${accountServiceURL}/notification/user/:userId`, (req, res, ctx) =>
      res(
         ctx.status(200),
         ctx.delay(),
         ctx.json([
            {
               notificationId: '3072dac2-b7af-4ea0-8dcf-c1cd37aeaf72',
               from: {
                  userId: nanoid(),
                  name: 'Hajrah',
                  surname: 'Childs',
                  avatar: '',
               },
               title: 'Ultrices auctor',
               content:
                  'Maecenas vel lorem eu metus ultrices auctor. Nunc nec nunc sed lectus dictum fermentum ac sit amet lacus.',
               created: '2021-08-21T08:16:26.699Z',
               markAsRead: false,
            },
            {
               notificationId: '45ee4f4b-ddfc-4a19-a25d-716d4b46d958',
               from: {
                  userId: nanoid(),
                  name: 'Hajrah',
                  surname: 'Childs',
                  avatar: '',
               },
               title: 'Lacus finibus',
               content:
                  'Integer nec lacinia nibh. Donec accumsan orci ac urna tempus, sed aliquet lacus finibus. Duis egestas.',
               created: '2021-08-21T09:16:26.699Z',
               markAsRead: false,
            },
         ]),
      ),
   ),
   rest.post(
      `${accountServiceURL}/notification/:notificationId/user/:userId`,
      (req, res, ctx) => {
         const { notificationId } = req.params;
         const markAsRead = req.url.searchParams.get('markAsRead');

         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
               notificationId,
               markAsRead: Boolean(markAsRead).valueOf(),
            }),
         );
      },
   ),
   rest.delete(
      `${accountServiceURL}/notification/:notificationId/user/:userId`,
      (req, res, ctx) => {
         const { notificationId } = req.params;

         return res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
               notificationId,
            }),
         );
      },
   ),
];
