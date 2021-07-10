import { rest } from 'msw';
import { accountServiceURL } from 'src/main/data/urls';
import { testAvatar } from 'src/main/data/testData/testAvatar';

export const handlers = [
   rest.post('/login', (request, response, context) => {
      sessionStorage.setItem('is-authenticated', 'true');

      return response(context.status(200));
   }),
   rest.get(`${accountServiceURL}/photos/:userId/avatar`, (req, res, ctx) => {
      const { data, format } = testAvatar;
      return res(
         ctx.status(200),
         ctx.json({
            avatar: {
               data,
               format,
            },
         }),
      );
   }),
   rest.get(`${accountServiceURL}/:userId`, (req, res, ctx) => {
      const { userId } = req.params;
      return res(
         ctx.status(200),
         ctx.set('Authorization', 'test-token'),
         ctx.json({
            id: userId,
            name: 'TestName',
            surname: 'TestSurname',
            email: 'test@email.com',
            phone: '555 666 777',
         }),
      );
   }),
];