import React from 'react';
import { nanoid } from 'nanoid';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from 'src/testUtils';
import { UserAvatars } from './UserAvatars';

const testUsers = [
   {
      userId: nanoid(),
      name: 'Joaquin',
      surname: 'Phoenix',
      avatar: 'https://fwcdn.pl/fph/30/06/583006/327598_1.2.jpg',
   },
   {
      userId: nanoid(),
      name: 'Jack',
      surname: 'Nicholson',
      avatar: 'https://fwcdn.pl/fph/10/19/1019/409449_2.2.jpg',
   },
];

describe('UserAvatars', () => {
   test('should render user lists', () => {
      render(<UserAvatars users={testUsers} />);

      expect(screen.getByAltText('Joaquin Phoenix')).toBeInTheDocument();
      expect(screen.getByAltText('Jack Nicholson')).toBeInTheDocument();
   });

   test('should render user name and surname when hover on avatar', async () => {
      render(<UserAvatars users={testUsers} />);

      expect(screen.queryByText('Joaquin Phoenix')).not.toBeInTheDocument();

      userEvent.hover(screen.getByAltText('Joaquin Phoenix'));
      await waitFor(
         () => expect(screen.getByText('Joaquin Phoenix')).toBeInTheDocument(),
         { timeout: 1000 },
      );

      userEvent.unhover(screen.getByAltText('Joaquin Phoenix'));
      await waitFor(
         () =>
            expect(
               screen.queryByText('Joaquin Phoenix'),
            ).not.toBeInTheDocument(),
         { timeout: 1000 },
      );
   });

   test('should render no user info when empty arrary provided', () => {
      render(<UserAvatars users={[]} />);
      expect(screen.getByText('Brak uczestników.')).toBeInTheDocument();
   });

   test('should render no user info when no parameter provided', () => {
      render(<UserAvatars />);
      expect(screen.getByText('Brak uczestników.')).toBeInTheDocument();
   });
});
