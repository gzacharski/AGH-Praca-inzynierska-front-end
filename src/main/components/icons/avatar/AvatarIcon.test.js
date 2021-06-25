import React from 'react';
import { screen, render } from 'src/testUtils';
import { AvatarIcon } from './AvatarIcon';
import { avatar } from './testAvatar';

describe('Avatar icon', () => {
   test('should render', () => {
      render(<AvatarIcon avatar={avatar} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img').getAttribute('src')).toContain(
         avatar.image.data,
      );
   });

   test('should proper when image date not provided', () => {
      const avatar2 = {
         id: 'eba1df78-b210-4cd4-b4c6-a247c71e35cd',
         name: 'Krzysztof',
         surname: 'Nowalski',
      };
      render(<AvatarIcon avatar={avatar2} />);
      expect(screen.getByText(/KN/)).toBeInTheDocument();
   });
});
