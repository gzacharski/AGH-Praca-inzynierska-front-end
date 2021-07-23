import React from 'react';
import userEvent from '@testing-library/user-event';
import { STATUS } from 'src/main/store';
import { render, screen, waitFor } from 'src/testUtils';
import { JoinEventIconButton } from './JoinEventIconButton';

const callback = jest.fn();

describe('Refresh button', () => {
   beforeEach(() => {
      Date.now = jest.fn(() => Date.parse('2020-10-10'));
   });

   test('should render without progressbar', () => {
      render(
         <JoinEventIconButton
            startDate="2020-10-08"
            status={STATUS.LOADING}
            onClick={callback}
         />,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(callback).not.toHaveBeenCalled();
   });

   describe('should act properly on click', () => {
      test('should NOT react when button is disabled because event took place', () => {
         render(
            <JoinEventIconButton
               startDate="2020-10-08"
               status={STATUS.LOADING}
               onClick={callback}
            />,
         );

         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

         expect(() =>
            userEvent.click(screen.getByRole('button')),
         ).toThrowError();

         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
         expect(callback).not.toHaveBeenCalled();
      });

      test('should render button with progressbar when clicked', () => {
         render(
            <JoinEventIconButton
               startDate="2020-10-11"
               status={STATUS.LOADING}
               onClick={callback}
            />,
         );

         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

         userEvent.click(screen.getByRole('button'));

         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.getByRole('progressbar')).toBeInTheDocument();
         expect(callback).toHaveBeenCalled();
      });

      test('should NOT react when button is disabled because event will take place after at least 7 days', () => {
         render(
            <JoinEventIconButton
               startDate="2020-10-20"
               status={STATUS.LOADING}
               onClick={callback}
            />,
         );

         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

         expect(() =>
            userEvent.click(screen.getByRole('button')),
         ).toThrowError();

         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
         expect(callback).not.toHaveBeenCalled();
      });
   });

   describe('should render proper tooltip on hover', () => {
      //TODO fix text
      xtest('when event took place', async () => {
         render(
            <JoinEventIconButton
               startDate="2020-10-08"
               status={STATUS.LOADING}
               onClick={callback}
            />,
         );

         userEvent.hover(screen.getByRole('button'));

         await waitFor(() => {
            expect(
               screen.getByText('Zajęcia już się odbyły.'),
            ).toBeInTheDocument();
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(callback).not.toHaveBeenCalled();
         });
      });

      test('when event will take place within 7 days', async () => {
         render(
            <JoinEventIconButton
               startDate="2020-10-11"
               status={STATUS.LOADING}
               onClick={callback}
            />,
         );

         userEvent.hover(screen.getByRole('button'));

         await waitFor(() => {
            expect(screen.getByText('Dołącz do zajęć.')).toBeInTheDocument();
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(callback).not.toHaveBeenCalled();
         });
      });

      //TODO fix text
      xtest('when event will take place within 7 days', async () => {
         render(
            <JoinEventIconButton
               startDate="2020-10-20"
               status={STATUS.LOADING}
               onClick={callback}
            />,
         );

         userEvent.hover(screen.getByRole('button'));

         await waitFor(() => {
            expect(
               screen.getByText(
                  'Możliwość zapisu na zajęcia wyłącznie w ciągu 7 dni przed rozpoczęciem zajęć.',
               ),
            ).toBeInTheDocument();
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(callback).not.toHaveBeenCalled();
         });
      });
   });
});
