import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { gymPassServiceURL } from '../../main/data/urls';

export const priceListHandlers = [
   rest.get(`${gymPassServiceURL}/offer/all`, (req, res, ctx) => {
      const error = req.url.searchParams.get('error');
      if (error === 'noConnection') {
         return res(
            ctx.status(500),
            ctx.delay(),
            ctx.json({ message: NETWORK_ERROR }),
         );
      }

      const status = req.url.searchParams.get('status');
      if (status === 'noPriceList') {
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
               documentId: nanoid(),
               id: nanoid(),
               title: 'Wejście jednorazowe',
               subheader: null,
               price: {
                  amount: 19.99,
                  currency: 'zł',
                  period: 'wejście',
               },
               premium: false,
               description: {
                  synopsis:
                     'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'dostęp do sauny',
                  ],
               },
               status: 'inactive',
            },
            {
               documentId: nanoid(),
               id: nanoid(),
               title: 'Karnet 4 wejścia',
               subheader: 'Najpopularniejszy dla ograniczonej liczby wejść',
               price: {
                  amount: 69.99,
                  currency: 'zł',
                  period: '4 wejścia',
               },
               premium: true,
               description: {
                  synopsis:
                     'Karnet idealny dla osób o nieregularnym trybie życia',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'grupowe i indywidualne zajęcia fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'nieograniczona ważność karnetu',
                     'dostęp do sauny',
                  ],
               },
               status: 'active',
            },
            {
               documentId: nanoid(),
               id: nanoid(),
               title: 'Karnet 8 wejść',
               subheader: null,
               price: {
                  amount: 108.99,
                  currency: 'zł',
                  period: '8 wejść',
               },
               premium: false,
               description: {
                  synopsis:
                     'Karnet idealny dla osób o nieregularnym trybie życia',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'grupowe i indywidualne zajęcia fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'nieograniczona ważność karnetu',
                     'dostęp do sauny',
                  ],
               },
               status: 'archive',
            },
            {
               documentId: nanoid(),
               id: nanoid(),
               title: 'Standardowy',
               subheader: 'Najpopularniejszy',
               price: {
                  amount: 139.99,
                  currency: 'zł',
                  period: 'miesiąc',
               },
               premium: true,
               description: {
                  synopsis: 'Najlepszy wybór dla osób regularnie ćwiczących',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'grupowe i indywidualne zajęcia fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'nieograniczona liczba wejść',
                     'ważność 30 dni',
                     'dostęp do sauny',
                  ],
               },
               status: 'active',
            },
         ]),
      );
   }),

   rest.get(`${gymPassServiceURL}/offer`, (req, res, ctx) => {
      const error = req.url.searchParams.get('error');
      if (error === 'noConnection') {
         return res(
            ctx.status(500),
            ctx.delay(),
            ctx.json({ message: NETWORK_ERROR }),
         );
      }

      const status = req.url.searchParams.get('status');
      if (status === 'noPriceList') {
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
               documentId: nanoid(),
               id: nanoid(),
               title: 'Wejście jednorazowe',
               subheader: null,
               price: {
                  amount: 19.99,
                  currency: 'zł',
                  period: 'wejście',
               },
               premium: false,
               description: {
                  synopsis:
                     'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'dostęp do sauny',
                  ],
               },
            },
            {
               documentId: nanoid(),
               id: nanoid(),
               title: 'Karnet 4 wejścia',
               subheader: 'Najpopularniejszy dla ograniczonej liczby wejść',
               price: {
                  amount: 69.99,
                  currency: 'zł',
                  period: '4 wejścia',
               },
               premium: true,
               description: {
                  synopsis:
                     'Karnet idealny dla osób o nieregularnym trybie życia',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'grupowe i indywidualne zajęcia fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'nieograniczona ważność karnetu',
                     'dostęp do sauny',
                  ],
               },
            },
            {
               documentId: nanoid(),
               id: nanoid(),
               title: 'Karnet 8 wejść',
               subheader: null,
               price: {
                  amount: 108.99,
                  currency: 'zł',
                  period: '8 wejść',
               },
               premium: false,
               description: {
                  synopsis:
                     'Karnet idealny dla osób o nieregularnym trybie życia',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'grupowe i indywidualne zajęcia fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'nieograniczona ważność karnetu',
                     'dostęp do sauny',
                  ],
               },
            },
            {
               documentId: nanoid(),
               id: nanoid(),
               title: 'Standardowy',
               subheader: 'Najpopularniejszy',
               price: {
                  amount: 139.99,
                  currency: 'zł',
                  period: 'miesiąc',
               },
               premium: true,
               description: {
                  synopsis: 'Najlepszy wybór dla osób regularnie ćwiczących',
                  features: [
                     'dostęp do każdego sprzętu fitness',
                     'grupowe i indywidualne zajęcia fitness',
                     'dowolne godziny wejścia',
                     'nieograniczony czas wejścia',
                     'nieograniczona liczba wejść',
                     'ważność 30 dni',
                     'dostęp do sauny',
                  ],
               },
            },
         ]),
      );
   }),
];
