import React from 'react';
import { screen, render, waitFor } from 'src/testUtils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import MenuMoreInfoSwitch from './MenuMoreInfoSwitch';

const mockStore = configureStore([]);

describe('MenuMoreInfoSwitch', () => {
   describe('should NOT render when menu is closed', () => {
      beforeEach(() => {
         const store = mockStore({
            drawer: {
               isOpen: false,
               moreInfo: false,
            },
         });

         render(
            <Provider store={store}>
               <MenuMoreInfoSwitch />
            </Provider>,
         );
      });

      test('should render', () => {
         expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
      });
   });

   describe('should render when menu is open', () => {
      beforeEach(() => {
         const store = mockStore({
            drawer: {
               isOpen: true,
               moreInfo: false,
            },
         });

         render(
            <Provider store={store}>
               <MenuMoreInfoSwitch />
            </Provider>,
         );
      });

      test('should render', () => {
         expect(screen.getByRole('checkbox')).toBeInTheDocument();
      });

      test('should have proper text tooltip when is off', async () => {
         userEvent.hover(screen.getByRole('checkbox'));

         await waitFor(() => {
            expect(
               screen.getByText('Pokaż więcej informacji w menu'),
            ).toBeInTheDocument();
            expect(screen.getByRole('checkbox')).not.toBeChecked();
         });
      });

      test('should have proper text tooltip is on', async () => {
         // TODO fix test
         //  userEvent.click(screen.getByRole('checkbox'), { shipHover: true });
         //  userEvent.hover(screen.getByRole('checkbox'));
         //  await waitFor(() => {
         //     expect(screen.getByRole('checkbox').checked).toBeTruthy();
         //     // expect(
         //     //    screen.getByText('Pokaż mniej informacji w menu'),
         //     // ).toBeInTheDocument();
         //  });
      });
   });
});
