import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { equipmentServiceURL } from 'src/main/data/urls';

export const equipmentListHandlers = [
   rest.get(`${equipmentServiceURL}`, (req, res, ctx) => {
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
            ctx.delay(),
            ctx.json({ message: 'Brak aktulanej oferty' }),
         );
      }

      return res(
         ctx.status(200),
         ctx.delay(),
         ctx.json([
            {
               equipmentId: nanoid(),
               title: 'Rowery',
               images: [
                  'https://images.unsplash.com/photo-1591741535018-d042766c62eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               ],
               description: {
                  synopsis:
                     'Sed eget velit tortor. Duis vestibulum est in arcu tempus pulvinar. Donec semper rhoncus leo, at pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
                  trainings: [
                     { trainingId: nanoid(), title: 'Trening personalny' },
                     { trainingId: nanoid(), title: 'TRX' },
                  ],
               },
            },
            {
               equipmentId: nanoid(),
               title: 'Bieżnie',
               images: [
                  'https://images.unsplash.com/photo-1578874691223-64558a3ca096?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ1fHxmaXRuZXNzJTIwZXF1aXBtZW50fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               ],
               description: {
                  synopsis:
                     'Sed eget velit tortor. Duis vestibulum est in arcu tempus pulvinar. Donec semper rhoncus leo, at pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
                  trainings: [
                     { trainingId: nanoid(), title: 'Trening personalny' },
                     { trainingId: nanoid(), title: 'TRX' },
                  ],
               },
            },
            {
               equipmentId: nanoid(),
               title: 'TRX',
               images: [
                  'https://images.unsplash.com/photo-1597075958252-60fc09ec20c2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
               ],
               description: {
                  synopsis:
                     'Sed eget velit tortor. Duis vestibulum est in arcu tempus pulvinar. Donec semper rhoncus leo, at pellentesque dui malesuada sed. Ut eu odio ac urna cursus finibus.',
                  trainings: [
                     { trainingId: nanoid(), title: 'Trening personalny' },
                     { trainingId: nanoid(), title: 'TRX' },
                  ],
               },
            },
         ]),
      );
   }),
];
