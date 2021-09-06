import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { accountServiceURL, authServiceURL } from 'src/main/data/urls';

export const handlers = [
   rest.post(`${authServiceURL}/login`, (req, res, ctx) =>
      res(
         ctx.status(200),
         ctx.delay(),
         ctx.set(
            'token',
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4ODlhZGEzMi01MGJkLTQ1ZmYtOGEwZC1mNzgyMWQ3MzU5NjQiLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX01BTkFHRVIiXSwiZXhwIjoxNjMwOTE1Mjg0fQ.2oXWmJtT-iB4_PtkY6dSycDd4bqyEkenQ95uAcX4uq8',
         ),
         ctx.set('userId', nanoid()),
      ),
   ),
   rest.get(`${accountServiceURL}/:userId`, (req, res, ctx) => {
      const { userId } = req.params;
      return res(
         ctx.status(200),
         ctx.delay(),
         ctx.json({
            id: userId,
            name: 'Grzegorz',
            surname: 'Zacharski',
            email: 'test.email@email.com',
            phone: '555 666 777',
         }),
      );
   }),
];
