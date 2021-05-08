import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { userServiceURL } from 'src/main/data/urls';
import ActivateAccountRefreshButton from './ActivateAccountRefreshButton';

jest.mock('axios');

describe('Button', () => {
   beforeEach(() => {
      const setSuccess = jest.fn();
      const setMessage = jest.fn();
      const setOnRequest = jest.fn();
      const token = 'a309fc5e-b014-11eb-8529-0242ac130003';
      const link = `/refreshRegistration?token=${token}`;

      render(
         <MemoryRouter initialEntries={[link]}>
            <ActivateAccountRefreshButton
               setSuccess={setSuccess}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
            />
         </MemoryRouter>,
      );
   });
   test('should be render', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(
         /Wyślij nowy link aktywacyjny/,
      );
   });

   test('when clicked, send get request', async () => {
      const confirmationURL = `${userServiceURL}/users/refreshRegistration`;
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      await userEvent.click(screen.getByRole('button'));

      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(confirmationURL, {
         headers: {
            'Accept-Language': 'pl',
         },
         params: {
            token: 'a309fc5e-b014-11eb-8529-0242ac130003',
         },
      });
   });
});
