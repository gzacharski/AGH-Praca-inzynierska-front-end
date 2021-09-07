/* eslint-disable react/display-name */
import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from 'src/testUtils';
import { AuthContext, withAuthFilter } from 'src/main/auth';
import PriceListCard from './PriceListCard';

const gympass = [
   {
      id: 'ac881e68-999f-4656-b75b-c67baa3073f3',
      title: 'Wejście jednorazowe',
      price: { amount: '19,99', currency: 'zł', period: 'wejście' },
      premium: false,
      description: {
         synopsis: 'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         features: [
            // powinno być od 4 do 8
            'dostęp do każdego sprzętu fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'dostęp do sauny',
         ],
      },
   },
   {
      id: 'ffad7844-79a4-47d4-a646-4d6aa928631c',
      title: 'Karnet 4 wejścia',
      subheader: 'Najpopularniejszy dla ograniczonej liczby wejść', // pole opcjonalne
      price: { amount: '69,99', currency: 'zł', period: '4 wejścia' },
      premium: true,
      description: {
         synopsis: 'Karnet idealny dla osób o nieregularnym trybie życia',
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
];

describe('Price list card', () => {
   describe('without subheader', () => {
      beforeEach(() => {
         render(
            <AuthContext.Provider value={{ authState: 'SampleToken' }}>
               <MemoryRouter initialEntries={['/price-list']}>
                  <PriceListCard gymPass={gympass[0]} />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });
      test('should render gympass title', () => {
         expect(screen.getByText('Wejście jednorazowe')).toBeInTheDocument();
      });

      test('should render description synopsis', () => {
         expect(
            screen.getByText(
               'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
            ),
         ).toBeInTheDocument();
      });

      describe('should render price', () => {
         test('should render proper amount', () => {
            expect(screen.getByText('19,99')).toBeInTheDocument();
         });
         test('should render proper currency', () => {
            expect(screen.getByText('zł')).toBeInTheDocument();
         });
         test('should render proper period', () => {
            expect(screen.getByText('/wejście')).toBeInTheDocument();
         });
      });

      test('should render description features', () => {
         expect(
            screen.getByText('dostęp do każdego sprzętu fitness'),
         ).toBeInTheDocument();
         expect(
            screen.getByText('dowolne godziny wejścia'),
         ).toBeInTheDocument();
         expect(
            screen.getByText('nieograniczony czas wejścia'),
         ).toBeInTheDocument();
         expect(screen.getByText('dostęp do sauny')).toBeInTheDocument();
      });
   });

   describe('Button clicked ', () => {
      const renderRouter = (token) =>
         render(
            <AuthContext.Provider value={{ authState: { token } }}>
               <MemoryRouter initialEntries={['/price-list']}>
                  <Switch>
                     <Route
                        path="/price-list"
                        component={() => <PriceListCard gymPass={gympass[0]} />}
                     />
                     <Route
                        path="/"
                        exact
                        component={() =>
                           withAuthFilter(() => (
                              <div>Account page to buy gym pass</div>
                           ))
                        }
                     />
                     <Route
                        path="/login"
                        component={() => <div>Login page</div>}
                     />
                  </Switch>
               </MemoryRouter>
            </AuthContext.Provider>,
         );

      // TODO not implemented yet
      xtest('when logged in should route to account page', async () => {
         renderRouter('SampleToken');
         act(() => {
            userEvent.click(screen.getByRole('button'));
         });

         await waitFor(() => {
            expect(
               screen.getByText('Account page to buy gym pass'),
            ).toBeInTheDocument();
         });
      });

      xtest('when NOT logged in should route to login Page', async () => {
         renderRouter(null);
         act(() => {
            userEvent.click(screen.getByRole('button'));
         });
         await waitFor(() => {
            expect(screen.getByText('Login page')).toBeInTheDocument();
         });
      });
   });
});
