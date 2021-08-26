import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { trainingsServiceURL } from 'src/main/data/urls';

export const locationHandler = [
   rest.get(`${trainingsServiceURL}/location`, (req, res, ctx) => {
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
               locationId: nanoid(),
               name: 'Rowery',
               image: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               area: '24m2',
               description:
                  'Sed eget velit tortor. Duis vestibulum est in arcu tempus pulvinar. Donec semper rhoncus leo, at pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
            },
            {
               locationId: nanoid(),
               name: 'Rowery',
               image: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               area: '24m2',
               description:
                  'At pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
            },
         ]),
      );
   }),
];
