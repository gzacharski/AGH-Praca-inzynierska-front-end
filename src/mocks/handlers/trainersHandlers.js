import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { accountServiceURL } from 'src/main/data/urls';

export const priceListHandlers = [
   rest.get(`${accountServiceURL}/trainers`, (req, res, ctx) => {
      const error = req.url.searchParams.get('error');
      if (error === 'noConnection') {
         return res(
            ctx.status(500),
            ctx.delay(1500),
            ctx.json({ message: NETWORK_ERROR }),
         );
      }

      const status = req.url.searchParams.get('status');
      if (status === 'noPriceList') {
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
               userId: nanoid(),
               name: 'Redford',
               surname: 'Bowdry',
               images: [
                  'https://images.unsplash.com/photo-1549476464-37392f717541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
                  'https://images.unsplash.com/photo-1613685044678-0a9ae422cf5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80',
               ],
               avatar:
                  'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
               description: {
                  synopsis:
                     'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
                  features: ['Trening personalny', 'TRX', 'Wiosła', 'Pilates'],
               },
            },
         ]),
      );
   }),
];
