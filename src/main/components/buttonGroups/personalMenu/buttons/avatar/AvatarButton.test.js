import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, act } from 'src/testUtils';
import { AuthProvider } from 'src/main/auth';
import { avatar } from './testAvatar';
import AvatarButton from './AvatarButton';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useHistory: () => ({
      push: mockHistoryPush,
   }),
}));

describe('Avatar button', () => {
   beforeEach(() => {
      render(
         <AuthProvider>
            <MemoryRouter>
               <AvatarButton avatar={avatar} />
               <Route path="/client" render={() => <div>Client Page</div>} />
            </MemoryRouter>
         </AuthProvider>,
      );
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });

   test('should have proper text content', () => {
      expect(screen.getByRole('button')).toHaveTextContent(
         'Krzysztof',
      );
   });

   test('should have image avatar', () => {
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img').getAttribute('src')).toContain(
         avatar.image.data,
      );
   });

   test('when clicked, it should route to account page', () => {
      expect(screen.queryByText(/Client Page/)).not.toBeInTheDocument();
      act(() => userEvent.click(screen.getByRole('button')));
      expect(screen.queryByText(/Client Page/)).toBeInTheDocument();
   });
});
