import { rest } from 'msw';

export const handlers = [
   rest.post('/login', (request, response, context) => {
      sessionStorage.setItem('is-authenticated', 'true');

      return response(context.status(200));
   }),
   rest.get('/user', (req, res, ctx) => {
      const isAuthenticated = sessionStorage.getItem('is-authenticated');

      if (!isAuthenticated) {
         return res(
            ctx.status(403),

            ctx.json({
               errorMessage: 'Not authorized',
            }),
         );
      }

      return res(
         ctx.status(200),

         ctx.json({
            username: 'admin',
         }),
      );
   }),
];
