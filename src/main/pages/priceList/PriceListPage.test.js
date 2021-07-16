import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from 'src/testUtils';
import { gymPassServiceURL } from 'src/main/data/urls';
import PriceListPage from './PriceListPage';
import { testGymPasses } from './priceListTestContent';

jest.mock('axios');

describe('PriceList page component', () => {
   test('should render error message when no internet connection', async () => {
      axios.get.mockRejectedValueOnce(new Error('net::ERR_CONNECTION_REFUSED'));
      render(
         <MemoryRouter>
            <PriceListPage />
         </MemoryRouter>,
      );
      await waitFor(() => {
         expect(
            screen.getByText(
               'Wystąpił problem z połączeniem z serwisem. Spróbuj ponownie później lub wypróbuj inne połączenie sieciowe.',
            ),
         ).toBeInTheDocument();
      });
   });

   test('when loaded it should send get request to training service', async () => {
      axios.get.mockImplementationOnce(() =>
         Promise.resolve({
            status: 200,
            data: testGymPasses,
         }),
      );
      render(
         <MemoryRouter>
            <PriceListPage />
         </MemoryRouter>,
      );
      Promise.all([
         waitFor(() => expect(axios.get).toBeCalled()),
         waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith(gymPassServiceURL, {
               headers: {
                  'Accept-Language': 'pl',
               },
            }),
         ),
      ]);
   });

   test('should contain proper text', async () => {
      axios.get.mockImplementationOnce(() =>
         Promise.resolve({
            status: 200,
            data: testGymPasses,
         }),
      );
      render(
         <MemoryRouter>
            <PriceListPage />
         </MemoryRouter>,
      );
      await waitFor(
         () => expect(screen.getByText(/Oferta karnetów/)).toBeInTheDocument(),
         expect(
            screen.getByText(
               /Wybierz odpowiedni dla siebie typ karnetu i zacznij ćwiczyć!/,
            ),
         ).toBeInTheDocument(),
      );
   });
});
