import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { accountServiceURL, authServiceURL } from 'src/main/data/urls';

export const handlers = [
   rest.post(`${authServiceURL}/login`, (req, res, ctx) =>
      res(
         ctx.status(200),
         ctx.set(
            'token',
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiMDVhODUwYy04ODI3LTQ4MDUtYWVjZC0zYTg5M2Q1ODY2OGIiLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl0sImV4cCI6MTYyNTQ5MTk2Mn0.Z2o0tfU1BiVL_3qJJUXyMVuZvNpLSed1aRbcqimhIE0',
         ),
         ctx.set('userId', nanoid()),
      ),
   ),
   rest.get(`${accountServiceURL}/:userId`, (req, res, ctx) => {
      const { userId } = req.params;
      return res(
         ctx.status(200),
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
