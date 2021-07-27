import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { accountServiceURL } from 'src/main/data/urls';

export const handlers = [
   rest.get(`${accountServiceURL}/:userId/messages`, (req, res, ctx) =>
      res(
         ctx.status(200),
         ctx.delay(),
         ctx.json([
            {
               id: '3072dac2-b7af-4ea0-8dcf-c1cd37aeaf72',
               from: {
                  userId: nanoid(),
                  name: 'Hajrah',
                  surname: 'Childs',
                  avatar: '',
               },
               title: 'Test title',
               content:
                  'Maecenas vel lorem eu metus ultrices auctor. Nunc nec nunc sed lectus dictum fermentum ac sit amet lacus. Integer nec lacinia nibh. Donec accumsan orci ac urna tempus, sed aliquet lacus finibus. Duis egestas, urna ullamcorper convallis vestibulum, diam metus sollicitudin eros, a congue lorem velit consectetur ex. Fusce a nisi et lorem luctus mattis. Nullam aliquam ultricies tortor, non cursus mi vestibulum vel. Donec non tellus malesuada eros commodo mattis. Quisque maximus id nibh ac euismod. Mauris dui orci, consequat et quam faucibus, elementum venenatis libero.',
               created: new Date(),
            },
         ]),
      ),
   ),
];
