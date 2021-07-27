import React from 'react';
import { nanoid } from 'nanoid';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from 'src/testUtils';
import { NotificationItem } from './NotificationItem';

const testContent = {
   id: '3072dac2-b7af-4ea0-8dcf-c1cd37aeaf22',
   from: {
      userId: nanoid(),
      name: 'Hajrah',
      surname: 'Childs',
      avatar: '',
   },
   title: 'Lacus finibus',
   content:
      'Integer nec lacinia nibh. Donec accumsan orci ac urna tempus, sed aliquet lacus finibus. Duis egestas.',
   created: '2021-07-27T12:21:01',
   checked: false,
};

const deleteCallback = jest.fn();
const doneCallback = jest.fn();

describe('Notification item', () => {
   test('should render without crashing when no props provided', () => {
      render(<NotificationItem />);
   });

   describe('should render test content', () => {
      beforeEach(() => {
         const { title, from, content, created, checked } = testContent;
         Date.now = jest.fn(() => Date.parse('2021-07-27T14:01:01'));
         render(
            <NotificationItem
               title={title}
               from={from}
               created={created}
               content={content}
               checked={checked}
               doneCallback={doneCallback}
               deleteCallback={deleteCallback}
            />,
         );
      });

      test('should render title', () => {
         expect(screen.getByText('Lacus finibus')).toBeInTheDocument();
      });

      test('should render name and surname', () => {
         expect(screen.getByText(/Hajrah Childs/)).toBeInTheDocument();
      });

      test('should render time ago', () => {
         expect(screen.getByText(/około 2 godziny temu/)).toBeInTheDocument();
      });

      test('should render content', () => {
         expect(
            screen.getByText(
               'Integer nec lacinia nibh. Donec accumsan orci ac urna tempus, sed aliquet lacus finibus. Duis egestas.',
            ),
         ).toBeInTheDocument();
      });

      test('should render tooltip when hover on delete icon', async () => {
         expect(
            screen.queryByText('Usuń powiadomienie'),
         ).not.toBeInTheDocument();

         userEvent.hover(
            screen.getByRole('button', { name: 'delete notification' }),
         );
         await waitFor(() => {
            expect(screen.getByText('Usuń powiadomienie')).toBeInTheDocument();
         });

         userEvent.unhover(
            screen.getByRole('button', { name: 'delete notification' }),
         );
         await waitFor(() => {
            expect(
               screen.queryByText('Usuń powiadomienie'),
            ).not.toBeInTheDocument();
         });
      });

      test('should render tooltip when hover on done icon', async () => {
         expect(
            screen.queryByText('Oznacz jako przeczytano'),
         ).not.toBeInTheDocument();

         userEvent.hover(screen.getByRole('button', { name: 'mark as read' }));
         await waitFor(() => {
            expect(
               screen.getByText('Oznacz jako przeczytano'),
            ).toBeInTheDocument();
         });

         userEvent.unhover(
            screen.getByRole('button', { name: 'mark as read' }),
         );
         await waitFor(() => {
            expect(
               screen.queryByText('Oznacz jako przeczytano'),
            ).not.toBeInTheDocument();
         });
      });

      test('should render tooltip when hover on done icon', () => {
         userEvent.click(screen.getByRole('button', { name: 'mark as read' }));
         expect(doneCallback).toHaveBeenCalled();
      });

      test('should render tooltip when hover on done icon', () => {
         userEvent.click(
            screen.getByRole('button', { name: 'delete notification' }),
         );
         expect(deleteCallback).toHaveBeenCalled();
      });
   });
});
